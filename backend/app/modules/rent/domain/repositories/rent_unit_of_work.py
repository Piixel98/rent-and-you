from app.core.unit_of_work.unit_of_work import AbstractUnitOfWork
from app.modules.rent.domain.repositories.rent_repository import RentRepository


class RentUnitOfWork(AbstractUnitOfWork[RentRepository]):
    """
    defines an interface based on Unit of Work
    """

    pass
