from datetime import datetime
from typing import Sequence

from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.vehicle.domain.entities.vehicle_common_model import VehicleBaseModel
from app.modules.vehicle.domain.entities.vehicle_entity import VehicleEntity


class VehicleReadModel(VehicleBaseModel):
    id_: int
    created_at: datetime
    updated_at: datetime

    class Config(object):
        orm_mode = True

    @classmethod
    def from_entity(cls, entity: VehicleEntity) -> "VehicleReadModel":
        return cls(
            id_=entity.id_,
            model=entity.model,
            version=entity.version,
            color=entity.color,
            brand=entity.brand,
            kms=entity.kms,
            gearbox=entity.gearbox,
            body_type=entity.body_type,
            purchase_date=entity.purchase_date,
            license_plate=entity.license_plate,
            price_per_day=entity.price_per_day,
            image_url=entity.image_url,
            is_deleted=entity.is_deleted,
            passengers=entity.passengers,
            rent_id=entity.rent_id,
            office_id=entity.office_id,
            updated_at=entity.updated_at,
            created_at=entity.created_at,
        )

    @classmethod
    def is_available(
        cls,
        rents: Sequence[RentReadModel],
        pickup_date: datetime,
        return_date: datetime,
    ) -> bool:
        for rent in rents:
            if rent.pickup_date < return_date and rent.return_date > pickup_date:
                return False
        return True
