from pydantic import BaseModel
from typing import Optional


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    phone_number: int
    address: str

    class Config:
        from_attributes = True