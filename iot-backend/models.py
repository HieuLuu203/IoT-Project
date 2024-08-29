from sqlalchemy import Column, Float, Integer, DateTime
from database import Base

class Sensor(Base):
    __tablename__ = "sensors"

    id = Column(Integer, primary_key=True, index=True)
    temperature = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    light = Column(Integer, nullable=False)
    date = Column(DateTime, nullable=False)
