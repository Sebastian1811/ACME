from marshmallow import Schema,fields

class MascotaSchema(Schema):
    id = fields.Number()
    id_propietario = fields.Number()
    nombre = fields.String()
    tipo = fields.String()
    raza = fields.String()
    fecha_nacimiento = fields.DateTime()
    