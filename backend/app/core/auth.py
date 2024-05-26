from datetime import datetime, timedelta
from typing import Any
from passlib.context import CryptContext

from app.core.database.postgres.database import get_db
from app.dependencies import get_settings

from pydantic import ValidationError
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from sqlalchemy.orm import Session
from typing import Annotated

from app.core import auth
from app.core.error.auth_exception import (
    InvalidCredentialsError,
    InactiveUserError,
    InsufficientPermissionsError,
)
from app.modules.auth.domain.entities.auth_common_model import TokenPayload
from app.modules.user.data.models.user import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
__setings = get_settings()
ALGORITHM = "HS256"
reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{__setings.API_V1_STR}/auth/login/access-token"
)


def create_access_token(
    subject: str | Any, role: str | Any, expires_delta: timedelta = None
) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=__setings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {
        "exp": expire,
        "sub": str(subject),
        "admin": True if role == "admin" else False,
    }
    encoded_jwt = jwt.encode(to_encode, __setings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


SessionDep = Annotated[Session, Depends(get_db)]
TokenDep = Annotated[str, Depends(reusable_oauth2)]


def get_current_user(session: SessionDep, token: TokenDep):
    try:
        payload = jwt.decode(token, __setings.SECRET_KEY, algorithms=[auth.ALGORITHM])
        token_data = TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise InvalidCredentialsError

    user = session.get(User, token_data.sub)
    if not user:
        raise InvalidCredentialsError
    if not user.is_active:
        raise InactiveUserError
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]


def get_current_active_superuser(current_user: CurrentUser):
    if not current_user.is_admin:
        raise InsufficientPermissionsError
    return current_user
