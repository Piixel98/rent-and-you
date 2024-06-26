import copy
from datetime import datetime
from typing import Any, Callable, TYPE_CHECKING

from app.core.error.invalid_operation_exception import InvalidOperationError

if TYPE_CHECKING:
    from app.modules.office.domain.entities.office_command_model import (
        OfficeUpdateModel,
    )


class OfficeEntity(object):
    """
    Office represents your collection of offices as an entity
    """

    def __init__(
        self,
        id_: int | None,
        name: str,
        phone: str,
        email: str,
        address: str,
        city: str,
        postal_code: str,
        geo_location: str = None,
        created_at: datetime | None = None,
        updated_at: datetime | None = None,
        is_deleted: bool | None = False,
        rents: list[int] = None,
    ):
        self.id_ = id_
        self.name = name
        self.phone = phone
        self.email = email
        self.address = address
        self.city = city
        self.postal_code = postal_code
        self.geo_location = geo_location
        self.created_at = created_at
        self.updated_at = updated_at
        self.is_deleted = is_deleted
        self.rents: list[int] = [] if rents is None else rents

    def update_entity(
        self,
        entity_update_model: "OfficeUpdateModel",
        get_update_data_fn: Callable[["OfficeUpdateModel"], dict[str, Any]],
    ) -> "OfficeEntity":
        update_data = get_update_data_fn(entity_update_model)
        update_entity = copy.deepcopy(self)

        for attr_name, value in update_data.items():
            update_entity.__setattr__(attr_name, value)

        return update_entity

    def mark_entity_as_deleted(self) -> "OfficeEntity":
        if self.is_deleted:
            raise InvalidOperationError("Office is already marked as deleted")

        marked_entity = copy.deepcopy(self)
        marked_entity.is_deleted = True

        return marked_entity

    def __eq__(self, other: object) -> bool:
        if isinstance(other, OfficeEntity):
            return self.id_ == other.id_

        return False

    def to_popo(self) -> object:
        return self.__dict__
