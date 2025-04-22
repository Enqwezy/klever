from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import logging
from model.model import User
from fastapi import HTTPException


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def get_user(email: str, db: AsyncSession):
    stmt = await db.execute(select(User).filter(User.email == email))
    user = stmt.scalars().first()
    if not user:
        logger.info(f"User с таким {email} email не найден")
        raise HTTPException(status_code=404, detail="User не найден")
    
    return user
