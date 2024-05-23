"""
    Config module
"""
from pydantic import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "RentAndYou API"

    # PostgresSQL
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_DB: str
    POSTGRES_PASSWORD: str

    # Superuser
    FIRST_SUPERUSER_EMAIL: str
    FIRST_SUPERUSER_PASSWORD: str

    # Auth
    API_KEY: str
