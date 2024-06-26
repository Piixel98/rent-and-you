from typing import Sequence

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel
from app.modules.rgpd.domain.services.rgpd_query_service import RGPDQueryService
from app.modules.rgpd.data.models.rgpd import RGPD


class RGPDQueryServiceImpl(RGPDQueryService):
    """
    RGPDQueryServiceImpl implements READ operations related to RGPD entity using SQLALCHEMY
    """

    def __init__(self, session: Session):
        self.session: Session = session

    def find_by_id(self, id_: int) -> RGPDReadModel | None:
        result = self.session.get(RGPD, id_)

        if result is None:
            return None

        return result.to_read_model()

    def findall(self, **kwargs) -> Sequence[RGPDReadModel | None]:
        statement = select(RGPD).filter_by(is_deleted=False, **kwargs)

        result = self.session.execute(statement).scalars().all()

        if len(result) == 0:
            return []

        return [rgpd.to_read_model() for rgpd in result]
