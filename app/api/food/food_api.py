from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.api.food.schemas.response import RestaurantResponse
from app.api.food.commands.food_crud import get_restaurant_with_foods
from database.db import get_db  


router = APIRouter()

@router.get(
    "/restaurants/{restaurant_id}/foods", 
    summary="Получить еду по ID ресторана",
    response_model=RestaurantResponse)
async def get_restaurant_foods(
    restaurant_id: int,
    db: AsyncSession = Depends(get_db)
):
    restaurant = await get_restaurant_with_foods(db, restaurant_id)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant