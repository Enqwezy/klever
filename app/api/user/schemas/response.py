from pydantic import BaseModel
from typing import Optional


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    phone_number: Optional[str] | None
    address: str

    class Config:
        from_attributes = True
