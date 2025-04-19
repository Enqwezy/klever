from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime
from model.model import CategoryRestaurant
import logging
from app.api.category_restaurant.schemas.create import CategoryRestaurantCreate


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def create_category_restaurant(category_restaurant: CategoryRestaurantCreate, db: AsyncSession):
    stmt = await db.execute(select(CategoryRestaurant).filter(CategoryRestaurant.category_name == category_restaurant.category_name))
    existing_category_restaurant = stmt.scalar_one_or_none()

    if existing_category_restaurant:
        raise HTTPException(
            status_code=400,
            detail="Категория ресторанов с таким именем уже существует"
        )
    
    new_restaurant_category = CategoryRestaurant(
        category_name=category_restaurant.category_name,
        created_at=func.now()
    )

    db.add(new_restaurant_category)
    await db.commit()
    await db.refresh(new_restaurant_category)

    logger.info(f"Создано новая категория ресторанов: {category_restaurant.category_name}")
    return new_restaurant_category