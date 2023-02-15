from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from domain.analysis import analysis_schema, analysis_crud

router = APIRouter(
    prefix="/api/analysis",
)

@router.get("/Detail/{topic_id}", response_model=analysis_schema.Analysis)
def question_detail(topic_id: int, db: Session = Depends(get_db)):
    analysis = analysis_crud.get_Analysis(db, topic_id=topic_id)
    return analysis

@router.get("/Brief/{topic_id}", response_model=analysis_schema.brief_Analysis)
def question_brief(topic_id: int, db: Session = Depends(get_db)):
    analysis = analysis_crud.get_Analysis(db, topic_id=topic_id)
    brief_ana = { "analysis_id" : analysis.analysis_id, "topic_id": analysis.topic_id, "topic_name": analysis.topic_name , "x_data": analysis.x_data,  "y_data": analysis.y_data, "isBig":False }
    return brief_ana