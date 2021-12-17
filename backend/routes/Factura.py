from flask import Blueprint,jsonify,request,abort
from sqlalchemy import select
from database.models.Producto import Producto
from database.db import Session
from database.models.Factura import Factura
from database.models.Detalle import Detalle
from schemas.Factura import FacturaSchema
from schemas.Detalle import DetalleSchema
from schemas.Producto import ProductoSchema
from sqlalchemy.sql.expression import join

bp = Blueprint('factura',__name__)
session = Session

@bp.route('/facturar',methods=['POST'])

def index_factura():
    solicitud = request.get_json()
    detalles = solicitud['detalles']
    try:
        postedfactura = FacturaSchema().load(solicitud)
        factura = Factura(**postedfactura)
        session.add(factura)
        session.commit()
        session.close
    except:
        return abort(404)
    try:
        for i in detalles:
            postedDetalle = DetalleSchema().load(i)
            detalle = Detalle(**postedDetalle)
            session.add(detalle)
            session.commit()
        session.close()
    except:
        return abort(404)   
            
    return jsonify(result="SUCCESS")

@bp.route('/facturas')

def facturas():
    schema = FacturaSchema(many=1)
    stmt = select(Factura)
    result = session.execute(stmt).scalars().all()
    session.close()
    facturas = schema.dump(result)
    return jsonify(results = facturas)

@bp.route('/factura/<int:id_factura>')

def get_factura(id_factura):
    schema = FacturaSchema()
    stmt = select(Factura).where(id_factura)
    result = session.execute(stmt).scalars().one()
    session.close()
    factura = schema.dump(result)
    return jsonify(factura)    

@bp.route('/factura/details/<int:factura_id>')

def factura(factura_id):
    schemaFactura = FacturaSchema()
    schemaDetalle = DetalleSchema(many=1)
    schemaProducto = ProductoSchema(many=1)

    Join2 = join(Detalle,Producto,Detalle.id_producto == Producto.id)

    stmt = select(Factura).where(Factura.id_factura==factura_id)
    stmt2 = select(Detalle).where(Detalle.id_factura == factura_id)
    stmt3 = select(Producto).select_from(Join2).where(Detalle.id_factura == factura_id)
    
    try:
        result = session.execute(stmt).scalars().one()
        facturas = schemaFactura.dump(result)
    except:
        return abort(404)    
    try:
        result = session.execute(stmt2).scalars().all()
        detalles = schemaDetalle.dump(result)
    except:
        return abort(404)
    try:
        result = session.execute(stmt3).scalars().all()
        productos = schemaProducto.dump(result)
    except:
        return abort(404)       
    session.close()
    return jsonify(factura = facturas,detalles = detalles,productos =productos)

@bp.route('/factura/delete/<int:id_factura>',methods=['DELETE'])

def delete_factura(id_factura):
    schemaFactura = FacturaSchema()
    schemaDetalle = DetalleSchema(many=1)
    stmt = select(Factura).where(Factura.id_factura==id_factura)
    stmt2 = select(Detalle).where(Detalle.id_factura == id_factura)
    try:
        resultFactura = session.execute(stmt).scalars().one()
        session.delete(resultFactura)
        session.commit()
        factura = schemaFactura.dump(resultFactura)
    except:
        return abort(404)    
    try:
        resultDetalle = session.execute(stmt2).scalars().all()
        detalle = schemaDetalle.dump(resultDetalle)
        for i in resultDetalle:
            session.delete(i)
            session.commit()
    except:
        return abort(404)
    session.close()    
    return jsonify(factura = factura,detalle = detalle)
