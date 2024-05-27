from abc import abstractmethod

from typing import cast, Tuple

from app.core.use_cases.use_case import BaseUseCase
from app.dependencies import get_settings
from app.modules.auth.domain.entities.auth_common_model import TokenPayload
from app.modules.auth.domain.repositories.auth_unit_of_work import AuthUnitOfWork
from app.modules.user.domain.entities.user_command_model import UserUpdateModel
from app.modules.user.domain.entities.user_entity import UserEntity
from app.modules.user.domain.entities.user_query_model import UserReadModel
from app.modules.user.domain.repositories.user_unit_of_work import UserUnitOfWork


class UpdateUserMeUseCase(
    BaseUseCase[Tuple[TokenPayload, UserUpdateModel], UserReadModel]
):
    auth_unit_of_work: AuthUnitOfWork
    user_unit_of_work: UserUnitOfWork

    @abstractmethod
    def __call__(self, args: Tuple[TokenPayload, UserUpdateModel]) -> UserReadModel:
        raise NotImplementedError()


class UpdateUserMeUseCaseImpl(UpdateUserMeUseCase):
    def __init__(
        self, user_unit_of_work: UserUnitOfWork, auth_unit_of_work: AuthUnitOfWork
    ):
        self.user_unit_of_work: UserUnitOfWork = user_unit_of_work
        self.auth_unit_of_work = auth_unit_of_work
        self.__setings = get_settings()

    def __call__(self, args: Tuple[TokenPayload, UserUpdateModel]) -> UserReadModel:
        user, data = args

        existing_user: UserEntity = self.user_unit_of_work.repository.find_by_id(
            id_=int(user.sub)
        )
        existing_user.update_entity(
            UserUpdateModel(**data.dict()),
            lambda user_data: user_data.dict(exclude_unset=True),
        )

        try:
            updated_user = self.user_unit_of_work.repository.update(existing_user)
            self.user_unit_of_work.commit()
        except Exception:
            self.user_unit_of_work.rollback()
            raise

        return UserReadModel.from_entity(cast(UserEntity, updated_user))
