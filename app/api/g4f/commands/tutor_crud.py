from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import joinedload
import logging
from model.model import Service


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_top_tutors(db: AsyncSession, limit: int = 10, query: str = None):
    """Получение топ услуг по поисковому запросу с использованием Full-Text Search, отсортированных по search_rank."""
    query_base = (
        select(Service)
        .options(
            joinedload(Service.city),
            joinedload(Service.variant),
            joinedload(Service.specialist),
            joinedload(Service.reviews)
        )
        .order_by(Service.search_rank.desc().nulls_last())
        .limit(limit)
    )

    if query:
        query_base = query_base.filter(
            func.to_tsvector('russian', Service.name).op('@@')(func.plainto_tsquery('russian', query))
        )

    stmt = await db.execute(query_base)
    services = stmt.scalars().unique().all()

    if not services:
        logger.info(f"Услуги по запросу '{query}' не найдены")
        return []

    tutors_with_data = [
        {
            "service": service,
            "review_count": len(service.reviews)
        }
        for service in services
    ]
    logger.info(f"Найдено {len(tutors_with_data)} услуг по запросу '{query}'")
    return tutors_with_data

async def get_top_rated_services(db: AsyncSession, limit: int = 3):
    """Получение топ услуг по рейтингу (rating), отсортированных по rating."""
    query = (
        select(Service)
        .options(
            joinedload(Service.city),
            joinedload(Service.variant),
            joinedload(Service.specialist),
            joinedload(Service.reviews)
        )
        .order_by(Service.rating.desc().nulls_last())
        .limit(limit)
    )

    stmt = await db.execute(query)
    services = stmt.scalars().unique().all()

    if not services:
        logger.info("Услуги с рейтингом не найдены")
        return []

    services_with_data = [
        {
            "service": service,
            "review_count": len(service.reviews)
        }
        for service in services
    ]
    logger.info(f"Найдено {len(services_with_data)} услуг с высоким рейтингом")
    return services_with_data