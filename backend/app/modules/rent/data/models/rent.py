import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Column, Float, ForeignKey, DateTime, Integer
from sqlalchemy.orm import Mapped, relationship


from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.core.models.postgres.models import Base
from app.modules.rent.domain.entities.rent_entity import RentEntity
from app.modules.user.data.models.user import User

if TYPE_CHECKING:
    from app.modules.vehicle.data.models.vehicle import Vehicle
    from app.modules.office.data.models.office import Office


class Rent(Base):
    """
    Rent DTO is an object associated with rent entity
    """

    __tablename__ = "rents"

    ammount: Mapped[float] | str = Column(Float)
    total_days: Mapped[int] | None = Column(Integer, default=1)
    pickup_date: Mapped[datetime.date] | None = Column(DateTime)
    return_date: Mapped[datetime.date] | None = Column(DateTime)

    office_id: Mapped[int] = Column(ForeignKey("offices.id_"), nullable=False)
    office: Mapped["Office"] = relationship("Office", back_populates="rents")

    user_id: Mapped[int] = Column(ForeignKey("users.id_"), nullable=False)
    user: Mapped["User"] = relationship("User", back_populates="rents")

    vehicle_id: Mapped[int] = Column(ForeignKey("vehicles.id_"), nullable=False)
    vehicle: Mapped["Vehicle"] = relationship("Vehicle", back_populates="rents")

    def to_entity(self) -> RentEntity:
        return RentEntity(
            id_=self.id_,
            ammount=self.ammount,
            total_days=self.total_days,
            pickup_date=self.pickup_date,
            return_date=self.return_date,
            created_at=self.created_at,
            updated_at=self.updated_at,
            is_deleted=self.is_deleted,
            vehicle_id=self.vehicle_id,
            office_id=self.office_id,
            user_id=self.user_id,
        )

    def to_dict(self):
        return {
            "id_": self.id_,
            "ammount": self.ammount,
            "total_days": self.total_days,
            "pickup_date": self.pickup_date,
            "return_date": self.return_date,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "is_deleted": self.is_deleted,
            "vehicle_id": self.vehicle_id,
            "office_id": self.office_id,
            "user_id": self.user_id,
        }

    def to_read_model(self) -> RentReadModel:
        return RentReadModel(
            id_=self.id_,
            total_days=self.total_days,
            ammount=self.ammount,
            pickup_date=self.pickup_date,
            return_date=self.return_date,
            is_deleted=self.is_deleted,
            created_at=self.created_at,
            updated_at=self.updated_at,
            vehicle_id=self.vehicle_id,
            office_id=self.office_id,
            user_id=self.user_id,
        )

    @staticmethod
    def from_entity(rent: RentEntity) -> "Rent":
        return Rent(
            id_=rent.id_,
            ammount=rent.ammount,
            total_days=rent.total_days,
            pickup_date=rent.pickup_date,
            return_date=rent.return_date,
            created_at=rent.created_at,
            updated_at=rent.updated_at,
            is_deleted=rent.is_deleted,
            vehicle_id=rent.vehicle_id,
            office_id=rent.office_id,
            user_id=rent.user_id,
        )
