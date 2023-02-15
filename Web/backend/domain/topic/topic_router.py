from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Keyword, Topic
from typing import Any, List, Union
router = APIRouter(
    prefix="/api/topic",
)


@router.get("/list/{word}", response_model = List[int])
def word2id(word: str, db: Session = Depends(get_db)):
    keyword = db.query(Keyword).filter(Keyword.keyword_name == word).one()
    associate_topic = []
    topic = db.query(Topic).filter(Topic.keyword_id == keyword.keyword_id).all()
    for item in topic:
        associate_topic.append(item.topic_id)
    return associate_topic