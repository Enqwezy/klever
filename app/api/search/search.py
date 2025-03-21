from fastapi import Depends, APIRouter
from database.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.search.schemas.response import ServiceResponse
from app.api.search.commands.search_crud import get_service
from typing import Optional


router = APIRouter()

@router.get(
    "/search-services",
    summary="Получить список сервисов с фильтрацией",
    response_model=list[ServiceResponse]
)
async def get_filtered_services(
    city_id: Optional[int] = None,
    variant_id: Optional[int] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_rating: Optional[float] = None,
    max_rating: Optional[float] = None,
    db: AsyncSession = Depends(get_db)
):
    services_with_data = await get_service(
        db=db,
        city_id=city_id,
        variant_id=variant_id,
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