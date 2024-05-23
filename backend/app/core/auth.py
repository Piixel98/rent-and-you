from fastapi import Security, HTTPException, status
from fastapi.security import APIKeyHeader

from app.dependencies import get_settings

settings = get_settings()

api_key_header = APIKeyHeader(name="X-API-Key")
API_KEYS = [settings.API_KEY]


def get_user(api_key: str = Security(api_key_header)):
    if api_key not in API_KEYS:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid API key",
        )
