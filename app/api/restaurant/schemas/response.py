from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal


class CityResponse(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

class RestaurantAdminResponse(BaseModel):
    id: int
    fullname: str
    phone_number: Optional[str] = None
    email: Optional[str] = None
    photo: Optional[str] = None
    instagram_link: Optional[str] = None
    whatsup_link: Optional[str] = None

'''Получить все рестораны'''
class RestaurantsResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: Optional[Decimal]
    photo: Optional[str] = None
    created_at: datetime
    city: CityResponse
    review_count: int
    rating: Optional[float] = None

    class Config:
        orm_mode = True

'''Получить рестоарны по ID'''
class RestaurantResponse(BaseModel):
    name: str
    description: Optional[str] = None
    price: Optional[Decimal]
    photo: Optional[str] = None
    city: CityResponse
    restaurant_admin: RestaurantAdminResponse