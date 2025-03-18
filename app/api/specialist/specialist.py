from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_db  
from app.api.specialist.commands.specialist_crud import create_specialist
from app.api.specialist.schemas.create import SpecialistCreate
from app.api.specialist.schemas.response import SpecialistResponse


router = APIRouter()

@router.post(
    "/specialists",
    summary="Создать нового специалиста",
    response_model=SpecialistResponse
)
async def create_new_specialist(
    specialist: SpecialistCreate,
    db: AsyncSession = Depends(get_db)
):
    specialist_data = specialist.dict(exclude_unset=True)  
    return await create_specialist(specialist_data=specialist_data, db=db)