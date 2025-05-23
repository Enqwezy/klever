import logging
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.auth.schemas.create import UserCreate
from app.api.auth.schemas.response import TokenResponse, UserResponse
from model.model import User
from .context import create_access_token, hash_password, verify_password
from fastapi import HTTPException
from datetime import datetime


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def user_register(user: UserCreate, db: AsyncSession):
    stmt = await db.execute(
        select(User).filter(User.email == user.email)
    )
    existing_user = stmt.scalar_one_or_none()

    hashed_password = hash_password(user.password)
    
    if existing_user:
        await db.execute(
            update(User)
            .where(User.email == user.email)
            .values(
                username=user.username,
                phone_number=user.phone_number,
                address=user.address,
                password=hashed_password,
            )
        )
        logger.info(f"Updated user with email: {user.email}")
    else:
        new_user = User(
            username=user.username,
            email=user.email,
            phone_number=user.phone_number,
            address=user.address,
            password=hashed_password,
        )
        db.add(new_user)
        logger.info(f"Created new user with email: {user.email}")
    
    await db.commit()

    stmt = await db.execute(
        select(User).filter(User.email == user.email)
    )
    db_user = stmt.scalar_one_or_none()

    access_token, expire_time = create_access_token(data={"sub": user.email})

    return TokenResponse(
        access_token=access_token,
        access_token_expire_time=expire_time,
        user=UserResponse.from_orm(db_user)
    )

async def user_login(email: str, password: str, db: AsyncSession):
    stmt = await db.execute(
        select(User).filter(User.email == email)
    )
    user = stmt.scalar_one_or_none()

    if not user or not verify_password(password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password"
        )
    
    access_token, expire_time = create_access_token(data={"sub": user.email})
    return TokenResponse(
        access_token=access_token,
        access_token_expire_time=expire_time,
        user=UserResponse.from_orm(user)
    )