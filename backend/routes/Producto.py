from itertools import product
from flask import Blueprint,request,jsonify,abort
from sqlalchemy import select,update
from backend.database.db import Session
from backend.database.models.Producto import Producto
from backend.schemas.Producto import ProductoSchema

bp = Blueprint('producto',__name__)
session = Session

@bp.route('/productos')

def index_producto():
    schema = ProductoSchema(many=1)
    stmt = select(Producto).where(Producto.tipo=='producto')
    result = session.execute(stmt).scalars().all()
    productos = schema.dump(result)
    session.close()
    return jsonify(results = productos)

@bp.route('/procedimientos')    

def index_procedimientos():
    schema = ProductoSchema(many=1)
    stmt = select(Producto).where(Producto.tipo =='procedimiento')
    result = session.execute(stmt).scalars().all()
    productos = schema.dump(result)
    session.close()
    return jsonify(results = productos)

@bp.route('/producto/<int:procdimiento_id>')

def get_producto(procdimiento_id):
    schema = ProductoSchema()
    stmt = select(Producto).where(Producto.id == procdimiento_id)
    try:
        result = session.execute(stmt).scalars().one()
        producto = schema.dump(result)
        session.close()
    except:
        return abort(404)    
    return jsonify(producto)

@bp.route('/procedimiento/<int:procdimiento_id>')

def get_procedimiento(procdimiento_id):
    schema = ProductoSchema()
    stmt = select(Producto).where(Producto.id == procdimiento_id).where(Producto.tipo == "procedimiento")
    try:
        result = session.execute(stmt).scalars().one()
        producto = schema.dump(result)
        session.close()
    except:
        return abort(404)    
    return jsonify(producto)

@bp.route('/producto',methods=['POST'])

def post_producto():
    posted_producto = ProductoSchema().load(request.get_json())
    try:
        producto = Producto(**posted_producto)
        session.add(producto)
        session.commit()
        new_producto = ProductoSchema().dump(producto)
    except:
        session.rollback()
        return abort(404)   
    return jsonify(new_producto),201

@bp.route('/producto/delete/<int:procdimiento_id>',methods=['DELETE'])

def delete_producto(procdimiento_id):
    schema = ProductoSchema()
    stmt = select(Producto).where(Producto.id == procdimiento_id)
    try:
        result = session.execute(stmt).scalars().one()
        session.delete(result)
        session.commit()
        producto = schema.dump(result)
        session.close()
    except:
        session.rollback()
        return abort(404)    
    return jsonify(producto)

@bp.route('/producto/<int:id_producto>',methods=['PUT'])

def update_producto(id_producto):
    schema =ProductoSchema(partial=1)
    updtProducto = request.get_json()

    stmt = update(Producto).where(Producto.id == id_producto).values(updtProducto)
    try:
        session.execute(stmt)
        session.commit()
        session.close()
    except:
        session.rollback()
        return abort(404)    
    stmt = select(Producto).where(Producto.id == id_producto)
    try:
        result=session.execute(stmt).scalars().one()
        product = schema.dump(result)
    except:
        session.rollback()
        return abort(404)
    return jsonify(product)

