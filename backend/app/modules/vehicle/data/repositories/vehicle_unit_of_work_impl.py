from sqlalchemy.orm import Session

from app.modules.vehicle.domain.repositories.vehicle_repository import VehicleRepository
from app.modules.vehicle.domain.repositories.vehicle_unit_of_work import (
    VehicleUnitOfWork,
)


class VehicleUnitOfWorkImpl(VehicleUnitOfWork):
    def __init__(self, session: Session, repository: VehicleRepository):
        self.session: Session = session
        self.repository: VehicleRepository = repository

    def begin(self):
        self.session.begin()

    def commit(self):
        self.session.commit()

    def rollback(self):
        self.session.rollback()
