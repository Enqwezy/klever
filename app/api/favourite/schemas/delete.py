from pydantic import BaseModel


class DeleteFavouriteResponse(BaseModel):
    message: str