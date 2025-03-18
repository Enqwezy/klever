from sqlalchemy.ext.asyncio import AsyncSession
from app.api.favourite.commands.favourite_crud import create_favourite
from app.api.favourite.schemas.create import CreateFavourite
from fastapi import APIRouter, Depends
from database.db import get_db
from app.api.auth.commands.context import validate_access_token


router = APIRouter()

@router.post(
    "/fourites",
    summary="Добавить сервис в избранное",
    response_model=CreateFavourite
)
async def add_to_favourites(db: AsyncSession = Depends(get_db), user_id: )