from abc import abstractmethod
from typing import cast, Tuple, Optional

from app.core.error.office_exception import OfficeNotFoundError
from app.core.use_cases.use_case import BaseUseCase
from app.modules.office.domain.entities.office_command_model import OfficeUpdateModel
from app.modules.office.domain.entities.office_entity import OfficeEntity
from app.modules.office.domain.entities.office_query_model import OfficeReadModel
from app.modules.office.domain.repositories.office_unit_of_work import OfficeUnitOfWork


class UpdateOfficeUseCase(BaseUseCase[Tuple[int, OfficeUpdateModel], OfficeReadModel]):
    unit_of_work: OfficeUnitOfWork

    @abstractmethod
    def __call__(self, args: Tuple[int, OfficeUpdateModel]) -> OfficeReadModel:
        raise NotImplementedError()


class UpdateOfficeUseCaseImpl(UpdateOfficeUseCase):
    def __init__(self, unit_of_work: OfficeUnitOfWork):
        self.unit_of_work = unit_of_work

    def __call__(self, args: Tuple[int, OfficeUpdateModel]) -> OfficeReadModel:
        id_, update_data = args

        existing_office: Optional[
            OfficeEntity
        ] = self.unit_of_work.repository.find_by_id(id_)

        if existing_office is None:
            raise OfficeNotFoundError()

        update_entity = existing_office.update_entity(
            update_data, lambda office_data: update_data.dict(exclude_unset=True)
        )

        try:
            updated_office = self.unit_of_work.repository.update(update_entity)
            self.unit_of_work.commit()
        except Exception:
            self.unit_of_work.rollback()
            raise

        return OfficeReadModel.from_entity(cast(OfficeEntity, updated_office))
