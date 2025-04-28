import logging
from model.model import Service, Variant, Specialist, City
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, update
from sqlalchemy.orm import joinedload 
from fastapi import HTTPException, UploadFile
import os
from app.api.service.schemas.create import ServiceCreate
import uuid
import aiofiles
import re


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_services_by_category(category_id: int, db: AsyncSession):
    variant_stmt = await db.execute(
        select(Variant).filter(Variant.category_id == category_id)
    )
    variants = variant_stmt.scalars().all()

    if not variants:
        logger.info(f"Варианты для категории с ID {category_id} не найдены, сервисов нет")
        return []

    variant_ids = [variant.id for variant in variants]

    stmt = await db.execute(
        select(Service)
        .filter(Service.variant_id.in_(variant_ids))
        .options(
            joinedload(Service.city),    
            joinedload(Service.reviews)  
        )
    )
    services = stmt.scalars().unique().all()

    if not services:
        logger.info(f"Сервисы для вариантов категории с ID {category_id} не найдены")
        return []

    services_with_data = [
        {
            "service": service,
            "review_count": len(service.reviews)  
        }
        for service in services
    ]
    
    logger.info(f"Найдено {len(services_with_data)} сервисов для категории с ID {category_id}")
    return services_with_data

async def get_service_by_id(service_id: int, db: AsyncSession):
    stmt = await db.execute(
        select(Service)
        .filter(Service.id == service_id)
        .options(
            joinedload(Service.city),
            joinedload(Service.variant),
            joinedload(Service.specialist),
            joinedload(Service.reviews)
        )
    )
    service = stmt.scalars().first()

    if not service:
        logger.info(f"Сервис с ID {service_id} не найден")
        raise HTTPException(status_code=404, detail="Сервис не найден")

    await db.execute(
        update(Service)
        .where(Service.id == service_id)
        .values(search_rank=Service.search_rank + 0.1)
    )
    await db.commit()

    await db.refresh(service)

    logger.info(f"Сервис с ID {service_id} получен, search_rank увеличен до {service.search_rank}")
    return {
        "service": service,
        "review_count": len(service.reviews)
    }


async def create_service(
    service_data: ServiceCreate,
    photo: UploadFile | None,
    db: AsyncSession
) -> Service:
    logger.debug(f"Creating service with name={service_data.name}, city_id={service_data.city_id}, variant_id={service_data.variant_id}, specialist_id={service_data.specialist_id}")

    city = await db.get(City, service_data.city_id)
    if not city:
        raise HTTPException(status_code=404, detail="City not found")

    variant = await db.get(Variant, service_data.variant_id)
    if not variant:
        raise HTTPException(status_code=404, detail="Variant not found")

    specialist = await db.get(Specialist, service_data.specialist_id)
    if not specialist:
        raise HTTPException(status_code=404, detail="Specialist not found")

    photo_path = None
    if photo:
        try:
            photo_filename = f"uploads/photos/services/{uuid.uuid4()}"
            os.makedirs(os.path.dirname(photo_filename), exist_ok=True)
            async with aiofiles.open(photo_filename, "wb") as f:
                await f.write(await photo.read())
            photo_path = photo_filename
        except Exception as e:
            logger.error(f"Failed to save photo: {e}")
            raise HTTPException(status_code=500, detail="Failed to save photo")

    service = Service(
        name=service_data.name,
        description=service_data.description,
        price=service_data.price,
        rating=service_data.rating,
        photo=photo_path,
        city_id=service_data.city_id,
        variant_id=service_data.variant_id,
        specialist_id=service_data.specialist_id
    )

    try:
        db.add(service)
        await db.commit()
        await db.refresh(service)
    except Exception as e:
        if photo_path and os.path.exists(photo_path):
            os.remove(photo_path)
        logger.error(f"Error creating service: {e}")
        raise HTTPException(status_code=500, detail="Failed to create service")

    logger.info(f"Service created with id={service.id}")
    return service