from marshmallow import Schema,fields

class DetalleSchema(Schema):
    num_detalle = fields.Number()
    id_factura = fields.Number()
    id_producto = fields.Number()
    cantidad = fields.Number()