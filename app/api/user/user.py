from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, Request
from app.api.user.commands.user_crud import get_user
from app.api.user.schemas.response import UserResponse
from database.db import get_db
from app.api.auth.commands.context import get_access_token, validate_access_token


router = APIRouter()

@router.get(
    "/get-user",
    summary="Получить данные user",
    response_model=UserResponse
)   
async def get_user_by_email(request: Request, db: AsyncSession = Depends(get_db)):
    token = await get_access_token(request)
    email = await validate_access_token(token)
    user = await get_user(email, db)
    return user
