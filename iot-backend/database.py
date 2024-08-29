from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pymysql

# Đảm bảo rằng pymysql được cài đặt
pymysql.install_as_MySQLdb()

# Cấu hình kết nối đến cơ sở dữ liệu MySQL
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:12345678@localhost:3306/iot"

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
