from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    username: Optional[str] = Field("", max_length=100)
    email: EmailStr = Field(..., max_length=100)
    phone_number: Optional[str] = Field(None, max_length=20)
    address: Optional[str] 
    password: str = Field(..., min_length=8)


class UserLogin(BaseModel):
    email: EmailStr = Field(..., max_length=50)
    password: str = Field(..., min_length=8)