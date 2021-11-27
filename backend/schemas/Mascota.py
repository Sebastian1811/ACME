from marshmallow import Schema,fields

class MascotaSchema(Schema):
    id_propetario = fields.Number()
    nombre = fields.String()
    tipo = fields.String()
    raza = fields.String()
    fecha_nacimiento = fields.DateTime()
    