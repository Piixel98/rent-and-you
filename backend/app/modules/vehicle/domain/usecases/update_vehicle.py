from abc import abstractmethod
from typing import cast, Tuple

from app.core.error.vehicle_exception import VehicleNotFoundError
from app.core.use_cases.use_case import BaseUseCase
from app.modules.vehicle.domain.entities.vehicle_command_model import VehicleUpdateModel
from app.modules.vehicle.domain.entities.vehicle_entity import VehicleEntity
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel
from app.modules.vehicle.domain.repositories.vehicle_unit_of_work import (
    VehicleUnitOfWork,
)


class UpdateVehicleUseCase(
    BaseUseCase[Tuple[int, VehicleUpdateModel], VehicleReadModel]
):
    unit_of_work: VehicleUnitOfWork

    @abstractmethod
    def __call__(self, args: Tuple[int, VehicleUpdateModel]) -> VehicleReadModel:
        raise NotImplementedError()


class UpdateVehicleUseCaseImpl(UpdateVehicleUseCase):
    def __init__(self, unit_of_work: VehicleUnitOfWork):
        self.unit_of_work = unit_of_work

    def __call__(self, args: Tuple[int, VehicleUpdateModel]) -> VehicleReadModel:
        id_, update_data = args
        existing_vehicle = self.unit_of_work.repository.find_by_id(id_)

        if existing_vehicle is None:
            raise VehicleNotFoundError()

        update_entity = existing_vehicle.update_entity(
            update_data, lambda vehicle_data: vehicle_data.dict(exclude_unset=True)
        )

        try:
            updated_vehicle = self.unit_of_work.repository.update(update_entity)
            self.unit_of_work.commit()
        except Exception:
            self.unit_of_work.rollback()
            raise

        return VehicleReadModel.from_entity(cast(VehicleEntity, updated_vehicle))
