from datetime import date

from pydantic import Field

from app.modules.user.domain.entities.user_common_model import (
    UserBaseModel,
    UserRole,
    DocumentType,
)


class UserCreateModel(UserBaseModel):
    """
    UserCreateModel represents a write model to create a user
    """

    document_type: DocumentType
    document_id: str
    expiration_date: date
    first_name: str
    postal_code: str
    address: str
    city: str
    role: UserRole
    phone_number: str | None
    hashed_password: str
    email: str = Field(example="test@test.com")


class UserUpdateModel(UserBaseModel):
    """
    UserUpdateModel represents a write model to update a user
    """

    document_type: DocumentType | None
    document_id: str | None
    expiration_date: date | None
    first_name: str | None
    last_name: str | None
    postal_code: str | None
    address: str | None
    city: str | None
    phone_number: str | None
    hashed_password: str | None
    role: UserRole | None
    email: str | None = Field(example="test@test.com")
    is_active: bool | None = Field(example=True)
    is_deleted: bool | None = Field(example=True)
