from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
import logging
from model.model import Service

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_top_tutors(db: AsyncSession, limit: int = 10, query: str = None) -> list[dict]:
    """
    Получение топ услуг по поисковому запросу с использованием Full-Text Search.
    Сортировка по search_rank, минимизация числа запросов.
    """
    query_base = (
        select(Service)
        .options(
            selectinload(Service.city),
            selectinload(Service.variant),
            selectinload(Service.specialist),
            selectinload(Service.reviews)  # Загружаем отзывы для подсчета
        )
        .order_by(Service.search_rank.desc().nulls_last())
        .limit(limit)
    )

    if query:
        # Оптимизируем полнотекстовый поиск: используем to_tsquery вместо plainto_tsquery
        query_base = query_base.filter(
            func.to_tsvector('russian', Service.name + ' ' + func.coalesce(Service.description, '')).op('@@')(
                func.to_tsquery('russian', query)
            )
        )

    result = await db.execute(query_base)
    services = result.scalars().unique().all()

    if not services:
        logger.info(f"Услуги по запросу '{query}' не найдены")
        return []

    # Упрощаем формирование результата
    tutors_with_data = [
        {
            "service": service,
            "review_count": len(service.reviews)
        }
        for service in services
    ]
    logger.info(f"Найдено {len(tutors_with_data)} услуг по запросу '{query}'")
    return tutors_with_data

async def get_top_rated_services(db: AsyncSession, limit: int = 3) -> list[dict]:
    """
    Получение топ услуг по рейтингу, отсортированных по rating.
    Минимизация числа запросов и упрощение обработки.
    """
    query = (
        select(Service)
        .options(
            selectinload(Service.city),
            selectinload(Service.variant),
            selectinload(Service.specialist),
            selectinload(Service.reviews)
        )
        .order_by(Service.rating.desc().nulls_last())
        .limit(limit)
    )

    result = await db.execute(query)
    services = result.scalars().unique().all()

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