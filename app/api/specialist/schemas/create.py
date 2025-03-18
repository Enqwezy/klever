from pydantic import BaseModel
from typing import Optional


class SpecialistCreate(BaseModel):
    fullname: str = ""
    phone_number: Optional[str] = None
    email: str = ""
    photo: Optional[str] = None
    instagram_link: Optional[str] = None
    whatsapp_link: Optional[str] = None
    rating: Optional[float] = None

    class Config:
        orm_mode = True