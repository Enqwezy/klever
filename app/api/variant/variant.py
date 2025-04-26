from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, APIRouter, Form, UploadFile, HTTPException
from database.db import get_db
from app.api.variant.schemas.response import VariantsResponse, VariantResponse
from app.api.variant.commands.variant_crud import get_variants_by_category, create_variant
import logging


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

router = APIRouter()

@router.get(
    "/categories/{category_id}/variants",
    summary="Получить все варианты по ID категории",
    response_model=list[VariantsResponse]
)
async def read_variants_by_category(
    category_id: int,
    db: AsyncSession = Depends(get_db)
):
    variants = await get_variants_by_category(category_id=category_id, db=db)
    return variants

@router.post(
    "/categories/add-variant",
    summary="Создать подкатегорий(variant)",
    response_model=VariantResponse
)
async def create_new_variant(
    name: str = Form(...),  
    category_id: int = Form(...),
    photo: UploadFile | None = Form(default=None),
    db: AsyncSession = Depends(get_db)
):
    logger.debug(f"Received request to create variant: name={name}, category_id={category_id}")
    try:
        variant = await create_variant(
            name=name,
            category_id=category_id,
            photo=photo,
            db=db
        )
        return {"id": variant.id, "name": variant.name, "message": "Variant created successfully"}
    except HTTPException as e:
        raise
    except Exception as e:
        logger.error(f"Error creating variant: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
    