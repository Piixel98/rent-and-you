"""
    Sql alchemy database module
"""
import os.path
from typing import Iterator, Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.config import Settings
from app.core.models.postgres.models import Base
from app.dependencies import get_settings
from app.modules.user.data.models.user import User

__SETTINGS: Settings = get_settings()

__SQLALCHEMY_DATABASE_URL = (
    f"postgresql://"
    f"{__SETTINGS.POSTGRES_USER}:{__SETTINGS.POSTGRES_PASSWORD}@"
    f"{__SETTINGS.POSTGRES_SERVER}/{__SETTINGS.POSTGRES_DB}"
)

engine = create_engine(__SQLALCHEMY_DATABASE_URL, future=True)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def get_session() -> Iterator[Session]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_db() -> Generator:
    with Session(engine) as session:
        yield session


def execute_sql_script(engine, file_path):
    with Session(engine) as session:
        with open(file_path, "r") as file:
            sql_script = file.read()
        for statement in sql_script.split(";"):
            if statement.strip():
                session.execute(statement)


def init_db() -> None:
    with Session(engine) as session:
        Base.metadata.create_all(engine)
        query = session.query(User).filter(
            User.email == __SETTINGS.FIRST_SUPERUSER_EMAIL
        )
        user = query.first()
        if user is None:
            user_in = User(
                first_name="admin",
                email=__SETTINGS.FIRST_SUPERUSER_EMAIL,
                hashed_password=__SETTINGS.FIRST_SUPERUSER_PASSWORD,
                role="admin",
            )
            session.add(user_in)
            session.commit()

        if os.path.exists(__SETTINGS.FILE_IMPORT_SQL):
            execute_sql_script(engine, __SETTINGS.FILE_IMPORT_SQL)
