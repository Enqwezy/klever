from pydantic import BaseModel
from typing import Optional
from decimal import Decimal
from datetime import datetime


class CityResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class VariantResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class SpecialistResponse(BaseModel):
    id: int
    fullname: str
    phone_number: Optional[str] = None
    email: Optional[str] = None
    photo: Optional[str] = None
    instagram_link: Optional[str] = None
    whatsapp_link: Optional[str] = None

    class Config:
        from_attributes = True

class TutorResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: Optional[Decimal] = None
    photo: Optional[str] = None
    created_at: datetime | None = None
    city: CityResponse
    review_count: int | None = None
    rating: Optional[float] = None  
