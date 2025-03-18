from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime
from model.model import Category
import logging
from app.api.category.schemas.create import CategoryCreate


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def create_category(category: CategoryCreate, db: AsyncSession):
    stmt = await db.execute(
        select(Category).filter(Category.category_name == category.category_name)
    )
    existing_category = stmt.scalar_one_or_none()

    if existing_category:
        raise HTTPException(
            status_code=400,
            detail="Категория с таким именем уже существует"
        )
    
    new_category = Category(
        category_name=category.category_name,
        created_at=func.now()  
    )

    db.add(new_category)
    await db.commit()
    await db.refresh(new_category)

    logger.info(f"Создана новая категория: {category.category_name}")
    
    return new_category


