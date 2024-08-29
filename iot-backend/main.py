from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import Sensor
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

# Tạo các bảng trong cơ sở dữ liệu
Base.metadata.create_all(bind=engine)

# Định nghĩa schema cho Sensor
class SensorCreate(BaseModel):
    temperature: float
    humidity: float
    light: int
    date: datetime

@app.post("/sensors/")
def create_sensor(sensor: SensorCreate, db: Session = Depends(get_db)):
    db_sensor = Sensor(
        temperature=sensor.temperature,
        humidity=sensor.humidity,
        light=sensor.light,
        date=sensor.date
    )
    db.add(db_sensor)
    db.commit()
    db.refresh(db_sensor)
    return db_sensor

@app.get("/sensors/")
def get_sensors(db: Session = Depends(get_db)):
    sensors = db.query(Sensor).all()
    return sensors

@app.get("/sensors/{sensor_id}")
def read_sensor(sensor_id: int, db: Session = Depends(get_db)):
    db_sensor = db.query(Sensor).filter(Sensor.id == sensor_id).first()
    if db_sensor is None:
        raise HTTPException(status_code=404, detail="Sensor not found")
    return db_sensor
