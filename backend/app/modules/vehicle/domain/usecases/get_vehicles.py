from abc import abstractmethod
from typing import Sequence

from app.core.use_cases.use_case import BaseUseCase
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel
from app.modules.vehicle.domain.services.vehicle_query_service import (
    VehicleQueryService,
)


class GetVehiclesUseCase(BaseUseCase[None, Sequence[VehicleReadModel]]):
    service: VehicleQueryService

    @abstractmethod
    def __call__(self, **kwargs: None) -> Sequence[VehicleReadModel]:
        raise NotImplementedError()


class GetVehiclesUseCaseImpl(GetVehiclesUseCase):
    def __init__(self, service: VehicleQueryService):
        self.service: VehicleQueryService = service

    def __call__(self, **kwargs) -> Sequence[VehicleReadModel]:
        try:
            if all(value is None for value in kwargs.values()):
                vehicles = self.service.findall()
            else:
                vehicles = self.service.findall(**kwargs)
        except Exception:
            raise

        return vehicles
