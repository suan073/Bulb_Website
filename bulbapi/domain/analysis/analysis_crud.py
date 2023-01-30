from models import Analysis
from sqlalchemy.orm import Session


def get_Analysis(db: Session, topic_id: int):
    analysis_list = db.query(Analysis)\
        .filter(topic_id == topic_id)\
        .all()
    return analysis_list[0]