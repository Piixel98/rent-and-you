from typing import TYPE_CHECKING

from sqlalchemy import Column, String
from sqlalchemy.orm import Mapped, relationship

from app.modules.office.domain.entities.office_query_model import OfficeReadModel
from app.core.models.postgres.models import Base
from app.modules.office.domain.entities.office_entity import OfficeEntity

if TYPE_CHECKING:
    from app.modules.rent.data.models.rent import Rent


class Office(Base):
    """
    Office DTO is an object associated with office entity
    """

    __tablename__ = "offices"

    email: Mapped[str] | str = Column(String, unique=True, index=True)
    name: Mapped[str] | str = Column(String)
    phone: Mapped[str] | str = Column(String)
    address: Mapped[str] | str = Column(String)
    postal_code: Mapped[str] | str = Column(String)
    city: Mapped[str] | str = Column(String)
    geo_location: Mapped[str] | str = Column(String)
    rents: Mapped["Rent"] = relationship("Rent", back_populates="office")

    def to_entity(self) -> OfficeEntity:
        return OfficeEntity(
            id_=self.id_,
            name=self.name,
            phone=self.phone,
            email=self.email,
            city=self.city,
            geo_location=self.geo_location,
            address=self.address,
            postal_code=self.postal_code,
            created_at=self.created_at,
            updated_at=self.updated_at,
            is_deleted=self.is_deleted,
        )

    def to_dict(self):
        return {
            "id_": self.id_,
            "name": self.name,
            "phone": self.phone,
            "email": self.email,
            "address": self.address,
            "city": self.city,
            "geo_location": self.geo_location,
            "postal_code": self.postal_code,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "is_deleted": self.is_deleted,
        }

    def to_read_model(self) -> OfficeReadModel:
        return OfficeReadModel(
            id_=self.id_,
            name=self.name,
            phone=self.phone,
            email=self.email,
            address=self.address,
            city=self.city,
            geo_location=self.geo_location,
            postal_code=self.postal_code,
            is_deleted=self.is_deleted,
            created_at=self.created_at,
            updated_at=self.updated_at,
        )

    @staticmethod
    def from_entity(office: OfficeEntity) -> "Office":
        return Office(
            id_=office.id_,
            name=office.name,
            phone=office.phone,
            email=office.email,
            city=office.city,
            geo_location=office.geo_location,
            address=office.address,
            postal_code=office.postal_code,
            created_at=office.created_at,
            updated_at=office.updated_at,
            is_deleted=office.is_deleted,
        )
