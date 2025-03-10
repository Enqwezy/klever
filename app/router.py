from fastapi import APIRouter
from app.api.auth.auth import router as auth_user_router

route = APIRouter()

route.include_router(auth_user_router, prefix="", tags=["UserAuthentication"])