from sqlalchemy import Column,Integer
from sqlalchemy import ForeignKey
from ..db import Base 

class Detalle(Base):
    num_detalle = Column(Integer,primary_key=True)
    id_factura = Column(Integer,primary_key=True,autoincrement=False)
    id_producto = Column(Integer,ForeignKey('producto.id'))
    cantidad = Column(Integer)

    def __init__(self,num_detalle,id_factura,id_producto,cantidad):
        self.num_detalle = num_detalle
        self.id_factura = id_factura
        self.id_producto = id_producto
        self.cantidad = cantidad