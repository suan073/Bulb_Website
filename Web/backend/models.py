#models.py
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from database import Base

class Keyword(Base):
    __tablename__ = "Keyword"

    keyword_id = Column(Integer, primary_key = True)
    keyword_name = Column(String, nullable = False)
    

class Topic(Base):
    __tablename__ = "Topic"

    topic_id = Column(Integer, primary_key = True)
    topic_name = Column(String, nullable = False)
    keyword_id = Column(Integer, ForeignKey("Keyword.keyword_id"))
    keyword = relationship("Keyword", backref = "topics")
    

class Analysis(Base):
    __tablename__ = "Analysis"
    
    analysis_id = Column(Integer, primary_key = True)
    topic_id = Column(Integer, ForeignKey("Topic.topic_id"))
    average_view = Column(Integer, nullable = False)
    max_view = Column(Integer, nullable = False)
    lastest_updatetime = Column(DateTime, nullable = False)
    top5links = Column(String, nullable = False)
    avg_video_length = Column(Integer, nullable = False)
    x_data = Column(String, nullable = False)
    y_data = Column(String, nullable = False)