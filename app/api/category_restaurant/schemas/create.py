from pydantic import BaseModel


class CategoryRestaurantCreate(BaseModel):
    category_name: str

    class Config:
        from_attributes = True