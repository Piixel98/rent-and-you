"""
    Office Exceptions
"""
from app.core.error.base_exception import BaseError
from fastapi import status


class OfficeNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "Office does not exist."


class OfficesNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "Offices do not exist"


class OfficeAlreadyExistsError(BaseError):
    code = status.HTTP_409_CONFLICT
    message = "Office already exists"
