"""
    Vehicle Exceptions
"""
from app.core.error.base_exception import BaseError
from fastapi import status


class VehicleNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "Vehicle does not exist."


class VehiclesNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "Vehicles do not exist"


class VehicleAlreadyExistsError(BaseError):
    code = status.HTTP_409_CONFLICT
    message = "Vehicle already exists"


class VehicleNotCreatedError(BaseError):
    code = status.HTTP_500_INTERNAL_SERVER_ERROR
    message = "Vehicle Not Created"
