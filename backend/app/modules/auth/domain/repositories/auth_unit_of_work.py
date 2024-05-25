from app.core.unit_of_work.unit_of_work import AbstractUnitOfWork
from app.modules.auth.domain.repositories.auth_repository import AuthRepository


class AuthUnitOfWork(AbstractUnitOfWork[AuthRepository]):
    """
    defines an interface based on Unit of Work
    """
