from abc import abstractmethod

from app.core.services.base_query_service import QueryService, _T
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel


class VehicleQueryService(QueryService[VehicleReadModel]):
    @abstractmethod
    def find_by_office_id(self, office_id: int) -> _T | None:
        raise NotImplementedError()

    @abstractmethod
    def find_by_license_plate(self, license_plate: str) -> _T | None:
        raise NotImplementedError()
