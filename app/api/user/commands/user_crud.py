from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import logging
from model.model import User
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_user(email: str, db: AsyncSession):
    stmt = await db.execute(select(User).filter(User.email == email))
    user = stmt.scalars().first()
    if not user:
        logger.info(f"User с таким {email} email не найден")
        raise HTTPException(status_code=404, detail="User не найден")
    
    return user


async def update_user(db: AsyncSession, email: str, user_data: dict):
    result = await db.execute(select(User).filter(User.email == email))
    db_user = result.scalars().first()
    
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    for key, value in user_data.items():
        if value is not None:
            setattr(db_user, key, value)
    
    try:
        await db.commit()
        await db.refresh(db_user)
        return db_user
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Email already exists")