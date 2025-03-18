from sqlalchemy.ext.asyncio import AsyncSession
from app.api.favourite.commands.favourite_crud import create_favourite, get_user_by_email
from app.api.favourite.schemas.create import CreateFavourite
from fastapi import APIRouter, Depends, Request
from database.db import get_db
from app.api.auth.commands.context import validate_access_token_by_id, get_access_token


router = APIRouter()

@router.post(
    "/favourites",
    summary="Добавить сервис в избранное",
    response_model=CreateFavourite
)
async def add_to_favourites(request: Request,favourite: CreateFavourite,db: AsyncSession = Depends(get_db)):
    access_token = await get_access_token(request)
    email = await validate_access_token_by_id(access_token)
    user = await get_user_by_email(email=email, db=db)
    return await create_favourite(user_id=user.id, service_id=favourite.service_id, db=db)