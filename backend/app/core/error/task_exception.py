"""
    Task Exceptions
"""
from app.core.error.base_exception import BaseError
from fastapi import status


class TaskNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "Task does not exist."


class TasksNotFoundError(BaseError):
    code = status.HTTP_404_NOT_FOUND
    message = "Tasks do not exist"


class TaskAlreadyExistsError(BaseError):
    code = status.HTTP_409_CONFLICT
    message = "Task already exists"
