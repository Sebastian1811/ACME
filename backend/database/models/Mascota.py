from sqlalchemy import ForeignKey
from ..db import Base
from sqlalchemy import Column,Integer,String,DateTime


class Mascota(Base):
    __tablename__ = 'mascota'
    id_propietario = Column(Integer,ForeignKey('cliente.id'),primary_key=True,)
    nombre = Column(String(30))
    tipo = Column(String(30))
    raza = Column(String(50))
    fecha_nacimiento = Column(DateTime)
    def __init__(self,id_prop,nombre,tipo,raza,fecha_nacimiento):
        self.id_propietario = id_prop
        self.nombre = nombre
        self.tipo = tipo
        self.raza = raza 
        self.fecha_nacimiento = fecha_nacimiento