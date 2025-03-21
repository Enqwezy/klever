from sqlalchemy.ext.asyncio import AsyncSession
import logging
from sqlalchemy import select
from model.model import Review, Service
from fastapi import HTTPException


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def create_review(user_id: int, service_id: int, description: str, db: AsyncSession):
    service_stmt = await db.execute(
        select(Service).filter(Service.id == service_id)
    )
    service = service_stmt.scalars().first()
    if not service:
        logger.info(f"Сервис с ID {service_id} не найден")
        raise HTTPException(status_code=404, detail="Сервис не найден")

    new_review = Review(
        user_id=user_id,
        service_id=service_id,
        description=description
    )
    db.add(new_review)
    await db.commit()
    await db.refresh(new_review)

    logger.info(f"Отзыв добавлен для сервиса с ID {service_id} пользователем с ID {user_id}")
    return new_review

async def get_reviews_by_service(service_id: int, db: AsyncSession):
    service_stmt = await db.execute(
        select(Service).filter(Service.id == service_id)
    )
    service = service_stmt.scalars().first()
    if not service:
        logger.info(f"Сервис с ID {service_id} не найден")
        raise HTTPException(status_code=404, detail="Сервис не найден")

    stmt = await db.execute(
        select(Review).filter(Review.service_id == service_id)
    )
    reviews = stmt.scalars().all()

    if not reviews:
        logger.info(f"Отзывы для сервиса с ID {service_id} не найдены")
        return []

    logger.info(f"Найдено {len(reviews)} отзывов для сервиса с ID {service_id}")
    return reviews