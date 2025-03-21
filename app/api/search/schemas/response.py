from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal


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

class ServiceResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: Optional[Decimal] = None
    photo: Optional[str] = None
    rating: Optional[float] = None
    created_at: datetime
    city: CityResponse
    variant: VariantResponse
    specialist: SpecialistResponse
    review_count: int

    class Config:
        from_attributes = True