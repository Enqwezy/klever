import logging
from model.model import Service, Review, Variant
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, update
from sqlalchemy.orm import joinedload 
from fastapi import HTTPException, UploadFile
from decimal import Decimal
import os


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
    name: str,
    description: str,
    price: Decimal,
    photo: UploadFile,
    rating: float,
    city_id: int,
    variant_id: int,
    specialist_id: int,
    db: AsyncSession
) -> Service:
    photo_path = None

    if photo:
        photo_filename = f"uploads/services/photos/{photo.filename}"
        os.makedirs(os.path.dirname(photo_filename), exist_ok=True)
        with open(photo_filename, "wb") as f:
            f.write(await photo.read())
        photo_path = photo_filename

    service=Service(
        name=name,
        description=description,
        price=price,
        photo=photo_path,
        rating=rating,
        city_id=city_id,
        variant_id=variant_id,
        specialist_id=specialist_id
    )

    db.add(service)
    await db.commit()
    await db.refresh(service)

    return service