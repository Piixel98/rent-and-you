from fastapi import Depends
from jose import jwt
from passlib.context import CryptContext
from pydantic import ValidationError


from app.core.error.auth_exception import (
    InvalidCredentialsError,
    InsufficientPermissionsError,
)
from app.dependencies import get_settings
from fastapi.security import OAuth2PasswordBearer

from app.modules.auth.domain.entities.auth_common_model import TokenPayload

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
__settings = get_settings()
reusable_oauth2 = OAuth2PasswordBearer(tokenUrl=f"{__settings.API_V1_STR}/auth/signin")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def get_current_user(token: str = Depends(reusable_oauth2)) -> TokenPayload:
    try:
        payload = jwt.decode(token, __settings.SECRET_KEY, algorithms=["HS256"])
        token_data = TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise InvalidCredentialsError

    return token_data


def get_current_active_admin(token: TokenPayload = Depends(get_current_user)):
    if token.admin is False:
        raise InsufficientPermissionsError

    return token


def get_current_active_user(token: TokenPayload = Depends(get_current_user)):
    return token
