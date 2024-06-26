from abc import abstractmethod
from typing import cast, Tuple

from app.core.error.office_exception import OfficeAlreadyExistsError
from app.core.use_cases.use_case import BaseUseCase
from app.modules.office.domain.entities.office_command_model import OfficeCreateModel
from app.modules.office.domain.entities.office_entity import OfficeEntity
from app.modules.office.domain.entities.office_query_model import OfficeReadModel
from app.modules.office.domain.repositories.office_unit_of_work import OfficeUnitOfWork


class CreateOfficeUseCase(BaseUseCase[Tuple[OfficeCreateModel], OfficeReadModel]):
    unit_of_work: OfficeUnitOfWork

    @abstractmethod
    def __call__(self, args: Tuple[OfficeCreateModel]) -> OfficeReadModel:
        raise NotImplementedError()


class CreateOfficeUseCaseImpl(CreateOfficeUseCase):
    def __init__(self, unit_of_work: OfficeUnitOfWork):
        self.unit_of_work = unit_of_work

    def __call__(self, args: Tuple[OfficeCreateModel]) -> OfficeReadModel:
        (data,) = args

        office = OfficeEntity(id_=None, **data.dict())

        existing_office = self.unit_of_work.repository.find_by_email(data.email)
        if existing_office is not None:
            raise OfficeAlreadyExistsError()

        try:
            self.unit_of_work.repository.create(office)
        except Exception as _e:
            self.unit_of_work.rollback()
            raise

        self.unit_of_work.commit()

        created_office = self.unit_of_work.repository.find_by_email(data.email)

        return OfficeReadModel.from_entity(cast(OfficeEntity, created_office))
