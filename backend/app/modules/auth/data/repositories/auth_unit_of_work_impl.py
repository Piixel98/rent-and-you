from sqlalchemy.orm import Session

from app.modules.auth.domain.repositories.auth_repository import AuthRepository
from app.modules.auth.domain.repositories.auth_unit_of_work import AuthUnitOfWork


class AuthUnitOfWorkImpl(AuthUnitOfWork):
    """ """

    def __init__(self, session: Session, auth_repository: AuthRepository):
        self.session: Session = session
        self.repository: AuthRepository = auth_repository

    def begin(self):
        self.session.begin()

    def commit(self):
        self.session.commit()

    def rollback(self):
        self.session.rollback()
