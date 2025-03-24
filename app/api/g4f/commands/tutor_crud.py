from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import joinedload
import logging
from model.model import Service, Variant  

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_top_tutors(db: AsyncSession, limit: int = 10):
    """Получение репетиторов, отсортированных по search_rank."""
    query = (
        select(Service)
        .join(Variant, Variant.id == Service.variant_id) 
        .filter(Service.name.ilike('%репетитор%'))  
        .options(
            joinedload(Service.city),
            joinedload(Service.variant),
            joinedload(Service.specialist),
            joinedload(Service.reviews)
        )
        .order_by(Service.search_rank.desc())
        .limit(limit)
    )

    stmt = await db.execute(query)
    services = stmt.scalars().unique().all()

    if not services:
        logger.info("Репетиторы не найдены")
        return []

    tutors_with_data = [
        {
            "service": service,
            "review_count": len(service.reviews)
        }
        for service in services
    ]
    logger.info(f"Найдено {len(tutors_with_data)} репетиторов")
    return tutors_with_data