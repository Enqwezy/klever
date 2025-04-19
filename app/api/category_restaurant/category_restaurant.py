from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_db
from fastapi import Depends, APIRouter
from app.api.category_restaurant.schemas.create import CategoryRestaurantCreate
from app.api.category_restaurant.commands.category_restaurant_crud import create_category_restaurant
from model.model import CategoryRestaurant
from app.api.category_restaurant.schemas.response import CategoryRestaurantResponse
from sqlalchemy import select
from typing import List
import logging


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

router = APIRouter()

@router.post(
    "category_restaurants",
    summary="Создать новую категорию ресторанов",
    response_model=CategoryRestaurantCreate
)
async def category_restaurant_create(category_restaurant: CategoryRestaurantCreate, db: AsyncSession = Depends(get_db)):
    return await create_category_restaurant(category_restaurant=category_restaurant, db=db)


@router.get(
    "/all-category-restaurants",
    summary="Получить все категории ресторанов",
    response_model=List[CategoryRestaurantResponse]
)
async def get_all_category_restaurants(db: AsyncSession = Depends(get_db)):
    stmt = await db.execute(select(CategoryRestaurant))
    category_restaurants = stmt.scalars().all()

    if not category_restaurants:
        logger.info("Категория ресторанов не найдено")
        return []
    logger.info(f"Найдено {len(category_restaurants)} категорий ресторанов")
    return category_restaurants