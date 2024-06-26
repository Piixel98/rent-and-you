from sqlalchemy.orm import Session

from app.modules.rgpd.domain.repositories.rgpd_repository import RGPDRepository
from app.modules.rgpd.domain.repositories.rgpd_unit_of_work import RGPDUnitOfWork


class RGPDUnitOfWorkImpl(RGPDUnitOfWork):
    """ """

    def __init__(self, session: Session, rgpd_repository: RGPDRepository):
        self.session: Session = session
        self.repository: RGPDRepository = rgpd_repository

    def begin(self):
        self.session.begin()

    def commit(self):
        self.session.commit()

    def rollback(self):
        self.session.rollback()
