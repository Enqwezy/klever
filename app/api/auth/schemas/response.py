from json import dump
from pydantic import BaseModel
from typing import Optional



class UserResponse(BaseModel):
    id: int
    username: Optional[str]
    email: Optional[str]
    phone_number: Optional[str]
    address: Optional[str]

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    access_token_expire_time: str
    user: UserResponse