"""
    User exceptions
"""
from app.core.error.base_exception import BaseError
from fastapi import status


class InactiveUserError(BaseError):
    code = status.HTTP_400_BAD_REQUEST
    message = "Inactive User."


class InvalidCredentialsError(BaseError):
    code = status.HTTP_400_BAD_REQUEST
    message = "Incorrect email or password"


class UserNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "User does not exist."
