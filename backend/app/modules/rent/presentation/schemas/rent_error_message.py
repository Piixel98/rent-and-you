from pydantic import BaseModel, Field

from app.core.error.rent_exception import (
    RentNotFoundError,
    RentsNotFoundError,
    RentAlreadyExistsError,
)


class ErrorMessageRentNotFound(BaseModel):
    detail: str = Field(example=RentNotFoundError.message)


class ErrorMessageRentsNotFound(BaseModel):
    detail: str = Field(example=RentsNotFoundError.message)


class ErrorMessageRentAlreadyExists(BaseModel):
    detail: str = Field(example=RentAlreadyExistsError.message)
