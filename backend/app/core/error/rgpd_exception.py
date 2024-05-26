"""
    RGPD exceptions
"""
from app.core.error.base_exception import BaseError
from fastapi import status


class RGPDNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "RGPD does not exist."


class RGPDsNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "RGPDs do not exist"


class RGPDAlreadyExistsError(BaseError):
    code = status.HTTP_409_CONFLICT
    message = "RGPD already exists"
