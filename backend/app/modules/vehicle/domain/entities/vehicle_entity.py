import copy
from datetime import datetime
from pydantic.schema import date
from typing import Any, Callable, TYPE_CHECKING

from app.core.error.invalid_operation_exception import InvalidOperationError
from app.modules.rent.domain.entities.rent_query_model import RentReadModel

if TYPE_CHECKING:
    from app.modules.vehicle.domain.entities.vehicle_command_model import (
        VehicleUpdateModel,
    )


class VehicleEntity(object):
    """
    Vehicle represents your collection of vehicles as an entity
    """

    def __init__(
        self,
        id_: int | None,
        model: str,
        version: str,
        color: str,
        brand: str,
        kms: int,
        license_plate: str,
        gearbox: str,
        body_type: str,
        passengers: int,
        office_id: int,
        fare: str | None,
        price_per_day: float | None = None,
        purchase_date: date = None,
        image_url: str = None,
        avg_consumption: float | None = None,
        created_at: datetime | None = None,
        updated_at: datetime | None = None,
        is_deleted: bool | None = False,
        rent_id: int | None = None,
    ):
        self.id_ = id_
        self.model = model
        self.version = version
        self.color = color
        self.brand = brand
        self.kms = kms
        self.price_per_day = price_per_day
        self.license_plate = license_plate
        self.purchase_date = purchase_date
        self.gearbox = gearbox
        self.body_type = body_type
        self.image_url = image_url
        self.passengers = passengers
        self.avg_consumption = avg_consumption
        self.fare = fare
        self.created_at = created_at
        self.updated_at = updated_at
        self.is_deleted = is_deleted
        self.rent_id = rent_id
        self.office_id = office_id

    def __eq__(self, other) -> bool:
        if isinstance(other, VehicleEntity):
            return self.id_ == other.id_

        return False

    def update_entity(
        self,
        entity_update_model: "VehicleUpdateModel",
        get_update_data_fn: Callable[["VehicleUpdateModel"], dict[str, Any]],
    ) -> "VehicleEntity":
        update_data = get_update_data_fn(entity_update_model)
        update_entity = copy.deepcopy(self)

        for attr_name, value in update_data.items():
            update_entity.__setattr__(attr_name, value)

        return update_entity

    def mark_entity_as_deleted(self) -> "VehicleEntity":
        if self.is_deleted:
            raise InvalidOperationError("Vehicle is already marked as deleted")

        marked_entity = copy.deepcopy(self)
        marked_entity.is_deleted = True

        return marked_entity

    def is_available(
        self, rents: list[RentReadModel], pickup_date: datetime, return_date: datetime
    ) -> bool:
        for rent in rents:
            if rent.pickup_date < return_date and rent.return_date > pickup_date:
                return False
        return True
