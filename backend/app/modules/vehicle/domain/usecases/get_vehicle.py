from abc import abstractmethod
from typing import Tuple

from app.core.error.vehicle_exception import VehicleNotFoundError
from app.core.use_cases.use_case import BaseUseCase
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel
from app.modules.vehicle.domain.services.vehicle_query_service import (
    VehicleQueryService,
)


class GetVehicleUseCase(BaseUseCase[Tuple[int], VehicleReadModel]):
    service: VehicleQueryService

    @abstractmethod
    def __call__(self, args: Tuple[int]) -> VehicleReadModel:
        raise NotImplementedError()


class GetVehicleUseCaseImpl(GetVehicleUseCase):
    def __init__(self, service: VehicleQueryService):
        self.service: VehicleQueryService = service

    def __call__(self, args: Tuple[int]) -> VehicleReadModel:
        (id_,) = args
        try:
            vehicle = self.service.find_by_id(id_)
            if vehicle is None:
                raise VehicleNotFoundError()
        except Exception:
            raise

        return vehicle
