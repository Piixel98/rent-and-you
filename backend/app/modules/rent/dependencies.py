from fastapi import Depends
from sqlalchemy.orm import Session

from app.modules.rent.data.repositories.rent_repository_impl import RentRepositoryImpl
from app.modules.rent.data.repositories.rent_unit_of_work_impl import RentUnitOfWorkImpl
from app.modules.rent.data.services.rent_query_service_impl import RentQueryServiceImpl
from app.modules.rent.domain.repositories.rent_repository import RentRepository
from app.modules.rent.domain.repositories.rent_unit_of_work import RentUnitOfWork
from app.modules.rent.domain.services.rent_query_service import RentQueryService
from app.modules.rent.domain.usecases.create_rent import (
    CreateRentUseCase,
    CreateRentUseCaseImpl,
)
from app.modules.rent.domain.usecases.delete_rent import (
    DeleteRentUseCase,
    DeleteRentUseCaseImpl,
)
from app.modules.rent.domain.usecases.get_rent import GetRentUseCase, GetRentUseCaseImpl
from app.modules.rent.domain.usecases.get_rents import (
    GetRentsUseCaseImpl,
    GetRentsUseCase,
)
from app.modules.rent.domain.usecases.get_rents_vehicle import (
    GetRentsByVehicleUseCaseImpl,
    GetRentsByVehicleUseCase,
)
from app.modules.rent.domain.usecases.update_rent import (
    UpdateRentUseCase,
    UpdateRentUseCaseImpl,
)
from app.core.database.postgres.database import get_session


def get_rent_query_service(session: Session = Depends(get_session)) -> RentQueryService:
    return RentQueryServiceImpl(session)


def get_rent_repository(session: Session = Depends(get_session)) -> RentRepository:
    return RentRepositoryImpl(session)


def get_rent_unit_of_work(
    session: Session = Depends(get_session),
    rent_repository: RentRepository = Depends(get_rent_repository),
) -> RentUnitOfWork:
    return RentUnitOfWorkImpl(session, rent_repository)


def get_delete_rent_use_case(
    unit_of_work: RentUnitOfWork = Depends(get_rent_unit_of_work),
) -> DeleteRentUseCase:
    return DeleteRentUseCaseImpl(unit_of_work)


def get_rent_use_case(
    rent_query_service: RentQueryService = Depends(get_rent_query_service),
) -> GetRentUseCase:
    """
    DI for rent query use case
    """
    return GetRentUseCaseImpl(rent_query_service)


def get_rents_use_case(
    rent_query_service: RentQueryService = Depends(get_rent_query_service),
) -> GetRentsUseCase:
    return GetRentsUseCaseImpl(rent_query_service)


def get_rents_by_vehicle_use_case(
    rent_query_service: RentQueryService = Depends(get_rent_query_service),
) -> GetRentsByVehicleUseCase:
    return GetRentsByVehicleUseCaseImpl(rent_query_service)


def get_create_rent_use_case(
    unit_of_work: RentUnitOfWork = Depends(get_rent_unit_of_work),
) -> CreateRentUseCase:
    return CreateRentUseCaseImpl(unit_of_work)


def get_update_rent_use_case(
    unit_of_work: RentUnitOfWork = Depends(get_rent_unit_of_work),
) -> UpdateRentUseCase:
    return UpdateRentUseCaseImpl(unit_of_work)
