from marshmallow import Schema,fields

class FacturaSchema(Schema):
    id_factura = fields.Number()
    id_cliente = fields.Number()
    fecha = fields.DateTime()
