from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, Request
from app.api.user.commands.user_crud import get_user, update_user
from app.api.user.schemas.response import UserResponse
from app.api.user.schemas.update  import UserUpdate
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


@router.patch(
    "/user/update",
    summary="Обновить данные пользователя",
    response_model=UserResponse
)
async def update_user_endpoint(
    request: Request,
    user: UserUpdate,
    db: AsyncSession = Depends(get_db)
):
    token = await get_access_token(request)
    email = await validate_access_token(token)
    user_data = user.dict(exclude_unset=True)
    updated_user = await update_user(db, email, user_data)
    return updated_user