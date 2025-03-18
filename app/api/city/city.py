from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_db  
from app.api.city.commands.city_crud import get_all_cities
from app.api.city.schemas.response import CityResponse


router = APIRouter()

@router.get(
    "/cities",
    summary="Получить список всех городов",
    response_model=List[CityResponse]
)
async def read_all_cities(db: AsyncSession = Depends(get_db)):
    return await get_all_cities(db=db)