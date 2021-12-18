from .Usuario import Usuario
from ..db import Base
from sqlalchemy import Column,Integer,String
from werkzeug.security import generate_password_hash
class Empleado(Usuario,Base):
    __tablename__ = 'empleado'
    ventasTotales = Column(Integer,nullable=False)
    password = Column(String(256))
    role = Column(String())
    def __init__(self,id,nombre,apellido,telefono,id_tipo,direccion,ventasTotales,password,role):
        super().__init__(id,nombre,apellido,telefono,id_tipo,direccion)
        self.ventasTotales = ventasTotales
        self.password = generate_password_hash(password)
        self.role = role