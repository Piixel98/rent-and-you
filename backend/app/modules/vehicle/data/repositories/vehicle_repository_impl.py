from datetime import datetime
from typing import Sequence

from sqlalchemy import select, update, delete, and_
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import Session

from app.modules.rent.data.models.rent import Rent
from app.modules.vehicle.data.models.vehicle import Vehicle
from app.modules.vehicle.domain.entities.vehicle_entity import VehicleEntity
from app.modules.vehicle.domain.repositories.vehicle_repository import VehicleRepository


class VehicleRepositoryImpl(VehicleRepository):
    def __init__(self, session: Session):
        self.session: Session = session

    def find_by_office_id(self, office_id: int) -> Sequence[VehicleEntity | None]:
        statement = select(Vehicle).filter_by(office_id=office_id, is_deleted=False)

        try:
            result: Sequence[Vehicle] = self.session.execute(statement).scalars().all()
        except NoResultFound:
            return []

        return [vehicle.to_entity() for vehicle in result]

    def find_by_license_plate(self, license_plate: str) -> VehicleEntity | None:
        statement = select(Vehicle).filter_by(
            license_plate=license_plate, is_deleted=False
        )
        try:
            result: Vehicle = self.session.execute(statement).scalar_one()
        except NoResultFound:
            return None

        return result.to_entity()

    def create(self, entity: VehicleEntity) -> VehicleEntity:
        vehicle = Vehicle.from_entity(entity)

        self.session.add(vehicle)

        return vehicle.to_entity()

    def findall(self, **kwargs) -> Sequence[VehicleEntity]:
        query = self.session.query(Vehicle)

        for key, value in kwargs.items():
            query = query.filter(getattr(Vehicle, key) == value)

        return query.all()

    def find_by_id(self, id_: int) -> VehicleEntity | None:
        result: Vehicle | None = self.session.get(Vehicle, id_)

        if result is None:
            return None

        return result.to_entity()

    def update(self, entity: VehicleEntity) -> VehicleEntity:
        vehicle = Vehicle.from_entity(entity)
        update_data = vehicle.to_dict()

        for key in [Vehicle.updated_at.key, Vehicle.created_at.key, Vehicle.id_.key]:
            (update_data.pop(key),)

        statement = (
            update(Vehicle)
            .where(Vehicle.id_ == vehicle.id_)
            .values(update_data)
            .returning(Vehicle)
        )

        vehicle_mapping = self.session.execute(statement).mappings().one()
        result = Vehicle(**vehicle_mapping)

        return result.to_entity()

    def delete_by_id(self, id_: int) -> VehicleEntity:
        statement = (
            delete(Vehicle).filter_by(id_=id_).returning(*Vehicle.__table__.columns)
        )

        result: Vehicle = self.session.execute(statement).scalar_one()

        return result.to_entity()

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
