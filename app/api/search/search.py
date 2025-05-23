from fastapi import Depends, APIRouter, Query, HTTPException
from database.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.search.schemas.response import ServiceResponse, RestaurantResponse
from app.api.search.commands.search_crud import get_services, get_restaurants
from typing import Optional, List


router = APIRouter()

@router.get(
    "/search-services",
    summary="Получить список сервисов с фильтрацией по нескольким городам и подкатегориям",
    response_model=list[ServiceResponse]
)
async def get_filtered_services(
    search: Optional[str] = Query(None, description="Текстовый поиск по названию и описанию услуги"),
    city_ids: Optional[str] = Query(None, description="Список ID городов через запятую, например: 1,2"),
    variant_ids: Optional[str] = Query(None, description="Список ID подкатегорий через запятую, например: 1,2"),
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_rating: Optional[float] = None,
    max_rating: Optional[float] = None,
    db: AsyncSession = Depends(get_db)
):
    parsed_city_ids = [int(x) for x in city_ids.split(",")] if city_ids else None
    parsed_variant_ids = [int(x) for x in variant_ids.split(",")] if variant_ids else None

    services_with_data = await get_services(
        db=db,
        city_ids=parsed_city_ids,
        variant_ids=parsed_variant_ids,
        min_price=min_price,
        max_price=max_price,
        min_rating=min_rating,
        max_rating=max_rating,
        search_query=search
    )
    return [
        {
            **service["service"].__dict__,
            "city": service["service"].city.__dict__,
            "variant": service["service"].variant.__dict__,
            "specialist": service["service"].specialist.__dict__,
            "review_count": service["review_count"],
            "rank": service["rank"]
        }
        for service in services_with_data
    ]


@router.get(
    "/search-restaurants",
    summary="Получить список ресторанов с фильтрацией по городам и типам ресторанов",
    response_model=List[RestaurantResponse]
)
async def get_filtered_restaurants(
    search: Optional[str] = Query(None, description="Текстовый поиск по названию и описанию ресторана"),
    city_ids: Optional[str] = Query(None, description="Список ID городов через запятую, например: 1,2"),
    variant_restaurant_ids: Optional[str] = Query(None, description="Список ID типов ресторанов через запятую, например: 1,2"),
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_rating: Optional[float] = None,
    max_rating: Optional[float] = None,
    db: AsyncSession = Depends(get_db)
):
    try:
        parsed_city_ids = [int(x) for x in city_ids.split(",")] if city_ids else None
        parsed_variant_restaurant_ids = [int(x) for x in variant_restaurant_ids.split(",")] if variant_restaurant_ids else None
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid format for city_ids or variant_restaurant_ids")

    restaurants_with_data = await get_restaurants(
        db=db,
        city_ids=parsed_city_ids,
        variant_restaurant_ids=parsed_variant_restaurant_ids,
        min_price=min_price,
        max_price=max_price,
        min_rating=min_rating,
        max_rating=max_rating,
        search_query=search
    )

    return [
        RestaurantResponse(
            id=restaurant["restaurant"].id,
            name=restaurant["restaurant"].name,
            description=restaurant["restaurant"].description,
            price=restaurant["restaurant"].price,
            photo=restaurant["restaurant"].photo,
            rating=restaurant["restaurant"].rating,
            created_at=restaurant["restaurant"].created_at,
            city=restaurant["city"],
            variant_restaurant=restaurant["variant_restaurant"],
            restaurant_admin=restaurant["restaurant_admin"],
            type_food_count=restaurant["type_food_count"],
            rank=restaurant["rank"]
        )
        for restaurant in restaurants_with_data
        if restaurant["restaurant"] and hasattr(restaurant["restaurant"], 'id')
    ]