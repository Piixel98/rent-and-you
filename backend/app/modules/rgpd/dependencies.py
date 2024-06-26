from fastapi import Depends
from sqlalchemy.orm import Session

from app.modules.rgpd.data.repositories.rgpd_repository_impl import RGPDRepositoryImpl
from app.modules.rgpd.data.repositories.rgpd_unit_of_work_impl import RGPDUnitOfWorkImpl
from app.modules.rgpd.data.services.rgpd_query_service_impl import RGPDQueryServiceImpl
from app.modules.rgpd.domain.repositories.rgpd_repository import RGPDRepository
from app.modules.rgpd.domain.repositories.rgpd_unit_of_work import RGPDUnitOfWork
from app.modules.rgpd.domain.services.rgpd_query_service import RGPDQueryService
from app.modules.rgpd.domain.usecases.create_rgpd import (
    CreateRGPDUseCase,
    CreateRGPDUseCaseImpl,
)
from app.modules.rgpd.domain.usecases.delete_rgpd import (
    DeleteRGPDUseCase,
    DeleteRGPDUseCaseImpl,
)
from app.modules.rgpd.domain.usecases.get_rgpd import GetRGPDUseCase, GetRGPDUseCaseImpl
from app.modules.rgpd.domain.usecases.get_rgpds import (
    GetRGPDsUseCaseImpl,
    GetRGPDsUseCase,
)
from app.modules.rgpd.domain.usecases.update_rgpd import (
    UpdateRGPDUseCase,
    UpdateRGPDUseCaseImpl,
)
from app.core.database.postgres.database import get_session


def get_rgpd_query_service(session: Session = Depends(get_session)) -> RGPDQueryService:
    return RGPDQueryServiceImpl(session)


def get_rgpd_repository(session: Session = Depends(get_session)) -> RGPDRepository:
    return RGPDRepositoryImpl(session)


def get_rgpd_unit_of_work(
    session: Session = Depends(get_session),
    rgpd_repository: RGPDRepository = Depends(get_rgpd_repository),
) -> RGPDUnitOfWork:
    return RGPDUnitOfWorkImpl(session, rgpd_repository)


def get_delete_rgpd_use_case(
    unit_of_work: RGPDUnitOfWork = Depends(get_rgpd_unit_of_work),
) -> DeleteRGPDUseCase:
    return DeleteRGPDUseCaseImpl(unit_of_work)


def get_rgpd_use_case(
    rgpd_query_service: RGPDQueryService = Depends(get_rgpd_query_service),
) -> GetRGPDUseCase:
    """
    DI for rgpd query use case
    """
    return GetRGPDUseCaseImpl(rgpd_query_service)


def get_rgpds_use_case(
    rgpd_query_service: RGPDQueryService = Depends(get_rgpd_query_service),
) -> GetRGPDsUseCase:
    return GetRGPDsUseCaseImpl(rgpd_query_service)


def get_create_rgpd_use_case(
    unit_of_work: RGPDUnitOfWork = Depends(get_rgpd_unit_of_work),
) -> CreateRGPDUseCase:
    return CreateRGPDUseCaseImpl(unit_of_work)


def get_update_rgpd_use_case(
    unit_of_work: RGPDUnitOfWork = Depends(get_rgpd_unit_of_work),
) -> UpdateRGPDUseCase:
    return UpdateRGPDUseCaseImpl(unit_of_work)
