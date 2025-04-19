from fastapi import APIRouter
from app.api.auth.auth import router as auth_user_router

from app.api.category.category import router as category_router
from app.api.city.city import router as city_router
from app.api.specialist.specialist import router as specialist_router
from app.api.variant.variant import router as variant_router
from app.api.service.service import router as service_router
from app.api.favourite.favourite import router as favourite_router
from app.api.review.review import router as review_router
from app.api.search.search import router as search_router

from app.api.g4f.g4f import router as chat_router
from app.api.g4f.tutor import router as tutor_router 

from app.api.category_restaurant.category_restaurant import router as category_restaurant_router


route = APIRouter()

"""Аутентификация"""
route.include_router(auth_user_router, prefix="", tags=["UserAuthentication"])

"""Услуги"""
route.include_router(category_router, prefix="", tags=["Category"])
route.include_router(city_router, prefix="", tags=["City"])
route.include_router(specialist_router, prefix="", tags=["Specialist"])
route.include_router(variant_router, prefix="", tags=["Variant"])
route.include_router(service_router, prefix="", tags=["Service"])
route.include_router(favourite_router, prefix="", tags=["Favourite"])
route.include_router(review_router, prefix="", tags=["Review"])
route.include_router(search_router, prefix="", tags=["Search"])

"""Нейронка"""
route.include_router(chat_router, prefix="", tags=["Chat"])
route.include_router(tutor_router, prefix="", tags=["Tutor"])

"""Рестораны"""
route.include_router(category_restaurant_router, prefix="/restaurants", tags=["Category-Restaurant"])