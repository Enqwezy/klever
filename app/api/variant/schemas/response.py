from pydantic import BaseModel
from typing import Optional


class VariantsResponse(BaseModel):
    id: int
    name: str
    photo: str
    category_id: int

    class Config:
        from_attributes = True

class VariantResponse(BaseModel):
    id: int
    name: str
    message: str