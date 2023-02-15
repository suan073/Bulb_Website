from datetime import datetime

from pydantic import BaseModel


class Analysis(BaseModel):
    analysis_id: int
    topic_id: int
    topic_name: str
    average_view: float
    max_view: float
    lastest_updatetime: datetime
    top5links: str
    avg_video_length: float
    x_data: str
    y_data: str
    isBig: bool

    class Config:
        orm_mode = True

class brief_Analysis(BaseModel):
    analysis_id: int
    topic_id: int
    topic_name: str
    x_data: str
    y_data: str
    isBig: bool