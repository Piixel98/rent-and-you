from pydantic import BaseModel, Field

from app.core.error.vehicle_exception import (
    VehicleNotFoundError,
    VehiclesNotFoundError,
    VehicleAlreadyExistsError,
    VehicleNotCreatedError,
)


class ErrorMessageVehicleNotFound(BaseModel):
    detail: str = Field(example=VehicleNotFoundError.message)


class ErrorMessageVehiclesNotFound(BaseModel):
    detail: str = Field(example=VehiclesNotFoundError.message)


class ErrorMessageVehicleAlreadyExists(BaseModel):
    detail: str = Field(example=VehicleAlreadyExistsError.message)


class ErrorVehicleNotCreated(BaseModel):
    detail: str = Field(example=VehicleNotCreatedError.message)
