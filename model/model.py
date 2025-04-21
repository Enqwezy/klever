from sqlalchemy import String, Column, Integer, Text, DECIMAL, DateTime, func, ForeignKey, Float
from sqlalchemy.orm import relationship
from database.db import Base
from sqlalchemy.dialects.postgresql import TSVECTOR


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), default="", nullable=True)
    email = Column(String(100), unique=True, nullable=True)
    phone_number = Column(String(20), nullable=True)
    address = Column(Text, default="", nullable=True)
    password = Column(String(255), default="", nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    reviews = relationship("Review", back_populates="user")
    favourites = relationship("Favourite", back_populates="user")


"""Услуги"""
class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    category_name = Column(String(100), default="", nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    variants = relationship("Variant", back_populates="category")


class Variant(Base):
    __tablename__ = "variants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), default="", nullable=False, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    category = relationship("Category", back_populates="variants")
    services = relationship("Service", back_populates="variant")


class City(Base):
    __tablename__ = "cities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), default="", nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    services = relationship("Service", back_populates="city")
    restaurants = relationship("Restaurant", back_populates="city")  


class Specialist(Base):
    __tablename__ = "specialists"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String(100), default="", nullable=False, index=True)
    phone_number = Column(String(20), nullable=True)
    email = Column(String(100), default="", nullable=True, index=True)
    photo = Column(Text, nullable=True)
    instagram_link = Column(Text, nullable=True)
    whatsapp_link = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    services = relationship("Service", back_populates="specialist")


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), default="", nullable=False, index=True)
    description = Column(Text, default="", nullable=True)
    price = Column(DECIMAL(10, 2), nullable=True)
    photo = Column(Text, nullable=True)
    rating = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    search_rank = Column(Float, default=0, nullable=True)
    search_vector = Column(TSVECTOR, nullable=True)

    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    variant_id = Column(Integer, ForeignKey("variants.id"), nullable=False)
    specialist_id = Column(Integer, ForeignKey("specialists.id"), nullable=False)

    city = relationship("City", back_populates="services")
    variant = relationship("Variant", back_populates="services")
    specialist = relationship("Specialist", back_populates="services")
    reviews = relationship("Review", back_populates="service")
    favourites = relationship("Favourite", back_populates="service")


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    description = Column(Text, default="", nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    service_id = Column(Integer, ForeignKey("services.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    service = relationship("Service", back_populates="reviews")
    user = relationship("User", back_populates="reviews")


class Favourite(Base):
    __tablename__ = "favourites"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=True)

    user = relationship("User", back_populates="favourites")
    service = relationship("Service", back_populates="favourites")


"""Рестораны"""
class CategoryRestaurant(Base):
    __tablename__ = "category_restaurants"

    id = Column(Integer, primary_key=True, index=True)
    category_name = Column(String(100), default="", nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    variant_restaurants = relationship("VariantRestaurant", back_populates="category_restaurant")


class VariantRestaurant(Base):
    __tablename__ = "variant_restaurants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), default="", nullable=False, index=True)
    category_restaurant_id = Column(Integer, ForeignKey("category_restaurants.id"), nullable=False)

    category_restaurant = relationship("CategoryRestaurant", back_populates="variant_restaurants")
    restaurants = relationship("Restaurant", back_populates="variant_restaurant")  


class RestaurantAdmin(Base):
    __tablename__ = "restaurant_admins"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String(100), default="", nullable=False, index=True)
    phone_number = Column(String(20), nullable=True)
    email = Column(String(100), default="", nullable=True, index=True)
    photo = Column(Text, nullable=True)
    instagram_link = Column(Text, nullable=True)
    whatsapp_link = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    restaurants = relationship("Restaurant", back_populates="restaurant_admin")


class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), default="", nullable=False, index=True)
    description = Column(Text, default="", nullable=True)
    price = Column(DECIMAL(10, 2), nullable=True)
    photo = Column(Text, nullable=True)
    rating = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    search_rank = Column(Float, default=0, nullable=True)
    search_vector = Column(TSVECTOR, nullable=True)

    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    variant_restaurant_id = Column(Integer, ForeignKey("variant_restaurants.id"), nullable=False)
    restaurant_admin_id = Column(Integer, ForeignKey("restaurant_admins.id"), nullable=False)  

    city = relationship("City", back_populates="restaurants")
    variant_restaurant = relationship("VariantRestaurant", back_populates="restaurants")
    restaurant_admin = relationship("RestaurantAdmin", back_populates="restaurants")