from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, APIRouter
from database.db import get_db
from app.api.variant_restaurant.commands.variant_restaurant_crud import get_variant_restaurants_by_category
from app.api.variant_restaurant.schemas.response import VariantRestaurantResponse


router = APIRouter()

@router.get(
    "/{category_restaurant_id}/variant_restaurants",
    summary="Получить все варианты ресторанов по ID категории",
    response_model=list[VariantRestaurantResponse]
)
async def read_variant_restaurants_by_category_restaurant(category_restaurant_id: int, db: AsyncSession = Depends(get_db)):
    variant_restaurants = await get_variant_restaurants_by_category(category_restaurant_id=category_restaurant_id, db=db)
    return variant_restaurants