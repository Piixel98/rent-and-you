from pydantic import Field

from app.modules.user.domain.entities.user_common_model import UserBaseModel


class UserCreateModel(UserBaseModel):
    """
    UserCreateModel represents a write model to create a user
    """

    document_type: str
    document_id: str
    first_name: str
    postal_code: str
    address: str
    city: str
    phone_number: str | None
    is_superuser: bool | None = Field(default=False)
    hashed_password: str | None
    email: str = Field(example="test@test.com")


class UserUpdateModel(UserBaseModel):
    """
    UserUpdateModel represents a write model to update a user
    """

    document_type: str | None
    document_id: str | None
    first_name: str | None
    last_name: str | None
    postal_code: str | None
    address: str | None
    city: str | None
    phone_number: str | None
    is_superuser: bool = Field(default=False)
    hashed_password: str | None
    email: str = Field(example="test@test.com")
    is_active: bool | None = Field(example=True)
    is_deleted: bool | None = Field(example=True)
