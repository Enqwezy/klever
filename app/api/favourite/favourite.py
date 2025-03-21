from sqlalchemy.ext.asyncio import AsyncSession
from app.api.favourite.commands.favourite_crud import create_favourite, get_user_by_email, get_user_favourites, get_current_user, delete_favourite
from app.api.favourite.schemas.create import CreateFavourite
from fastapi import APIRouter, Depends, Request
from database.db import get_db
from app.api.auth.commands.context import validate_access_token_by_id, get_access_token
from app.api.favourite.schemas.response import FavouriteResponse
from app.api.favourite.schemas.delete import DeleteFavouriteResponse


router = APIRouter()

@router.post(
    "/add-favourites",
    summary="Добавить сервис в избранное",
    response_model=CreateFavourite
)
async def add_to_favourites(request: Request,favourite: CreateFavourite,db: AsyncSession = Depends(get_db)):
    access_token = await get_access_token(request)
    email = await validate_access_token_by_id(access_token)
    user = await get_user_by_email(email=email, db=db)
    return await create_favourite(user_id=user.id, service_id=favourite.service_id, db=db)

@router.get(
    "/favourites",
    summary="Получить все избранные сервисы пользователя",
    response_model=list[FavouriteResponse]
)
async def get_favourites(
    user_id: int = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    favourites = await get_user_favourites(user_id=user_id, db=db)
    return [
        {
            **favourite.__dict__,
            "service": {
                **favourite.service.__dict__,
                "city": favourite.service.city.__dict__
            }
        }
        for favourite in favourites
    ]

@router.delete(
    "/favourites/{service_id}",
    summary="Удалить сервис из избранного",
    response_model=DeleteFavouriteResponse
)
async def remove_from_favourites(
    service_id: int,
    user_id: int = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await delete_favourite(user_id=user_id, service_id=service_id, db=db)