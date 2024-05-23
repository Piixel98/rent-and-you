from pydantic import BaseModel, Field


class UserBaseModel(BaseModel):
    """
    UserBase common fields
    """

    document_type: str | None
    document_id: str | None
    first_name: str | None
    last_name: str | None
    postal_code: str | None
    address: str | None
    city: str | None
    phone_number: str | None
    is_superuser: bool | None = Field(default=False)
    hashed_password: str | None
    email: str | None = Field(example="test@test.com")
