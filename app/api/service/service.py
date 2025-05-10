from fastapi import APIRouter, Depends, Form, UploadFile, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.service.schemas.response import ServicesResponse, ServiceResponse
from app.api.service.commands.service_crud import get_services_by_category, get_service_by_id, create_service
from typing import List
from database.db import get_db
from app.api.service.schemas.create import ServiceCreate
import logging


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

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

@router.post(
    "/add-service",
    summary="Создать услугу",
    response_model=dict
)
async def create_new_service(
    name: str = Form(...),
    description: str | None = Form(default=None),
    price: float | None = Form(default=None),
    rating: float | None = Form(default=None),
    city_id: int = Form(...),
    variant_id: int = Form(...),
    specialist_id: int = Form(...),
    photo: UploadFile | None = Form(default=None),
    db: AsyncSession = Depends(get_db)
):
    logger.debug(f"Received request to create service: name={name}, city_id={city_id}, variant_id={variant_id}, specialist_id={specialist_id}")
    
    try:
        service_data = ServiceCreate(
            name=name,
            description=description,
            price=price,
            rating=rating,
            city_id=city_id,
            variant_id=variant_id,
            specialist_id=specialist_id
        )
        
        service = await create_service(
            service_data=service_data,
            photo=photo,
            db=db
        )
        
        return {
            "id": service.id,
            "name": service.name,
            "message": "Service created successfully"
        }
    except HTTPException as e:
        raise
    except Exception as e:
        logger.error(f"Error creating service: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")