from pydantic import BaseModel
from typing import Optional


class CreateFavourite(BaseModel):
    service_id: int