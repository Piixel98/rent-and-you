from app.core.services.base_query_service import QueryService
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel


class VehicleQueryService(QueryService[VehicleReadModel]):
    pass
