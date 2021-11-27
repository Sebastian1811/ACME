from .Usuario import Usuario
from ..db import Base
from sqlalchemy import Column,Integer

class Empleado(Usuario,Base):
    __tablename__ = 'empleado'
    ventasTotales = Column(Integer)
    def __init__(self,id,nombre,telefono,id_tipo,direccion,ventas):
        super.__init__(id,nombre,telefono,id_tipo,direccion)
        self.ventasTotales = ventas