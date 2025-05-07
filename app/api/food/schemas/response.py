from pydantic import BaseModel
from typing import List, Optional
from decimal import Decimal
from datetime import datetime

class FoodResponse(BaseModel):
    id: int
    name: str
    massa: Optional[int]
    description: Optional[str]
    price: Decimal
    photo: Optional[str]

    class Config:
        orm_mode = True

class TypeFoodResponse(BaseModel):
    id: int
    type_name: str
    foods: List[FoodResponse]

    class Config:
        orm_mode = True

class RestaurantResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: Optional[Decimal]
    photo: Optional[str]
    rating: Optional[float]
    created_at: datetime
    type_foods: List[TypeFoodResponse]

    class Config:
        orm_mode = True