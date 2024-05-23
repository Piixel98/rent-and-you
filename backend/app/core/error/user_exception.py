"""
    User exceptions
"""
from app.core.error.base_exception import BaseError
from fastapi import status


class UserNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "User does not exist."


class UsersNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "Users do not exist"


class UserAlreadyExistsError(BaseError):
    code = status.HTTP_409_CONFLICT
    message = "User already exists"
