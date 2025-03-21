from fastapi import Depends, APIRouter, Query
from database.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.search.schemas.response import ServiceResponse
from app.api.search.commands.search_crud import get_services
from typing import Optional, List


router = APIRouter()

@router.get(
    "/search-services",
    summary="Получить список сервисов с фильтрацией по нескольким городам и подкатегориям",
    response_model=list[ServiceResponse]
)
async def get_filtered_services(
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
        max_rating=max_rating
    )
    return [
        {
            **service["service"].__dict__,
            "city": service["service"].city.__dict__,
            "variant": service["service"].variant.__dict__,
            "specialist": service["service"].specialist.__dict__,
            "review_count": service["review_count"]
        }
        for service in services_with_data
    ]