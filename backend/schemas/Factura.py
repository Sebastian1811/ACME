from marshmallow import Schema,fields,EXCLUDE

class FacturaSchema(Schema):
    class Meta:
        unknown = EXCLUDE
    id_factura = fields.Number()
    id_cliente = fields.Number()
    fecha = fields.DateTime()
