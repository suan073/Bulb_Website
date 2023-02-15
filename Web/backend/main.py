from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from domain.analysis import analysis_router
from domain.topic import topic_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis_router.router)
app.include_router(topic_router.router)