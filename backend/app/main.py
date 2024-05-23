from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse, JSONResponse

from starlette.middleware.cors import CORSMiddleware

from app.core.database.postgres.database import engine
from app.core.error.base_exception import BaseError
from app.core.models.postgres import models
from app.dependencies import get_settings
from app.initial_data import init_data
from app.modules.rent.presentation.routes import rent_router
from app.modules.vehicle.presentation.routes import vehicle_router
from app.modules.user.presentation.routes import user_router
from app.modules.office.presentation.routes import office_router


settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
)

app.include_router(vehicle_router)
app.include_router(rent_router)
app.include_router(office_router)
app.include_router(user_router)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs/", status_code=303)


@app.on_event("startup")
def startup_event():
    models.Base.metadata.create_all(bind=engine)
    init_data()


# Exception handler
@app.exception_handler(BaseError)
async def custom_exception_handler(request: Request, exc: BaseError):
    return JSONResponse(
        status_code=exc.code,
        content={"detail": exc.message},
    )
