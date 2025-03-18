import logging
from model.model import Service, Review, Variant
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import joinedload 
from fastapi import HTTPException


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_services_by_category(db: AsyncSession, category_id: int):
    stmt = await db.execute(select(Variant).filter(Variant.category_id == category_id))
    variants = stmt.scalars().all()

    if not variants:
        logger.info(f"Варианты для категории с ID {category_id} не найдены, сервисов нет")
        return []
    
    variant_ids = [variant.id for variant in variants]

    stmt = await db.execute(
        select(Service)
        .filter(Service.variant_id.in_(variant_ids))
        .options(joinedload(Service.city))
        .outerjoin(Review, Review.service_id==Service.id)
        .group_by(Service)
        .add_columns(func.count(Review.id).label("review_count"))
    )
    results = stmt.all

    if not results:
        logger.info(f"Сервисы для вариантов категории с ID {category_id} не найдены")
        return []
    
    services_with_data = [
        {
            "service": service,
            "review_count": review_count
        }
        for service, review_count in results
    ]

    logger.info(f"Найдено {len(services_with_data)} сервисов для категории с ID {category_id}")
    return services_with_data

async def get_service_by_id(service_id: int, db: AsyncSession):
    stmt = await db.execute(select(Service).filter(Service.id == service_id).options(
        joinedload(Service.city),
        joinedload(Service.specialist)
    ))
    service = stmt.scalars().first()

    if not service:
        logger.info(f"Сервис с ID {service_id} не найден")
        raise HTTPException(status_code=404, detail="Сервис не найден")
    logger.info(f"Найден сервис с ID {service_id}: {service.name}")
    return service
