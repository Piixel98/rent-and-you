from typing import Sequence

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.modules.vehicle.data.models.vehicle import Vehicle
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel
from app.modules.vehicle.domain.services.vehicle_query_service import (
    VehicleQueryService,
)


class VehicleQueryServiceImpl(VehicleQueryService):
    def __init__(self, session: Session):
        self.session: Session = session

    def find_by_id(self, id_: int) -> VehicleReadModel | None:
        result = self.session.get(Vehicle, id_)

        if result is None:
            return None

        return result.to_read_model()

    def findall(self, **kwargs) -> Sequence[VehicleReadModel | None]:
        statement = select(Vehicle).filter_by(is_deleted=False, **kwargs)

        result = self.session.execute(statement).scalars().all()

        if len(result) == 0:
            return []

        return [vehicle.to_read_model() for vehicle in result]
