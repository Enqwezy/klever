import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from model.model import Variant


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_variants_by_category(db: AsyncSession, category_id: int):
    stmt = await db.execute(select(Variant.category_id == category_id))

    variants = stmt.scalars().all()

    if not variants:
        logger.info(f"Варианты для категории с ID {category_id} не найдены")
        return []
    
    logger.info(f"Найдено {len(variants)} вариантов для категории с ID {category_id}")
    return variants