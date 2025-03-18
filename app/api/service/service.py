from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.service.schemas.response import ServicesResponse, ServiceResponse
from app.api.service.commands.service_crud import get_services_by_category, get_service_by_id
from typing import List
from database.db import get_db


router= APIRouter()

@router.get(
    "/categories/{category_id}/services",
    summary="Получить все сервисы по ID категории с городом, отзывами и рейтингом",
    response_model=List[ServicesResponse]
)
async def read_services_by_category(category_id: int, db:AsyncSession = Depends(get_db)):
    services_with_data = await get_services_by_category(category_id=category_id, db=db)
    return [
        {
            **service["service"].__dict__,
            "review_count": service["review_count"],
            "city": service["service"].city.__dict__
        }
        for service in services_with_data
    ]

@router.get(
    "/categories/{service_id}/service",
    summary="Получить сервис по ID",
    response_model=ServiceResponse
)
async def read_service_by_id(service_id: int, db: AsyncSession = Depends(get_db)):
    return await get_service_by_id(service_id=service_id, db=db)