from fastapi import Depends
from sqlalchemy.orm import Session

from app.modules.office.data.repositories.office_repository_impl import (
    OfficeRepositoryImpl,
)
from app.modules.office.data.repositories.office_unit_of_work_impl import (
    OfficeUnitOfWorkImpl,
)
from app.modules.office.data.services.office_query_service_impl import (
    OfficeQueryServiceImpl,
)
from app.modules.office.domain.repositories.office_repository import OfficeRepository
from app.modules.office.domain.repositories.office_unit_of_work import OfficeUnitOfWork
from app.modules.office.domain.services.office_query_service import OfficeQueryService
from app.modules.office.domain.usecases.create_office import (
    CreateOfficeUseCase,
    CreateOfficeUseCaseImpl,
)
from app.modules.office.domain.usecases.delete_office import (
    DeleteOfficeUseCase,
    DeleteOfficeUseCaseImpl,
)
from app.modules.office.domain.usecases.get_office import (
    GetOfficeUseCase,
    GetOfficeUseCaseImpl,
)
from app.modules.office.domain.usecases.get_office_vehicles_available import (
    GetOfficeVehiclesAvailableUseCaseImpl,
    GetOfficeVehiclesAvailableUseCase,
)
from app.modules.office.domain.usecases.get_offices import (
    GetOfficesUseCaseImpl,
    GetOfficesUseCase,
)
from app.modules.office.domain.usecases.update_office import (
    UpdateOfficeUseCase,
    UpdateOfficeUseCaseImpl,
)
from app.core.database.postgres.database import get_session
from app.modules.rent.dependencies import get_rent_query_service
from app.modules.rent.domain.services.rent_query_service import RentQueryService
from app.modules.vehicle.dependencies import get_vehicle_query_service
from app.modules.vehicle.domain.services.vehicle_query_service import (
    VehicleQueryService,
)


def get_office_query_service(
    session: Session = Depends(get_session),
) -> OfficeQueryService:
    return OfficeQueryServiceImpl(session)


def get_office_repository(session: Session = Depends(get_session)) -> OfficeRepository:
    return OfficeRepositoryImpl(session)


def get_office_unit_of_work(
    session: Session = Depends(get_session),
    office_repository: OfficeRepository = Depends(get_office_repository),
) -> OfficeUnitOfWork:
    return OfficeUnitOfWorkImpl(session, office_repository)


def get_delete_office_use_case(
    unit_of_work: OfficeUnitOfWork = Depends(get_office_unit_of_work),
) -> DeleteOfficeUseCase:
    return DeleteOfficeUseCaseImpl(unit_of_work)


def get_office_use_case(
    office_query_service: OfficeQueryService = Depends(get_office_query_service),
) -> GetOfficeUseCase:
    """
    DI for office query use case
    """
    return GetOfficeUseCaseImpl(office_query_service)


def get_offices_use_case(
    office_query_service: OfficeQueryService = Depends(get_office_query_service),
) -> GetOfficesUseCase:
    return GetOfficesUseCaseImpl(office_query_service)


def get_create_office_use_case(
    unit_of_work: OfficeUnitOfWork = Depends(get_office_unit_of_work),
) -> CreateOfficeUseCase:
    return CreateOfficeUseCaseImpl(unit_of_work)


def get_update_office_use_case(
    unit_of_work: OfficeUnitOfWork = Depends(get_office_unit_of_work),
) -> UpdateOfficeUseCase:
    return UpdateOfficeUseCaseImpl(unit_of_work)


def get_office_vehicles_available_use_case(
    office_query_service: OfficeQueryService = Depends(get_office_query_service),
    vehicle_query_service: VehicleQueryService = Depends(get_vehicle_query_service),
    rent_query_service: RentQueryService = Depends(get_rent_query_service),
) -> GetOfficeVehiclesAvailableUseCase:
    return GetOfficeVehiclesAvailableUseCaseImpl(
        office_query_service, vehicle_query_service, rent_query_service
    )
