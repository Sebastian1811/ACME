from sqlalchemy import Column,Integer,DateTime
from sqlalchemy import ForeignKey
from ..db import Base

class Factura(Base):
    __tablename__ = 'factura'
    id_factura = Column(Integer,primary_key=True,autoincrement=False)
    id_cliente = Column(Integer,ForeignKey('cliente.id'))
    fecha = Column(DateTime,nullable=False)

    def __init__(self,id_factura,id_cliente,fecha):
        self.id_factura = id_factura
        self.id_cliente = id_cliente
        self.fecha = fecha

