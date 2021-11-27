from sqlalchemy import Column,Integer,String
from sqlalchemy.sql.expression import desc
from ..db import Base

class Producto(Base):
    __tablename__ = 'producto'
    id = Column(Integer,primary_key=True)
    nombre = Column(String(40),nullable=False)
    precio = Column(Integer,nullable=False)
    tipo = Column(String(40),nullable=False)
    descripcion = Column(String(80),nullable=False)
    def __init__(self,id,nombre,precio,tipo,descripcion):
        self.id = id
        self.nombre = nombre
        self.precio = precio
        self.tipo = tipo
        self.descripcion = descripcion