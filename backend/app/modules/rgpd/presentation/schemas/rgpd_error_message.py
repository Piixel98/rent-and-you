from pydantic import BaseModel, Field

from app.core.error.rgpd_exception import (
    RGPDNotFoundError,
    RGPDsNotFoundError,
    RGPDAlreadyExistsError,
)


class ErrorMessageRGPDNotFound(BaseModel):
    detail: str = Field(example=RGPDNotFoundError.message)


class ErrorMessageRGPDsNotFound(BaseModel):
    detail: str = Field(example=RGPDsNotFoundError.message)


class ErrorMessageRGPDAlreadyExists(BaseModel):
    detail: str = Field(example=RGPDAlreadyExistsError.message)
