from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal



class Cityresponse(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

class SpecialistResponse(BaseModel):
    id: int
    fullname: str
    phone_number: Optional[str] = None
    email: Optional[str] = None
    photo: Optional[str] = None
    instagram_link: str
    whatsup_link: str

'''Получить все сервисы'''
class ServicesResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: Optional[Decimal]
    photo: Optional[str] = None
    created_at: datetime
    city: Cityresponse
    review_count: int
    rating: Optional[float] = None

    class Config:
        orm_mode = True

'''Получить сервис по ID'''
class ServiceResponse(BaseModel):
    name: str
    description: Optional[str] = None
    price: Optional[Decimal]
    photo: Optional[str] = None
    city: Cityresponse
    specialist: SpecialistResponse
    