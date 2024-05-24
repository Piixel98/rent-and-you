from app.core.repositories.base_repository import BaseRepository
from app.modules.user.domain.entities.user_entity import UserEntity


class UserRepository(BaseRepository[UserEntity]):
    """UserRepository defines a repositories interface for User entity"""

    pass
