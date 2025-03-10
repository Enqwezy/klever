from sqlalchemy import String, DateTime, func, Column, Integer, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database.db import Base
from typing import Optional


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), default="", nullable=True)
    email = Column(String(100), unique=True, nullable=True)
    phone_number = Column(String(20), nullable=True)
    address = Column(Text, default="", nullable=True)
    password = Column(String(255), default="", nullable=True)

    created_at = Column(
        DateTime(timezone=True), 
        default=func.now(), 
        onupdate=func.now(), 
        nullable=True
    )