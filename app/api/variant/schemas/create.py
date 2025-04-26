from pydantic import BaseModel
from typing import Optional


class VariantCreate(BaseModel):
    name: Optional[str] = ""
    category_id: Optional[int] = None

    class Config:
        from_attributes = True