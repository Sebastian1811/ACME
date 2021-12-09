from marshmallow import Schema,fields,INCLUDE

class EmpleadoSchema(Schema):
    class Meta:
        unknown = INCLUDE
    id = fields.Number()
    nombre = fields.String()
    apellido = fields.String()
    telefono =fields.String() 
    id_tipo = fields.String()
    direccion = fields.String()
    ventasTotales = fields.Number()