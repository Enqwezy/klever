from pydantic import BaseModel
from datetime import datetime


class ReviewCreate(BaseModel):
    service_id: int
    description: str

