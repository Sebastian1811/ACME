
from marshmallow import Schema,fields

class ProductoSchema(Schema):
    id = fields.Number()
    nombre = fields.String()
    precio = fields.Number()
    tipo = fields.String()
    descripcion = fields.String()