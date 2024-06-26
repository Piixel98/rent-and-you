from abc import abstractmethod
from typing import Tuple, cast

from app.core.error.vehicle_exception import (
    VehicleNotCreatedError,
    VehicleAlreadyExistsError,
)
from app.core.use_cases.use_case import BaseUseCase
from app.modules.vehicle.domain.entities.vehicle_command_model import VehicleCreateModel
from app.modules.vehicle.domain.entities.vehicle_entity import VehicleEntity
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel
from app.modules.vehicle.domain.repositories.vehicle_unit_of_work import (
    VehicleUnitOfWork,
)


class CreateVehicleUseCase(BaseUseCase[Tuple[VehicleCreateModel], VehicleReadModel]):
    unit_of_work: VehicleUnitOfWork

    @abstractmethod
    def __call__(self, args: Tuple[VehicleCreateModel]) -> VehicleReadModel:
        raise NotImplementedError()


class CreateVehicleUseCaseImpl(CreateVehicleUseCase):
    def __init__(self, unit_of_work: VehicleUnitOfWork):
        self.unit_of_work = unit_of_work

    def __call__(self, args: VehicleCreateModel) -> VehicleReadModel:
        (data,) = args

        vehicle = VehicleEntity(id_=None, **data.dict())

        existing_vehicle = self.unit_of_work.repository.findall(
            license_plate=data.license_plate
        )
        if len(existing_vehicle) > 0:
            raise VehicleAlreadyExistsError()

        try:
            self.unit_of_work.repository.create(vehicle)
        except Exception as _e:
            self.unit_of_work.rollback()
            raise

        self.unit_of_work.commit()

        created_vehicle = self.unit_of_work.repository.findall(
            license_plate=data.license_plate
        )

        if len(created_vehicle) == 0:
            raise VehicleNotCreatedError()

        return VehicleReadModel.from_entity(cast(VehicleEntity, created_vehicle[0]))
