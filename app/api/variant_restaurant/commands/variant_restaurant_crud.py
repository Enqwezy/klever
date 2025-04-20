import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from model.model import VariantRestaurant


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_variant_restaurants_by_category(category_restaurant_id: int, db: AsyncSession):
    stmt = await db.execute(
        select(VariantRestaurant).filter(VariantRestaurant.category_restaurant_id == category_restaurant_id)
    )
    variant_restaurants = stmt.scalars().all()

    if not variant_restaurants:
        logger.info(f"Вариант ресторанов для категории с ID {category_restaurant_id} не найдены")
        return []  
    
    logger.info(f"Найдено {len(variant_restaurants)} вариантов для категории с ID {category_restaurant_id}")
    return variant_restaurants