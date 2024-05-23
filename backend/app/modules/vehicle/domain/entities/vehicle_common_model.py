from enum import Enum

from pydantic import Field, BaseModel
from pydantic.schema import date


class GearBox(str, Enum):
    Manual = "Manual"
    Automatic = "Automatic"


class BodyType(str, Enum):
    SUV = "SUV"
    Sedan = "Sedan"
    Hatchback = "Hatchback"
    Other = "Other"


class Brand(str, Enum):
    Mercedes = "Mercedes"
    Audi = "Audi"
    Seat = "Seat"
    Other = "Other"


class Fares(str, Enum):
    Smart = "Smart"
    Plus = "Plus"
    Premium = "Premium"


class VehicleBaseModel(BaseModel):
    model: str | None
    version: str | None
    color: str | None
    brand: Brand | None
    kms: int | None
    license_plate: str | None
    purchase_date: date | None
    gearbox: GearBox | None
    body_type: BodyType | None
    price_per_day: float | None
    passengers: int | None
    avg_consumption: float | None
    fare: Fares | None
    image_url: str = Field(default=None)
    office_id: int | None
