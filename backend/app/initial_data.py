from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database.postgres.database import engine
from app.dependencies import get_settings
from app.modules.user.data.models.user import User
from app.modules.user.domain.entities.user_entity import UserRole

settings = get_settings()


def init_data() -> None:
    with Session(engine) as session:
        user = session.execute(
            select(User).where(User.email == settings.FIRST_SUPERUSER_EMAIL)
        ).first()
        if not user:
            user_in = User(
                id_=1,
                first_name="admin",
                last_name="",
                document_type="",
                document_id="",
                postal_code="",
                address="",
                city="",
                phone_number="",
                role=UserRole.ADMIN,
                hashed_password="",
                email=settings.FIRST_SUPERUSER_EMAIL,
            )
            session.add(user_in)
            session.commit()


def main() -> None:
    init_data()


if __name__ == "__main__":
    main()
