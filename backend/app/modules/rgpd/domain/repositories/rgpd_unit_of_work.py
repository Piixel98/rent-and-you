from app.core.unit_of_work.unit_of_work import AbstractUnitOfWork
from app.modules.rgpd.domain.repositories.rgpd_repository import RGPDRepository


class RGPDUnitOfWork(AbstractUnitOfWork[RGPDRepository]):
    """
    defines an interface based on Unit of Work
    """

    pass
