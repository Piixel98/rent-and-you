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


class CouldNotValidateCredentialsError(BaseError):
    code = status.HTTP_401_UNAUTHORIZED
    message = "Could not validate credentials."


class UserNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "User does not exist."


class InsufficientPermissionsError(BaseError):
    code = status.HTTP_403_FORBIDDEN
    message = "Insufficient permissions."


class AccessTokenNotProvidedError(BaseError):
    code = status.HTTP_400_BAD_REQUEST
    message = "Access token not provided"
