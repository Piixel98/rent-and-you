from pydantic import BaseModel, Field

from app.core.error.auth_exception import (
    InvalidCredentialsError,
    InsufficientPermissionsError,
)


class ErrorMessageInvalidCredentials(BaseModel):
    detail: str = Field(example=InvalidCredentialsError.message)


class ErrorMessageInsufficientPermissions(BaseModel):
    detail: str = Field(example=InsufficientPermissionsError.message)
