from models import Keyword, Topic, Analysis
from datetime import datetime
from database import SessionLocal
db = SessionLocal()
my_keywords = ["떵개"]
my_adjective = [ "먹방 " ]
for kstr in my_keywords:
    k = Keyword(keyword_name=kstr)
    db.commit()
    for astr in my_adjective:
        t = Topic(keyword=k, topic_name=astr+kstr)
        db.add(t)
        db.commit()