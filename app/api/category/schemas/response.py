from pydantic import BaseModel
from datetime import datetime


class CategoryResponse(BaseModel):
    id: int
    category_name: str
    created_at: datetime

    class Config:
        orm_mode = True