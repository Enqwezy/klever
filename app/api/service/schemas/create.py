from pydantic import BaseModel
from typing import Optional
from decimal import Decimal

class ServiceCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: Optional[Decimal] = None
    city_id: int
    variant_id: int
    specialist_id: int