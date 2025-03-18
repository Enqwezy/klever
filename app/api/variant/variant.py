from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, APIRouter
from database.db import get_db
from app.api.variant.schemas.response import VariantsResponse
from typing import List
from app.api.variant.commands.variant_crud import get_variants_by_category


router = APIRouter()

@router.get(
    "/categories/{category_id}/variants",
    summary="Получить все варианты по ID категории",
    response_model=list[VariantsResponse]
)
async def read_variants_by_category(category_id: int, db: AsyncSession = Depends(get_db)):
    return await get_variants_by_category(category_id=category_id, db=db)