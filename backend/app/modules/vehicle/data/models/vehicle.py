import datetime

from sqlalchemy import Column, ForeignKey, Integer, String, Date, Float
from sqlalchemy.orm import Mapped

from app.core.models.postgres.models import Base

from app.modules.vehicle.domain.entities.vehicle_entity import VehicleEntity
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel


class GearBox:
    Manual = "Manual"
    Automatic = "Automatic"


class BodyType:
    SUV = "SUV"
    Sedan = "Sedan"
    Hatchback = "Hatchback"
    Furgoneta = "Furgoneta"
    Other = "Other"


class Fares:
    Smart = "Smart"
    Plus = "Plus"
    Premium = "Premium"


class Vehicle(Base):
    """
    Vehicle DTO is an object associated with user entity
    """

    __tablename__ = "vehicles"

    model: Mapped[str] | str = Column(String)
    version: Mapped[str] | str = Column(String)
    color: Mapped[str] | str = Column(String)
    brand: Mapped[str] | str = Column(String)
    kms: Mapped[int] | int = Column(Integer)
    license_plate: Mapped[str] | str = Column(
        String, index=True, nullable=False, unique=True
    )
    purchase_date: Mapped[datetime.date] = Column(Date)
    image_url: Mapped[str] | str = Column(String)
    gearbox: Mapped[GearBox] = Column(String)
    body_type: Mapped[BodyType] = Column(String)
    price_per_day: Mapped[float] | float = Column(Float)
    passengers: Mapped[int] | int = Column(Integer)
    avg_consumption: Mapped[float] | None = Column(Float)
    fare: Mapped[Fares] | None = Column(String)

    office_id: int = Column(Integer, ForeignKey("offices.id_", ondelete="CASCADE"))

    def to_entity(self) -> VehicleEntity:
        return VehicleEntity(
            id_=self.id_,
            model=self.model,
            version=self.version,
            color=self.color,
            brand=self.brand,
            kms=self.kms,
            price_per_day=self.price_per_day,
            license_plate=self.license_plate,
            purchase_date=self.purchase_date,
            image_url=self.image_url,
            gearbox=self.gearbox,
            body_type=self.body_type,
            passengers=self.passengers,
            avg_consumption=self.avg_consumption,
            fare=self.fare,
            is_deleted=self.is_deleted,
            updated_at=self.updated_at,
            created_at=self.created_at,
            office_id=self.office_id,
        )

    def to_read_model(self) -> VehicleReadModel:
        return VehicleReadModel(
            id_=self.id_,
            model=self.model,
            version=self.version,
            color=self.color,
            brand=self.brand,
            kms=self.kms,
            price_per_day=self.price_per_day,
            license_plate=self.license_plate,
            purchase_date=self.purchase_date,
            gearbox=self.gearbox,
            body_type=self.body_type,
            image_url=self.image_url,
            passengers=self.passengers,
            avg_consumption=self.avg_consumption,
            fare=self.fare,
            is_deleted=self.is_deleted,
            updated_at=self.updated_at,
            created_at=self.created_at,
            office_id=self.office_id,
        )

    def to_dict(self):
        return {
            "id_": self.id_,
            "model": self.model,
            "version": self.version,
            "color": self.color,
            "brand": self.brand,
            "kms": self.kms,
            "price_per_day": self.price_per_day,
            "license_plate": self.license_plate,
            "purchase_date": self.purchase_date,
            "gearbox": self.gearbox,
            "body_type": self.body_type,
            "image_url": self.image_url,
            "passengers": self.passengers,
            "office_id": self.office_id,
            "avg_consumption": self.avg_consumption,
            "fare": self.fare,
            "is_deleted": self.is_deleted,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    @staticmethod
    def from_entity(vehicle: VehicleEntity) -> "Vehicle":
        return Vehicle(
            id_=vehicle.id_,
            model=vehicle.model,
            version=vehicle.version,
            color=vehicle.color,
            brand=vehicle.brand,
            kms=vehicle.kms,
            price_per_day=vehicle.price_per_day,
            license_plate=vehicle.license_plate,
            purchase_date=vehicle.purchase_date,
            gearbox=vehicle.gearbox,
            body_type=vehicle.body_type,
            passengers=vehicle.passengers,
            avg_consumption=vehicle.avg_consumption,
            fare=vehicle.fare,
            image_url=vehicle.image_url,
            is_deleted=vehicle.is_deleted,
            updated_at=vehicle.updated_at,
            created_at=vehicle.created_at,
            office_id=vehicle.office_id,
        )
