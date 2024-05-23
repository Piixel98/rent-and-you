"""
    Rent Exceptions
"""
from app.core.error.base_exception import BaseError
from fastapi import status


class RentNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "Rent does not exist."


class RentsNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "Rents do not exist"


class RentAlreadyExistsError(BaseError):
    code = status.HTTP_409_CONFLICT
    message = "Rent already exists"
