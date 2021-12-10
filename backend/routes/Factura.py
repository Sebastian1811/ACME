from flask import Blueprint,jsonify,request,abort
from flask.blueprints import Blueprint
from sqlalchemy import select
from database.db import Session
from database.models.Factura import Factura
from database.models.Detalle import Detalle
from schemas.Factura import FacturaSchema
from schemas.Detalle import DetalleSchema

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
            

    return "facturas"
@bp.route('/facturas')

def facturas():
    schema = FacturaSchema(many=1)
    stmt = select(Factura)
    result = session.execute(stmt).scalars().all()
    session.close()
    facturas = schema.dump(result)
    return jsonify(results = facturas)

@bp.route('/detalles')

def detalles():
    schema = DetalleSchema(many=1)
    stmt = select(Detalle)
    result = session.execute(stmt).scalars().all()
    session.close()
    detalles = schema.dump(result)
    return jsonify(results = detalles)    
