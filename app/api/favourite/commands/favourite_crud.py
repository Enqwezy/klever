from sqlalchemy.ext.asyncio import AsyncSession
from model.model import Favourite, Service, User
import logging
from fastapi import HTTPException
from sqlalchemy import select


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def create_favourite(db: AsyncSession, user_id: int, service_id: int):
    stmt = await db.execute(select(Service).filter(Service.id == service_id))
    service = stmt.scalars().first()

    if not service:
        raise HTTPException(status_code=404, detail="Сервис не найден")
    
    service_stmt = await db.execute(select(Favourite).filter(Favourite.user_id == user_id, Favourite.service_id == service_id))
    favourite = service_stmt.scalars().first()

    if not favourite:
        raise HTTPException(status_code=400, detail='Сервис уже в избранном')
    
    new_favourite = Favourite(
        user_id=user_id,
        service_id=service_id
    )
    db.add(new_favourite)
    await db.commit()
    await db.refresh(new_favourite)

    logger.info(f"Сервис с ID {service_id} добавлен в избранное пользователем с ID {user_id}")
    return new_favourite

async def get_user_by_email(email: str, db: AsyncSession):
    stmt = await db.execute(
        select(User).filter(User.email == email)
    )
    user = stmt.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user