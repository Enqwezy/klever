from pydantic import BaseModel
from typing import Optional


class VariantsResponse(BaseModel):
    id: int
    name: str
    category_id: int

    class Config:
        orm_mode = True