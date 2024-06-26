from app.core.unit_of_work.unit_of_work import AbstractUnitOfWork
from app.modules.office.domain.repositories.office_repository import OfficeRepository


class OfficeUnitOfWork(AbstractUnitOfWork[OfficeRepository]):
    """
    defines an interface based on Unit of Work
    """

    pass
