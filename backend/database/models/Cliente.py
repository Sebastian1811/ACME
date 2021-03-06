from .Usuario import Usuario
from ..db import Base
from sqlalchemy import Column,String

class Cliente(Usuario,Base):
    __tablename__ = 'cliente'
    email = Column(String,nullable=False)
    ciudad = Column(String)
    def __init__(self,id,nombre,apellido,telefono,id_tipo,direccion,email,ciudad):
        super().__init__(id,nombre,apellido,telefono,id_tipo,direccion)
        self.email = email
        self.ciudad = ciudad
