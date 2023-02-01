from fastapi import FastAPI

from domain.analysis import analysis_router
from domain.topic import topic_router




app = FastAPI()

app.include_router(analysis_router.router)
app.include_router(topic_router.router)