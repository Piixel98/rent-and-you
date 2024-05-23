from app.core.services.base_query_service import QueryService
from app.modules.office.domain.entities.office_query_model import OfficeReadModel


class OfficeQueryService(QueryService[OfficeReadModel]):
    pass
