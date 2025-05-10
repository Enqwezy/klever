from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from model.model import Restaurant, TypeFood, Food  

async def get_restaurant_with_foods(db: AsyncSession, restaurant_id: int):
    restaurant_query = (
        select(Restaurant)
        .where(Restaurant.id == restaurant_id)
        .options(
            joinedload(Restaurant.type_foods).joinedload(TypeFood.foods)
        )
    )
    restaurant_result = await db.execute(restaurant_query)
    restaurant = restaurant_result.scalars().first()
    
    return restaurant