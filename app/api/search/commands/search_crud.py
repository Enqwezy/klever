from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from model.model import Service, Restaurant, TypeFood, City, VariantRestaurant, RestaurantAdmin
from typing import List, Optional
import logging


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_services(
    db: AsyncSession,
    city_ids: List[int] | None = None,
    variant_ids: List[int] | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    min_rating: float | None = None,
    max_rating: float | None = None,
    search_query: str | None = None
):
    rank_column = func.ts_rank(Service.search_vector, func.plainto_tsquery('russian', search_query)).label('rank') if search_query else None

    query = (
        select(Service)
        .options(
            joinedload(Service.city),
            joinedload(Service.variant),
            joinedload(Service.specialist),
            joinedload(Service.reviews)
        )
    )

    if search_query:
        logger.debug(f"Поиск по запросу: {search_query}")
        tsquery = func.plainto_tsquery('russian', search_query)
        query = query.filter(Service.search_vector.op('@@')(tsquery))
        query = query.order_by(func.ts_rank(Service.search_vector, tsquery).desc())

    if city_ids:
        logger.debug(f"Фильтр по city_ids: {city_ids}")
        query = query.filter(Service.city_id.in_(city_ids))
    if variant_ids:
        logger.debug(f"Фильтр по variant_ids: {variant_ids}")
        query = query.filter(Service.variant_id.in_(variant_ids))
    if min_price is not None:
        query = query.filter(Service.price >= min_price)
    if max_price is not None:
        query = query.filter(Service.price <= max_price)
    if min_rating is not None:
        query = query.filter(Service.rating >= min_rating)
    if max_rating is not None:
        query = query.filter(Service.rating <= max_rating)

    stmt = await db.execute(query)
    services = stmt.scalars().unique().all()

    if not services:
        logger.info(f"Сервисы по заданным фильтрам не найдены")
        return []

    services_with_data = [
        {
            "service": service.Service if isinstance(service, tuple) else service,
            "review_count": len((service.Service if isinstance(service, tuple) else service).reviews),
            "rank": service.rank if isinstance(service, tuple) and search_query else 0.0
        }
        for service in services
    ]

    logger.info(f"Найдено {len(services_with_data)} сервисов по заданным фильтрам")
    return services_with_data


async def get_restaurants(
    db: AsyncSession,
    city_ids: Optional[List[int]] = None,
    variant_restaurant_ids: Optional[List[int]] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_rating: Optional[float] = None,
    max_rating: Optional[float] = None,
    search_query: Optional[str] = None
):
    rank_column = func.ts_rank(Restaurant.search_vector, func.plainto_tsquery('russian', search_query)).label('rank') if search_query else None

    type_food_count_subquery = (
        select(
            TypeFood.restaurant_id,
            func.count(TypeFood.id).label('type_food_count')
        )
        .group_by(TypeFood.restaurant_id)
        .subquery()
    )

    query = select(Restaurant)
    if search_query:
        query = query.add_columns(rank_column)
    query = query.outerjoin(
        type_food_count_subquery,
        type_food_count_subquery.c.restaurant_id == Restaurant.id
    )
    query = query.add_columns(
        func.coalesce(type_food_count_subquery.c.type_food_count, 0).label('type_food_count')
    )

    if search_query:
        logger.debug(f"Поиск по запросу: {search_query}")
        tsquery = func.plainto_tsquery('russian', search_query)
        query = query.filter(Restaurant.search_vector.op('@@')(tsquery))
        query = query.order_by(rank_column.desc())
    else:
        query = query.order_by(Restaurant.id)

    if city_ids:
        logger.debug(f"Фильтр по city_ids: {city_ids}")
        query = query.filter(Restaurant.city_id.in_(city_ids))
    if variant_restaurant_ids:
        logger.debug(f"Фильтр по variant_restaurant_ids: {variant_restaurant_ids}")
        query = query.filter(Restaurant.variant_restaurant_id.in_(variant_restaurant_ids))
    if min_price is not None:
        query = query.filter(Restaurant.price >= min_price)
    if max_price is not None:
        query = query.filter(Restaurant.price <= max_price)
    if min_rating is not None:
        query = query.filter(Restaurant.rating >= min_rating)
    if max_rating is not None:
        query = query.filter(Restaurant.rating <= max_rating)

    result = await db.execute(query)
    rows = result.all()

    if not rows:
        logger.info("Рестораны по заданным фильтрам не найдены")
        return []

    restaurants_with_data = []
    for row in rows:
        restaurant = row[0] if isinstance(row, tuple) else row
        rank = row[1] if search_query and isinstance(row, tuple) and len(row) > 1 else 0.0
        type_food_count = row[-1] if isinstance(row, tuple) and len(row) > 2 else 0
        logger.debug(f"Restaurant: {restaurant}, ID: {getattr(restaurant, 'id', 'N/A')}, Type food count: {type_food_count}")

        city = await db.get(City, restaurant.city_id) if getattr(restaurant, 'city_id', None) else None
        variant_restaurant = await db.get(VariantRestaurant, restaurant.variant_restaurant_id) if getattr(restaurant, 'variant_restaurant_id', None) else None
        restaurant_admin = await db.get(RestaurantAdmin, restaurant.restaurant_admin_id) if getattr(restaurant, 'restaurant_admin_id', None) else None

        restaurants_with_data.append({
            "restaurant": restaurant,
            "type_food_count": int(type_food_count),
            "rank": float(rank) if rank is not None else 0.0,
            "city": city,
            "variant_restaurant": variant_restaurant,
            "restaurant_admin": restaurant_admin
        })

    logger.info(f"Найдено {len(restaurants_with_data)} ресторанов по заданным фильтрам")
    return restaurants_with_data