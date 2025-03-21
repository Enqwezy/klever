from pydantic import BaseModel
from typing import Optional
from decimal import Decimal
from datetime import datetime


class FavouriteResponse(BaseModel):
    id: int

class CityResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class ServiceResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: Optional[Decimal] = None
    photo: Optional[str] = None
    city: CityResponse
    rating: Optional[float] = None

    class Config:
        from_attributes = True

class FavouriteResponse(BaseModel):
    id: int
    created_at: datetime
    user_id: int
    service: ServiceResponse

    class Config:
        from_attributes = True