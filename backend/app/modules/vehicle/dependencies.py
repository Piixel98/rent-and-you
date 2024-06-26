from fastapi import Depends
from sqlalchemy.orm import Session

from app.modules.vehicle.data.repositories.vehicle_repository_impl import (
    VehicleRepositoryImpl,
)
from app.modules.vehicle.data.repositories.vehicle_unit_of_work_impl import (
    VehicleUnitOfWorkImpl,
)
from app.modules.vehicle.data.services.vehicle_query_service_impl import (
    VehicleQueryServiceImpl,
)
from app.modules.vehicle.domain.repositories.vehicle_repository import VehicleRepository
from app.modules.vehicle.domain.repositories.vehicle_unit_of_work import (
    VehicleUnitOfWork,
)
from app.modules.vehicle.domain.services.vehicle_query_service import (
    VehicleQueryService,
)
from app.modules.vehicle.domain.usecases.create_vehicle import (
    CreateVehicleUseCase,
    CreateVehicleUseCaseImpl,
)
from app.modules.vehicle.domain.usecases.delete_vehicle import (
    DeleteVehicleUseCase,
    DeleteVehicleUseCaseImpl,
)
from app.modules.vehicle.domain.usecases.get_vehicle import (
    GetVehicleUseCase,
    GetVehicleUseCaseImpl,
)
from app.modules.vehicle.domain.usecases.get_vehicles import (
    GetVehiclesUseCase,
    GetVehiclesUseCaseImpl,
)
from app.modules.vehicle.domain.usecases.update_vehicle import (
    UpdateVehicleUseCase,
    UpdateVehicleUseCaseImpl,
)
from app.core.database.postgres.database import get_session


def get_vehicle_query_service(
    session: Session = Depends(get_session),
) -> VehicleQueryService:
    return VehicleQueryServiceImpl(session)


def get_vehicle_repository(
    session: Session = Depends(get_session),
) -> VehicleRepository:
    return VehicleRepositoryImpl(session)


def get_vehicle_unit_of_work(
    session: Session = Depends(get_session),
    vehicle_repository: VehicleRepository = Depends(get_vehicle_repository),
) -> VehicleUnitOfWork:
    return VehicleUnitOfWorkImpl(session, vehicle_repository)


def get_vehicles_use_case(
    vehicle_query_service: VehicleQueryService = Depends(get_vehicle_query_service),
) -> GetVehiclesUseCase:
    return GetVehiclesUseCaseImpl(vehicle_query_service)


def get_create_vehicle_use_case(
    vehicle_unit_of_work: VehicleUnitOfWork = Depends(get_vehicle_unit_of_work),
) -> CreateVehicleUseCase:
    return CreateVehicleUseCaseImpl(vehicle_unit_of_work)


def get_delete_vehicle_use_case(
    vehicle_unit_of_work: VehicleUnitOfWork = Depends(get_vehicle_unit_of_work),
) -> DeleteVehicleUseCase:
    return DeleteVehicleUseCaseImpl(vehicle_unit_of_work)


def get_vehicle_use_case(
    vehicle_query_service: VehicleQueryService = Depends(get_vehicle_query_service),
) -> GetVehicleUseCase:
    return GetVehicleUseCaseImpl(vehicle_query_service)


def get_update_vehicle_use_case(
    vehicle_unit_of_work: VehicleUnitOfWork = Depends(get_vehicle_unit_of_work),
) -> UpdateVehicleUseCase:
    return UpdateVehicleUseCaseImpl(vehicle_unit_of_work)
