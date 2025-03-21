from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
import logging
from model.model import Service


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_service(
    db: AsyncSession,
    city_id: int | None = None,
    variant_id: int | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    min_rating: float | None = None,
    max_rating: float | None = None
):
    query = (
        select(Service)
        .options(
            joinedload(Service.city),
            joinedload(Service.variant),
            joinedload(Service.specialist),
            joinedload(Service.reviews)
        )
    )
    if city_id is not None:
        query = query.filter(Service.city_id == city_id)
    if variant_id is not None:
        query = query.filter(Service.variant_id == variant_id)
    if min_price is not None:
        query = query.filter(Service.price >= min_price)
    if max_price is not None:
        query = query.filter(Service.price <= max_price)
    if min_rating is not None:
        query = query.filter(Service.rating >= min_rating)
    if max_rating is not None:
        query = query.filter(Service.rating <= max_rating)
    
    stmt = await db.execute(query)
    services = stmt.scalars().unique().all()

    if not services:
        logger.info(f"Сервисы по заданным фильтрам не найдены")
        return []
    
    services_with_data = [
        {
            "service": service,
            "review_count": len(service.reviews)
        }
        for service in services
    ]

    logger.info(f"Найдено {len(services_with_data)} сервисов по заданным фильтрам")
    return services_with_data