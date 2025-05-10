from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from model.model import Service
from typing import List, Optional
import logging


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_services(
    db: AsyncSession,
    city_ids: List[int] | None = None,
    variant_ids: List[int] | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    min_rating: float | None = None,
    max_rating: float | None = None,
    search_query: str | None = None
):
    rank_column = func.ts_rank(Service.search_vector, func.plainto_tsquery('russian', search_query)).label('rank') if search_query else None

    query = (
        select(Service)
        .options(
            joinedload(Service.city),
            joinedload(Service.variant),
            joinedload(Service.specialist),
            joinedload(Service.reviews)
        )
    )

    if search_query:
        logger.debug(f"Поиск по запросу: {search_query}")
        tsquery = func.plainto_tsquery('russian', search_query)
        query = query.filter(Service.search_vector.op('@@')(tsquery))
        query = query.order_by(func.ts_rank(Service.search_vector, tsquery).desc())

    if city_ids:
        logger.debug(f"Фильтр по city_ids: {city_ids}")
        query = query.filter(Service.city_id.in_(city_ids))
    if variant_ids:
        logger.debug(f"Фильтр по variant_ids: {variant_ids}")
        query = query.filter(Service.variant_id.in_(variant_ids))
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
            "service": service.Service if isinstance(service, tuple) else service,
            "review_count": len((service.Service if isinstance(service, tuple) else service).reviews),
            "rank": service.rank if isinstance(service, tuple) and search_query else 0.0
        }
        for service in services
    ]

    logger.info(f"Найдено {len(services_with_data)} сервисов по заданным фильтрам")
    return services_with_data