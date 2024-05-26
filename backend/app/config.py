"""
    Config module
"""
import secrets

from pydantic import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "RentAndYou API"
    API_V1_STR: str = "/api/v1"
    # PostgresSQL
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_DB: str
    POSTGRES_PASSWORD: str
    FILE_IMPORT_SQL: str

    # Superuser
    FIRST_SUPERUSER_EMAIL: str = "ADMIN@ADMIN.COM"
    FIRST_SUPERUSER_PASSWORD: str

    # Auth
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    SECRET_KEY: str = secrets.token_urlsafe(32)
