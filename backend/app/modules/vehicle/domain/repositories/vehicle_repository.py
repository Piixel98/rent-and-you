from abc import abstractmethod

from app.core.repositories.base_repository import BaseRepository
from app.modules.vehicle.domain.entities.vehicle_entity import VehicleEntity


class VehicleRepository(BaseRepository[VehicleEntity]):
    @abstractmethod
    def find_by_office_id(self, office_id: int) -> VehicleEntity | None:
        raise NotImplementedError()

    @abstractmethod
    def find_by_license_plate(self, license_plate: str) -> VehicleEntity | None:
        raise NotImplementedError()
