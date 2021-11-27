from flask import Blueprint,request,jsonify
from sqlalchemy import select
from database.db import Session
from database.models.Producto import Producto
from schemas.Producto import ProductoSchema

bp = Blueprint('producto',__name__)
session = Session

@bp.route('/productos')

def index_producto():
    schema = ProductoSchema(many=1)
    stmt = select(Producto)
    result = session.execute(stmt).scalars().all()
    productos = schema.dump(result)
    session.close()
    return jsonify(results = productos)

@bp.route('/producto/<int:producto_id>')

def get_producto(producto_id):
    schema = ProductoSchema()
    stmt = select(Producto).where(Producto.id == producto_id)
    result = session.execute(stmt).scalars().one()
    producto = schema.dump(result)
    session.close()
    return jsonify(producto)

@bp.route('/producto',methods=['POST'])

def post_producto():
    posted_producto = ProductoSchema().load(request.get_json())
    producto = Producto(**posted_producto)
    session.add(producto)
    session.commit()
    new_producto = ProductoSchema().dump(producto)
    return jsonify(new_producto),201