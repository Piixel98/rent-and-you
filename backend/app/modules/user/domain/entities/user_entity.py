import copy
from datetime import datetime, date
from enum import Enum
from typing import Any, Callable, TYPE_CHECKING

from app.core.error.invalid_operation_exception import InvalidOperationError

if TYPE_CHECKING:
    from app.modules.user.domain.entities.user_command_model import UserUpdateModel


class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"


class UserEntity(object):
    """
    User represents your collection of users as an entity
    """

    def __init__(
        self,
        id_: int | None,
        document_type: str,
        document_id: str,
        expiration_date: date | None,
        first_name: str,
        last_name: str,
        postal_code: str,
        address: str,
        phone_number: str,
        email: str,
        city: str,
        hashed_password: str,
        birth_date: date | None = None,
        role: str = UserRole.USER,
        is_active: bool | None = True,
        created_at: datetime | None = None,
        updated_at: datetime | None = None,
        is_deleted: bool | None = False,
        access_token: str | None = None,
    ):
        self.id_ = id_
        self.document_type = document_type
        self.document_id = document_id
        self.expiration_date = expiration_date
        self.first_name = first_name
        self.last_name = last_name
        self.postal_code = postal_code
        self.address = address
        self.city = city
        self.birth_date = birth_date
        self.phone_number = phone_number
        self.role = role
        self.hashed_password = hashed_password
        self.email = email
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
        self.is_deleted = is_deleted
        self.access_token = access_token

    def update_entity(
        self,
        entity_update_model: "UserUpdateModel",
        get_update_data_fn: Callable[["UserUpdateModel"], dict[str, Any]],
    ) -> "UserEntity":
        update_data = get_update_data_fn(entity_update_model)
        update_entity = copy.deepcopy(self)

        for attr_name, value in update_data.items():
            update_entity.__setattr__(attr_name, value)

        return update_entity

    def mark_entity_as_deleted(self) -> "UserEntity":
        if self.is_deleted:
            raise InvalidOperationError("User is already marked as deleted")

        marked_entity = copy.deepcopy(self)
        marked_entity.is_deleted = True

        return marked_entity

    def __eq__(self, other: object) -> bool:
        if isinstance(other, UserEntity):
            return self.id_ == other.id_

        return False

    def to_popo(self) -> object:
        return self.__dict__

    @staticmethod
    def password_to_hash(password: str) -> str:
        from app.core.auth import get_password_hash

        return get_password_hash(password)
