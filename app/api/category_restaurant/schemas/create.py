from pydantic import BaseModel


class CategoryRestaurantCreate(BaseModel):
    category_name: str

    class Config:
        orm_mode = True