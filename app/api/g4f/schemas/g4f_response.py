from pydantic import BaseModel
from typing import Optional, List
from app.api.g4f.schemas.tutor_response import TutorResponse


class ChatResponse(BaseModel):
    reply: str
    tutors: Optional[List[TutorResponse]] = None