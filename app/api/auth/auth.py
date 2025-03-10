from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.auth.schemas.create import UserCreate, UserLogin
from app.api.auth.schemas.response import TokenResponse
from app.api.auth.commands.auth_crud import user_register, user_login
from database.db import get_db

router = APIRouter()

@router.post(
    '/register',
    summary="Register a new user or update existing"
)
async def register(user: UserCreate,db: AsyncSession = Depends(get_db)):
    return await user_register(user=user, db=db)

@router.post(
    '/login',
    summary="Login user",
    response_model=TokenResponse
)
async def login(login_data: UserLogin,db: AsyncSession = Depends(get_db)):
    return await user_login(email=login_data.email,password=login_data.password,db=db)