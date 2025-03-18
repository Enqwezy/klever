from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_db
from fastapi import APIRouter, Depends
from app.api.category.schemas.create import CategoryCreate
from app.api.category.commands.category_crud import create_category
from model.model import Category
from app.api.category.schemas.response import CategoryResponse
from sqlalchemy import select
from typing import List
import logging


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

router = APIRouter()

@router.post(
    "/categories",
    summary="Создать новую категорию",
    response_model=CategoryCreate
)
async def category_create(category: CategoryCreate,db: AsyncSession = Depends(get_db)):
    return await create_category(category=category, db=db)


@router.get(
    "/all_categories",
    summary="Получить список всех категорий",
    response_model=List[CategoryResponse]
)
async def get_all_categories(db: AsyncSession = Depends(get_db)):
    stmt = await db.execute(select(Category))
    categories = stmt.scalars().all()

    if not categories:
        logger.info("Категории не найдены")
        return [] 
    logger.info(f"Найдено {len(categories)} категорий")
    return categories