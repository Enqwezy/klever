from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_db
from app.api.g4f.commands.g4f_crud import process_chat_message
from app.api.g4f.schemas.g4f_response import ChatResponse
from app.api.g4f.schemas.g4f_request import ChatRequest


router = APIRouter()

@router.post(
    "/chat",
    summary="Общение с ботом для поиска услуг",
    response_model=ChatResponse
)
async def chat_with_bot(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db)
):
    reply = await process_chat_message(message=request.message, db=db)
    if isinstance(reply, dict):
        return reply
    return {"reply": reply}