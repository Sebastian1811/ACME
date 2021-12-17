from sqlalchemy import Column,Integer,DateTime
from sqlalchemy import ForeignKey
from ..db import Base

class Factura(Base):
    __tablename__ = 'factura'
    id_factura = Column(Integer,primary_key=True,autoincrement=0)
    id_cliente = Column(Integer)
    id_empleado = Column(Integer)
    fecha = Column(DateTime,nullable=False)

    def __init__(self,id_factura,id_cliente,id_empleado,fecha):
        self.id_factura = id_factura
        self.id_cliente = id_cliente
        self.id_empleado = id_empleado
        self.fecha = fecha

