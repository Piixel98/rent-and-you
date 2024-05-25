import copy
from datetime import datetime
from typing import Any, Callable, TYPE_CHECKING

from app.core.error.invalid_operation_exception import InvalidOperationError

if TYPE_CHECKING:
    from app.modules.rent.domain.entities.rent_command_model import RentUpdateModel


class RentEntity(object):
    """
    Rent represents your collection of rents as an entity
    """

    def __init__(
        self,
        id_: int | None,
        amount: float,
        total_days: int,
        pickup_date: datetime,
        return_date: datetime,
        vehicle_id: int,
        office_id: int,
        user_id: int,
        created_at: datetime | None = None,
        updated_at: datetime | None = None,
        is_deleted: bool | None = False,
    ):
        self.id_ = id_
        self.amount = amount
        self.total_days = total_days
        self.pickup_date = pickup_date
        self.return_date = return_date
        self.created_at = created_at
        self.updated_at = updated_at
        self.is_deleted = is_deleted
        self.vehicle_id = vehicle_id
        self.office_id = office_id
        self.user_id = user_id

    def update_entity(
        self,
        entity_update_model: "RentUpdateModel",
        get_update_data_fn: Callable[["RentUpdateModel"], dict[str, Any]],
    ) -> "RentEntity":
        update_data = get_update_data_fn(entity_update_model)
        update_entity = copy.deepcopy(self)

        for attr_name, value in update_data.items():
            update_entity.__setattr__(attr_name, value)

        return update_entity

    def mark_entity_as_deleted(self) -> "RentEntity":
        if self.is_deleted:
            raise InvalidOperationError("Rent is already marked as deleted")

        marked_entity = copy.deepcopy(self)
        marked_entity.is_deleted = True

        return marked_entity

    def __eq__(self, other: object) -> bool:
        if isinstance(other, RentEntity):
            return self.id_ == other.id_

        return False

    def to_popo(self) -> object:
        return self.__dict__
