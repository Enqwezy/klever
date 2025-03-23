from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
from decimal import Decimal
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_db
from app.api.g4f.commands.tutor_crud import get_top_tutors
from app.api.g4f.schemas.tutor_response import TutorResponse


router = APIRouter()

@router.get(
    "/tutors",
    summary="Получить топ репетиторов по популярности (search_rank)",
    response_model=list[TutorResponse]
)
async def get_tutors(
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
):
    tutors_with_data = await get_top_tutors(db=db, limit=limit)
    return [
        {
            **tutor["service"].__dict__,
            "city": tutor["service"].city.__dict__,
            "variant": tutor["service"].variant.__dict__,
            "specialist": tutor["service"].specialist.__dict__,
            "review_count": tutor["review_count"]
        }
        for tutor in tutors_with_data
    ]