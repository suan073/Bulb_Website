from models import Keyword, Topic, Analysis
from datetime import datetime
from database import SessionLocal
import sys
import crawling
from crawling import analyze
import json


def get_analysis(id, data):
    dict = json.loads(data)
    if dict['max_view'] == 0:
        return
    Analysis_object = Analysis(topic_id = id, average_view = dict["average_view"], max_view = dict["max_view"], lastest_updatetime = datetime.strptime(dict["lastest_updatetime"], '%Y-%m-%d %H:%M:%S'), top5links = dict["top5links"], avg_video_length = dict["average_video_length"], x_data = dict["x_data"], y_data = dict["y_data"])
    return Analysis_object
    

db = SessionLocal()
topic_list = db.query(Topic).all()

#k = db.query(Analysis).filter(Analysis.analysis_id==2).all()
#a = 1

for t in topic_list:
    a = analyze()
    a.crawling(t.topic_name)
    a.extract_data()
    data = get_analysis(t.topic_id, a.get_data())
    if data != None:
        db.add(data)
        db.commit()

'''from models import Keyword, Topic, Analysis
from datetime import datetime
from database import SessionLocal
db = SessionLocal()
my_keywords = ["떵개", "상해기", "쯔양"]
my_adjective = [ "먹방 " ]
for kstr in my_keywords:
    k = Keyword(keyword_name=kstr)
    db.commit()
    for astr in my_adjective:
        t = Topic(keyword=k, topic_name=astr+kstr)
        db.add(t)
        db.commit()'''