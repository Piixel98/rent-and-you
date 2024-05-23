from typing import Sequence

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.modules.office.data.models.office import Office
from app.modules.office.domain.entities.office_query_model import OfficeReadModel
from app.modules.office.domain.services.office_query_service import OfficeQueryService


class OfficeQueryServiceImpl(OfficeQueryService):
    """
    OfficeQueryServiceImpl implements READ operations related to Office entity using SQLALCHEMY
    """

    def __init__(self, session: Session):
        self.session: Session = session

    def find_by_id(self, id_: int) -> OfficeReadModel | None:
        result = self.session.get(Office, id_)

        if result is None:
            return None

        return result.to_read_model()

    def findall(self, **kwargs) -> Sequence[OfficeReadModel]:
        statement = select(Office).filter_by(is_deleted=False, **kwargs)

        result = self.session.execute(statement).scalars().all()

        if len(result) == 0:
            return []

        return [office.to_read_model() for office in result]
