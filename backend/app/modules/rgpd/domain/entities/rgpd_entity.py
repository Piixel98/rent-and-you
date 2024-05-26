import copy
from datetime import datetime
from typing import Any, Callable

from app.core.error.invalid_operation_exception import InvalidOperationError
from app.modules.rgpd.domain.entities.rgpd_command_model import RGPDUpdateModel


class RGPDEntity(object):
    """
    RGPD represents your collection of rgpds as an entity
    """

    def __init__(
        self,
        id_: int | None,
        rgpd: bool,
        lssi: bool,
        user_id: int,
        created_at: datetime | None = None,
        updated_at: datetime | None = None,
    ):
        self.id_ = id_
        self.rgpd = rgpd
        self.lssi = lssi
        self.user_id = user_id
        self.created_at = created_at
        self.updated_at = updated_at

    def update_entity(
        self,
        entity_update_model: "RGPDUpdateModel",
        get_update_data_fn: Callable[["RGPDUpdateModel"], dict[str, Any]],
    ) -> "RGPDEntity":
        update_data = get_update_data_fn(entity_update_model)
        update_entity = copy.deepcopy(self)

        for attr_name, value in update_data.items():
            update_entity.__setattr__(attr_name, value)

        return update_entity

    def mark_entity_as_deleted(self) -> "RGPDEntity":
        if self.is_deleted:
            raise InvalidOperationError("RGPD is already marked as deleted")

        marked_entity = copy.deepcopy(self)
        marked_entity.is_deleted = True

        return marked_entity

    def __eq__(self, other: object) -> bool:
        if isinstance(other, RGPDEntity):
            return self.id_ == other.id_

        return False

    def to_popo(self) -> object:
        return self.__dict__
