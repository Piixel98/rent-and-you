from app.core.unit_of_work.unit_of_work import AbstractUnitOfWork
from app.modules.vehicle.domain.repositories.vehicle_repository import VehicleRepository


class VehicleUnitOfWork(AbstractUnitOfWork[VehicleRepository]):
    pass
