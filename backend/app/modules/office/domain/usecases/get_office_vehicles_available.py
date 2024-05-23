from abc import abstractmethod
from typing import Sequence

from app.core.use_cases.use_case import BaseUseCase
from app.modules.office.domain.services.office_query_service import OfficeQueryService
from app.modules.rent.domain.services.rent_query_service import RentQueryService
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel
from app.modules.vehicle.domain.services.vehicle_query_service import (
    VehicleQueryService,
)


class GetOfficeVehiclesAvailableUseCase(
    BaseUseCase[None, Sequence[VehicleReadModel | None]]
):
    """
    GetOfficeUseCase defines a query use case interface related Office Entity
    """

    service: OfficeQueryService
    vehicle_service: VehicleQueryService
    rent_service: RentQueryService

    @abstractmethod
    def __call__(self, **kwargs) -> Sequence[VehicleReadModel | None]:
        raise NotImplementedError()


class GetOfficeVehiclesAvailableUseCaseImpl(GetOfficeVehiclesAvailableUseCase):
    """
    GetOfficeVehiclesAvailableUseCaseImpl implements a query use cases related to Vehicle entity
    """

    def __init__(
        self,
        service: OfficeQueryService,
        vehicle_service: VehicleQueryService,
        rent_service: RentQueryService,
    ):
        self.service: OfficeQueryService = service
        self.vehicle_service: VehicleQueryService = vehicle_service
        self.rent_service: RentQueryService = rent_service

    def __call__(self, **kwargs) -> Sequence[VehicleReadModel | None]:
        try:
            office_id = kwargs.get("office_id")
            pickup_date = kwargs.get("pickup_date")
            return_date = kwargs.get("return_date")

            vehicles_available = []

            vehicles = self.vehicle_service.findall(office_id=office_id)
            for vehicle in vehicles:
                rents = self.rent_service.findall(vehicle_id=vehicle.id_)

                if vehicle.is_available(rents, pickup_date, return_date):
                    vehicles_available.append(vehicle)
        except Exception:
            raise

        return vehicles_available
