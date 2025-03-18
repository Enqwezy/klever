from pydantic import BaseModel


class CategoryCreate(BaseModel):
    category_name: str

    class Config:
        orm_mode = True