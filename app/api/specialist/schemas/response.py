from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SpecialistResponse(BaseModel):
    id: int
    fullname: str
    phone_number: Optional[str]
    email: str
    photo: Optional[str]
    instagram_link: Optional[str]
    whatsapp_link: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True