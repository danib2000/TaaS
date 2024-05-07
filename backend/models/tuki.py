from sqlalchemy import Column, String, Integer, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Tuki(Base):
    __tablename__ = "tuki"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))
    type = Column(String(100))
    image_source = Column(Text)
