from pydantic import BaseModel
from datetime import datetime


class ReviewResponse(BaseModel):
    id: int
    description: str
    created_at: datetime
    service_id: int
    user_id: int

    class Config:
        from_attributes = True