from fastapi import Depends, APIRouter, Request, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from model.model import User
from database.db import get_db
from app.api.auth.commands.context import get_access_token, validate_access_token_by_id
from sqlalchemy import select
import logging
from app.api.review.commands.review_crud import create_review, get_reviews_by_service
from app.api.review.schemas.create import ReviewCreate
from app.api.review.schemas.response import ReviewResponse


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

router = APIRouter()

async def get_user_by_email(email: str, db: AsyncSession):
    stmt = await db.execute(
        select(User).filter(User.email == email)
    )
    user = stmt.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user

async def get_current_user(request: Request, db: AsyncSession = Depends(get_db)):
    access_token = await get_access_token(request)
    email = await validate_access_token_by_id(access_token)
    user = await get_user_by_email(email=email, db=db)
    logger.debug(f"Извлечен user_id={user.id} для email={email}")
    return user.id

@router.post(
    "/add-reviews",
    summary="Добавить отзыв к сервису",
    response_model=ReviewResponse
)
async def add_review(
    request: Request,
    review: ReviewCreate,
    user_id: int = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await create_review(
        user_id=user_id,
        service_id=review.service_id,
        description=review.description,
        db=db
    )

@router.get(
    "/reviews/{service_id}",
    summary="Получить все отзывы для сервиса",
    response_model=list[ReviewResponse]
)
async def get_reviews(
    service_id: int,
    db: AsyncSession = Depends(get_db)
):
    reviews = await get_reviews_by_service(service_id=service_id, db=db)
    return reviews