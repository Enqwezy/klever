from fastapi import APIRouter, Depends, Form
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.service.schemas.response import ServicesResponse, ServiceResponse
from app.api.service.commands.service_crud import get_services_by_category, get_service_by_id
from typing import List
from database.db import get_db
from decimal import Decimal


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
    "/services/{service_id}",
    summary="Получить сервис по ID и увеличить search_rank",
    response_model=ServiceResponse
)
async def get_service(
    service_id: int,
    db: AsyncSession = Depends(get_db)
):
    service_data = await get_service_by_id(service_id=service_id, db=db)
    return {
        **service_data["service"].__dict__,
        "city": service_data["service"].city.__dict__,
        "variant": service_data["service"].variant.__dict__,
        "specialist": service_data["service"].specialist.__dict__,
        "review_count": service_data["review_count"]
    }

# @router.post(
#     "/service/add-service",
#     summary="Добавить сервис",
#     response_model=dict
# )
# async def create_new_service(
#     name: str = Form(default=""),
#     description: str = Form(default=""),
#     price: Decimal = Form(...),
#     photo: str = Form
# )