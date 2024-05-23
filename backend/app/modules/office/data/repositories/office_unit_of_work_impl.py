from sqlalchemy.orm import Session

from app.modules.office.domain.repositories.office_repository import OfficeRepository
from app.modules.office.domain.repositories.office_unit_of_work import OfficeUnitOfWork


class OfficeUnitOfWorkImpl(OfficeUnitOfWork):
    """ """

    def __init__(self, session: Session, office_repository: OfficeRepository):
        self.session: Session = session
        self.repository: OfficeRepository = office_repository

    def begin(self):
        self.session.begin()

    def commit(self):
        self.session.commit()

    def rollback(self):
        self.session.rollback()
