from sqlalchemy import Column,String,Integer
class Usuario():
    id = Column(Integer,primary_key=True,autoincrement=False)
    nombre = Column(String(50),nullable= False)
    apellido = Column(String(50),nullable= False)
    telefono = Column(String(10),nullable= False)
    id_tipo = Column(String,nullable=False)
    direccion = Column(String,nullable= False)
    def __init__(self,id,nombre,apellido,telefono,id_tipo,direccion,):
        self.id = id
        self.nombre = nombre
        self.apellido = apellido
        self.telefono = telefono
        self.id_tipo = id_tipo
        self.direccion = direccion