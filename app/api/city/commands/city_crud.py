from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import logging
from model.model import City

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_all_cities(db: AsyncSession):
    stmt = await db.execute(select(City))
    cities = stmt.scalars().all()

    if not cities:
        logger.info("Города не найдены")
        return []  
    logger.info(f"Найдено {len(cities)} городов")
    return cities