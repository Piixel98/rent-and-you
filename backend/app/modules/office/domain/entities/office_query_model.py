from datetime import datetime

from pydantic import Field

from app.modules.office.domain.entities.office_entity import OfficeEntity
from app.modules.office.domain.entities.office_common_model import OfficeBaseModel


class OfficeReadModel(OfficeBaseModel):
    """
    OfficeReadModel represents data structure as a read model
    """

    id_: int
    name: str
    phone: str
    address: str
    postal_code: str
    city: str
    geo_location: str | None
    email: str = Field(example="test@test.com")
    is_deleted: bool = Field(example=True)
    created_at: datetime
    updated_at: datetime
    rents: list[int | None] | None

    class Config:
        orm_mode = True

    @staticmethod
    def from_entity(entity: OfficeEntity) -> "OfficeReadModel":
        return OfficeReadModel(
            id_=entity.id_,
            name=entity.name,
            phone=entity.phone,
            address=entity.address,
            postal_code=entity.postal_code,
            city=entity.city,
            email=entity.email,
            geo_location=entity.geo_location,
            is_deleted=entity.is_deleted,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
            rents=entity.rents,
        )
