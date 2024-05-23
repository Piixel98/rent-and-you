from abc import abstractmethod
from typing import cast, Tuple

from app.core.error.vehicle_exception import VehicleNotFoundError
from app.core.use_cases.use_case import BaseUseCase
from app.modules.vehicle.domain.entities.vehicle_entity import VehicleEntity
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel
from app.modules.vehicle.domain.repositories.vehicle_unit_of_work import (
    VehicleUnitOfWork,
)


class DeleteVehicleUseCase(BaseUseCase):
    unit_of_work: VehicleUnitOfWork

    @abstractmethod
    def __call__(self, args: Tuple[int]) -> VehicleReadModel:
        raise NotImplementedError()


class DeleteVehicleUseCaseImpl(DeleteVehicleUseCase):
    def __init__(self, unit_of_work: VehicleUnitOfWork):
        self.unit_of_work: VehicleUnitOfWork = unit_of_work

    def __call__(self, args: Tuple[int]) -> VehicleReadModel:
        (id_,) = args

        existing_vehicle = self.unit_of_work.repository.find_by_id(id_)

        if existing_vehicle is None:
            raise VehicleNotFoundError()

        marked_vehicle = existing_vehicle.mark_entity_as_deleted()

        try:
            deleted_vehicle = self.unit_of_work.repository.update(marked_vehicle)
            self.unit_of_work.commit()
        except Exception:
            self.unit_of_work.rollback()
            raise

        return VehicleReadModel.from_entity(cast(VehicleEntity, deleted_vehicle))
