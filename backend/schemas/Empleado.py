from marshmallow import Schema,fields

class EmpleadoSchema(Schema):
    id = fields.Number()
    nombre = fields.String()
    apellido = fields.String()
    telefono =fields.String() 
    id_tipo = fields.String()
    direccion = fields.String()
    ventasTotales = fields.Number()