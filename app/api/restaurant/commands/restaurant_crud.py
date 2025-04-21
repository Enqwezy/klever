import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, update
from sqlalchemy.orm import joinedload
from fastapi import HTTPException
from model.model import Restaurant, RestaurantAdmin, City, VariantRestaurant


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_restaurants_by_category_restaurant(category_restaurant_id: int, db: AsyncSession):
    variant_restaurant_stmt = await db.execute(select(VariantRestaurant).filter(VariantRestaurant.category_restaurant_id == category_restaurant_id))
    variant_restaurants = variant_restaurant_stmt.scalars().all()

    if not variant_restaurants:
        logger.info(f"Варианты ресторанов для категории с ID {category_restaurant_id} не найдены, ресторанов нет")
        return []

    variant_restaurant_ids = [variant_restaurant.id for variant_restaurant in variant_restaurants]

    stmt = await db.execute(
        select(Restaurant)
        .filter(Restaurant.variant_restaurant_id.in_(variant_restaurant_ids))
        .options(
            joinedload(Restaurant.city),
            joinedload(Restaurant.reviews)
        )
    )
    resrourants = stmt.scalars().unique().all()

    if not resrourants:
        logger.info(f"Рестораны для вариантов категории с ID {category_restaurant_id} не найдены")
        return []

    restourants_with_data = [
        {
            "restourant": restourant,
            "review_count": len(restourant.reviews)  
        }
        for restourant in resrourants
    ]
    
    logger.info(f"Найдено {len(restourants_with_data)} ресторанов для категории с ID {category_restaurant_id}")
    return restourants_with_data

async def get_restaurant_by_id(restaurant_id: int, db: AsyncSession):
    stmt = await db.execute(select(Restaurant).filter(Restaurant.id == restaurant_id)
                            .options(
                                joinedload(Restaurant.city),
                                joinedload(Restaurant.variant_restaurant),
                                joinedload(Restaurant.restaurant_admin),
                                joinedload(Restaurant.reviews)
                            ))
    restaurant = stmt.scalars().first()

    if not restaurant:
        logger.info(f"Ресторан с ID {restaurant_id} не найден")
        raise HTTPException(status_code=404, detail="Ресторан не найден")
    
    await db.execute(
        update(Restaurant)
        .where(Restaurant.id == restaurant_id)
        .values(search_rank=Restaurant.search_rank + 0.1)
    )
    await db.commit()

    await db.refresh(restaurant)

    logger.info(f"РЕсторан с ID {restaurant_id} получен, search_rank увеличен до {restaurant.search_rank}")
    return {
        "restaurant": restaurant,
        "review_count": len(restaurant.reviews)
    }