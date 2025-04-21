from fastapi import Depends, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.restaurant.commands.restaurant_crud import get_restaurant_by_id, get_restaurants_by_category_restaurant
from app.api.restaurant.schemas.response import RestaurantResponse, RestaurantsResponse
from typing import List
from database.db import get_db


router = APIRouter()

@router.get(
    "/{category_restourant_id}/restourants",
    summary="Получить все рестораны по ID категории ресторанов с городом, отзывами и рейтингом",
    response_model=List[RestaurantsResponse]
)
async def read_restourants_by_category_restourants(category_restourant_id: int, db:AsyncSession = Depends(get_db)):
    restourants_with_data = await get_restaurants_by_category_restaurant(category_restaurant_id=category_restourant_id, db=db)
    return [
        {
            **restourant["restourant"].__dict__,
            "review_count": restourant["review_count"],
            "city": restourant["restourant"].city.__dict__
        }
        for restourant in restourants_with_data
    ]

@router.get(
    "/{restourant_id}",
    summary="Получить ресторан по ID и увеличить search_rank",
    response_model=RestaurantResponse
)
async def get_restourant(
    restourant_id: int,
    db: AsyncSession = Depends(get_db)
):
    restourant_data = await get_restaurant_by_id(restaurant_id=restourant_id, db=db)
    return {
        **restourant_data["restourant"].__dict__,
        "city": restourant_data["restourant"].city.__dict__,
        "variant_restourant": restourant_data["restourant"].variant_restourant.__dict__,
        "restourant_admin": restourant_data["restourant"].restourant_admin.__dict__,
        "review_count": restourant_data["review_count"]
    }