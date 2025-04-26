import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from model.model import Variant, Category
from fastapi import UploadFile, HTTPException
import uuid
import os
import aiofiles


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_variants_by_category(category_id: int, db: AsyncSession):
    stmt = await db.execute(
        select(Variant).filter(Variant.category_id == category_id)
    )
    variants = stmt.scalars().all()

    if not variants:
        logger.info(f"Варианты для категории с ID {category_id} не найдены")
        return []  
    
    logger.info(f"Найдено {len(variants)} вариантов для категории с ID {category_id}")
    return variants


async def create_variant(
    name: str,
    category_id: int,
    photo: UploadFile | None,
    db: AsyncSession
) -> Variant:
    logger.debug(f"Creating variant with name={name}, category_id={category_id}")
    photo_path = None

    if photo:
        try:
            photo_filename = f"uploads/photos/variants/{uuid.uuid4()}_{photo.filename}"
            os.makedirs(os.path.dirname(photo_filename), exist_ok=True)
            async with aiofiles.open(photo_filename, "wb") as f:
                await f.write(await photo.read())
            photo_path = photo_filename
        except Exception as e:
            logger.error(f"Failed to save photo: {e}")
            raise HTTPException(status_code=500, detail="Failed to save photo")

    category = await db.get(Category, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    variant = Variant(
        name=name,
        category_id=category_id,
        photo=photo_path
    )

    db.add(variant)
    await db.commit()
    await db.refresh(variant)

    logger.info(f"Variant created with id={variant.id}")
    return variant