from pydantic import BaseModel
from typing import Optional


class VariantRestaurantResponse(BaseModel):
    id: int
    name: str
    category_restaurant_id: int

    class Config:
        from_attributes = True