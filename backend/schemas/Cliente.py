from marshmallow import Schema,fields

class ClienteSchema(Schema):
    id = fields.Number()
    nombre = fields.String()
    apellido = fields.String()
    telefono = fields.String()
    id_tipo = fields.String()
    direccion = fields.String()
    email = fields.String()