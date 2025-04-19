from pydantic import BaseModel
from datetime import datetime


class CategoryRestaurantResponse(BaseModel):
    id: int
    category_name: str
    created_at: datetime

    class Config:
        orm_mode = True