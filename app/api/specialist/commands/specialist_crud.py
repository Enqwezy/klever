from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from fastapi import HTTPException
import logging
from model.model import Specialist  


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def create_specialist(specialist_data: dict, db: AsyncSession):
    stmt = await db.execute(
        select(Specialist).filter(
            (Specialist.email == specialist_data["email"]) |
            (Specialist.phone_number == specialist_data["phone_number"])
        )
    )
    existing_specialist = stmt.scalar_one_or_none()

    if existing_specialist:
        raise HTTPException(
            status_code=400,
            detail="Специалист с таким email или номером телефона уже существует"
        )

    new_specialist = Specialist(
        fullname=specialist_data["fullname"],
        phone_number=specialist_data["phone_number"],
        email=specialist_data["email"],
        photo=specialist_data.get("photo"),  
        instagram_link=specialist_data.get("instagram_link"),  
        whatsapp_link=specialist_data.get("whatsapp_link"),  
        rating=specialist_data.get("rating"),  
        created_at=func.now()  
    )
    
    db.add(new_specialist)
    await db.commit()
    await db.refresh(new_specialist)  
    
    logger.info(f"Создан новый специалист: {new_specialist.fullname} (ID: {new_specialist.id})")
    return new_specialist