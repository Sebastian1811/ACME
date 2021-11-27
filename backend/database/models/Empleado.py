from .Usuario import Usuario
from ..db import Base
from sqlalchemy import Column,Integer

class Empleado(Usuario,Base):
    __tablename__ = 'empleado'
    ventasTotales = Column(Integer,nullable=False)
    def __init__(self,id,nombre,apellido,telefono,id_tipo,direccion,ventasTotales):
        super().__init__(id,nombre,apellido,telefono,id_tipo,direccion)
        self.ventasTotales = ventasTotales