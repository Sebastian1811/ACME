from flask import Blueprint,jsonify,request
from flask.blueprints import Blueprint
from sqlalchemy import select
from database.db import Session
from database.models.Producto import Producto
from schemas.Factura import FacturaSchema
from schemas.Detalle import DetalleSchema

bp = Blueprint('factura',__name__)
session = Session

@bp.route('/facturas')

def index_factura():
    return "facturas"

