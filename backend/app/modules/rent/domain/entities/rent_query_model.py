from datetime import datetime

from pydantic import Field

from app.modules.rent.domain.entities.rent_entity import RentEntity
from app.modules.rent.domain.entities.rent_common_model import RentBaseModel


class RentReadModel(RentBaseModel):
    """
    RentReadModel represents data structure as a read model
    """

    id_: int
    ammount: float
    total_days: int
    pickup_date: datetime
    return_date: datetime
    office_id: int
    vehicle_id: int
    user_id: int
    is_deleted: bool = Field(example=True)
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

    @staticmethod
    def from_entity(entity: RentEntity) -> "RentReadModel":
        return RentReadModel(
            id_=entity.id_,
            ammount=entity.ammount,
            total_days=entity.total_days,
            pickup_date=entity.pickup_date,
            return_date=entity.return_date,
            is_deleted=entity.is_deleted,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
            office_id=entity.office_id,
            vehicle_id=entity.vehicle_id,
            user_id=entity.user_id,
        )
