from datetime import datetime

from pydantic import Field

from app.modules.user.domain.entities.user_entity import UserEntity
from app.modules.user.domain.entities.user_common_model import UserBaseModel


class UserReadModel(UserBaseModel):
    """
    UserReadModel represents data structure as a read model
    """

    id_: int | None = Field()
    is_active: bool | None = Field(example=True)
    is_deleted: bool | None = Field(example=True)
    created_at: datetime | None
    updated_at: datetime | None

    class Config:
        orm_mode = True

    @staticmethod
    def from_entity(entity: UserEntity) -> "UserReadModel":
        return UserReadModel(
            id_=entity.id_,
            document_type=entity.document_type,
            document_id=entity.document_id,
            expiration_date=entity.expiration_date,
            first_name=entity.first_name,
            last_name=entity.last_name,
            postal_code=entity.postal_code,
            hashed_password=entity.hashed_password,
            address=entity.address,
            city=entity.city,
            phone_number=entity.phone_number,
            role=entity.role,
            email=entity.email,
            is_active=entity.is_active,
            is_deleted=entity.is_deleted,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
        )
