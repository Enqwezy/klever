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
    summary="Получить топ услуг по поисковому запросу с использованием Full-Text Search",
    response_model=list[TutorResponse]
)
async def get_tutors(
    limit: int = 10,
    query: Optional[str] = None,  
    db: AsyncSession = Depends(get_db)
):
    tutors_with_data = await get_top_tutors(db=db, limit=limit, query=query)
    return [
        {
            "id": tutor["service"].id,
            "name": tutor["service"].name,
            "description": tutor["service"].description,
            "price": str(tutor["service"].price) if tutor["service"].price else None,
            "photo": tutor["service"].photo,
            "rating": tutor["service"].rating,
            "search_rank": tutor["service"].search_rank,
            "created_at": tutor["service"].created_at.isoformat(),
            "city": tutor["service"].city.__dict__,
            "variant": tutor["service"].variant.__dict__,
            "specialist": tutor["service"].specialist.__dict__,
            "review_count": tutor["review_count"]
        }
        for tutor in tutors_with_data
    ]