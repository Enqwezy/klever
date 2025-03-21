from sqlalchemy.ext.asyncio import AsyncSession
from model.model import Favourite, Service, User
import logging
from fastapi import HTTPException, Request, Depends
from sqlalchemy import select, delete
from sqlalchemy.orm import joinedload
from app.api.auth.commands.context import validate_access_token_by_id, get_access_token
from database.db import get_db


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def create_favourite(user_id: int, service_id: int, db: AsyncSession):
    service_stmt = await db.execute(
        select(Service).filter(Service.id == service_id)
    )
    service = service_stmt.scalars().first()
    if not service:
        logger.info(f"Сервис с ID {service_id} не найден")
        raise HTTPException(status_code=404, detail="Сервис не найден")

    existing_favourite_stmt = await db.execute(
        select(Favourite).filter(
            Favourite.user_id == user_id,
            Favourite.service_id == service_id
        )
    )
    existing_favourite = existing_favourite_stmt.scalars().first()
    
    logger.debug(f"Проверка избранного: user_id={user_id}, service_id={service_id}, результат={existing_favourite}")
    
    if existing_favourite is not None:  
        logger.info(f"Сервис с ID {service_id} уже в избранном у пользователя с ID {user_id}")
        raise HTTPException(status_code=400, detail=f"Сервис с ID {service_id} уже в избранном")

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

async def get_user_favourites(user_id: int, db: AsyncSession):
    stmt = await db.execute(
        select(Favourite)
        .filter(Favourite.user_id == user_id)
        .options(
            joinedload(Favourite.service).joinedload(Service.city)  
        )
    )
    favourites = stmt.scalars().unique().all()  

    if not favourites:
        logger.info(f"Избранное для пользователя с ID {user_id} пусто")
        return []

    logger.info(f"Найдено {len(favourites)} избранных сервисов для пользователя с ID {user_id}")
    return favourites 

async def get_current_user(request: Request, db: AsyncSession = Depends(get_db)):
    access_token = await get_access_token(request)
    email = await validate_access_token_by_id(access_token)
    user = await get_user_by_email(email=email, db=db)
    logger.debug(f"Извлечен user_id={user.id} для email={email}")
    return user.id

async def delete_favourite(user_id: int, service_id: int, db: AsyncSession):
    stmt = await db.execute(
        select(Favourite).filter(
            Favourite.user_id == user_id,
            Favourite.service_id == service_id
        )
    )
    favourite = stmt.scalars().first()

    if not favourite:
        logger.info(f"Сервис с ID {service_id} не найден в избранном у пользователя с ID {user_id}")
        raise HTTPException(status_code=404, detail="Сервис не найден в избранном")

    await db.execute(
        delete(Favourite).filter(
            Favourite.user_id == user_id,
            Favourite.service_id == service_id
        )
    )
    await db.commit()

    logger.info(f"Сервис с ID {service_id} удален из избранного пользователя с ID {user_id}")
    return {"message": f"Сервис с ID {service_id} удален из избранного"}