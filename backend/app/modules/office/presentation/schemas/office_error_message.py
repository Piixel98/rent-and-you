from pydantic import BaseModel, Field

from app.core.error.office_exception import (
    OfficeNotFoundError,
    OfficesNotFoundError,
    OfficeAlreadyExistsError,
)


class ErrorMessageOfficeNotFound(BaseModel):
    detail: str = Field(example=OfficeNotFoundError.message)


class ErrorMessageOfficesNotFound(BaseModel):
    detail: str = Field(example=OfficesNotFoundError.message)


class ErrorMessageOfficeAlreadyExists(BaseModel):
    detail: str = Field(example=OfficeAlreadyExistsError.message)
