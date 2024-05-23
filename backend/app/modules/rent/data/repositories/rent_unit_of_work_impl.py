from sqlalchemy.orm import Session

from app.modules.rent.domain.repositories.rent_repository import RentRepository
from app.modules.rent.domain.repositories.rent_unit_of_work import RentUnitOfWork


class RentUnitOfWorkImpl(RentUnitOfWork):
    """ """

    def __init__(self, session: Session, rent_repository: RentRepository):
        self.session: Session = session
        self.repository: RentRepository = rent_repository

    def begin(self):
        self.session.begin()

    def commit(self):
        self.session.commit()

    def rollback(self):
        self.session.rollback()
