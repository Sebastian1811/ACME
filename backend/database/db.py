from sqlalchemy import create_engine 
from sqlalchemy.orm import Session 
from sqlalchemy.ext.declarative import declarative_base
from config import DATABASE_CONNECTION_URI

Engine = create_engine(DATABASE_CONNECTION_URI)
Base = declarative_base()
Session = Session(Engine,future=True)
