from models import Analysis,Topic
from sqlalchemy.orm import Session


def get_Analysis(db: Session, topic_id: int):
    analysis = db.query(Analysis)\
        .filter(Analysis.topic_id == topic_id)\
        .one()
    analysis.topic_name = db.query(Topic).filter(Topic.topic_id==topic_id).one().topic_name
    analysis.isBig = True
    return analysis