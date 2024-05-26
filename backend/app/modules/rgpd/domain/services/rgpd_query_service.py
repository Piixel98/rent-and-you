from app.core.services.base_query_service import QueryService
from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel


class RGPDQueryService(QueryService[RGPDReadModel]):
    """ """
