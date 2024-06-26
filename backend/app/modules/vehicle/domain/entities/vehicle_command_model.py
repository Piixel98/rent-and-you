from datetime import date

from pydantic import Field

from app.modules.vehicle.domain.entities.vehicle_common_model import (
    VehicleBaseModel,
    Brand,
    GearBox,
    BodyType,
    Fares,
)


class VehicleCreateModel(VehicleBaseModel):
    model: str
    version: str
    color: str
    brand: Brand
    kms: int
    license_plate: str
    purchase_date: date
    gearbox: GearBox
    body_type: BodyType
    price_per_day: float
    passengers: int
    avg_consumption: float | None
    fare: Fares | None
    image_url: str = Field(default=None)
    office_id: int


class VehicleUpdateModel(VehicleBaseModel):
    is_deleted: bool = Field(example=True, default=False)
