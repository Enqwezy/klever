from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, max_length=100)
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = Field(None, max_length=20)
    address: Optional[str] = None

    class Config:
        from_attributes = True