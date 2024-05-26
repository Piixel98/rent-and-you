from datetime import date
from enum import Enum

from pydantic import BaseModel, Field


class DocumentType(str, Enum):
    nif = "nif"
    cif = "cif"
    nie = "nie"
    passport = "passport"


class UserRole(str, Enum):
    """
    User role
    """

    USER = "user"
    ADMIN = "admin"


class UserBaseModel(BaseModel):
    """
    UserBase common fields
    """

    document_type: DocumentType | None = Field(default=DocumentType.nif)
    document_id: str | None
    expiration_date: date | None
    first_name: str | None
    last_name: str | None
    postal_code: str | None
    address: str | None
    city: str | None
    phone_number: str | None
    role: UserRole | None = Field(default=UserRole.USER)
    hashed_password: str | None
    email: str | None = Field(example="test@test.com")
