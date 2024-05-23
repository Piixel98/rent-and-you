from datetime import datetime
from typing import Sequence

from sqlalchemy import select, and_
from sqlalchemy.orm import Session

from app.modules.rent.data.models.rent import Rent
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

    def find_by_office_id(self, office_id: int) -> Sequence[VehicleReadModel | None]:
        statement = select(Vehicle).filter_by(office_id=office_id, is_deleted=False)
        result = self.session.execute(statement).scalars().all()

        if len(result) == 0:
            return []

        return [vehicle.to_read_model() for vehicle in result]

    def find_by_license_plate(self, license_plate: str) -> VehicleReadModel | None:
        statement = select(Vehicle).filter_by(
            license_plate=license_plate, is_deleted=False
        )
        result: Vehicle = self.session.execute(statement).scalars().first()

        if result is None:
            return None

        return result.to_read_model()

    def find_by_availability(
        self, id_: int, pickup_date: datetime, return_date: datetime
    ) -> bool:
        result = (
            self.session.query(Rent)
            .filter(
                and_(
                    Rent.vehicle_id == id_,
                    not Rent.is_deleted,
                    Rent.pickup_date <= return_date,
                    Rent.return_date >= pickup_date,
                )
            )
            .first()
        )

        if result is None:
            return True

        return False
