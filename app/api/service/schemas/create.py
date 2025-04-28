from pydantic import BaseModel, Field
from typing import Optional
from decimal import Decimal

class ServiceCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: Optional[Decimal] = None
    rating: Optional[float] = Field(None, ge=0, le=5)
    city_id: int
    variant_id: int
    specialist_id: int