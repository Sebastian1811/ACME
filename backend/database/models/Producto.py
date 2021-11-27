from sqlalchemy import Column,Integer,String
from ..db import Base

class Producto(Base):
    __tablename__ = 'producto'
    id = Column(Integer,primary_key=True)
    nombre = Column(String(40))
    precio = Column(Integer)
    tipo = Column(String(40))
    def __init__(self,id,nombre,precio,tipo):
        self.id = id
        self.nombre = nombre
        self.precio = precio
        self.tipo = tipo