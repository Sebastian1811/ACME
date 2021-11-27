from flask import Blueprint,jsonify,request
from sqlalchemy import select
from sqlalchemy.orm import session
from database.models.Empleado import Empleado
from database.models.Cliente import Cliente
from schemas.Cliente import ClienteSchema
from database.db import Session

session = Session
bp = Blueprint('cliente',__name__)

@bp.route('/clientes')

def index_cliente():
    schema = ClienteSchema(many=1)
    stmt = select(Cliente)
    result = session.execute(stmt).scalars().all()
    clientes = schema.dump(result)
    session.close()    
    return jsonify(results = clientes)

@bp.route('/cliente/<int:cliente_id>')

def get_cliente(cliente_id):
    schema = ClienteSchema()
    stmt = select(Cliente).where(Cliente.id == cliente_id)
    result = session.execute(stmt).scalars().one()
    cliente = schema.dump(result)
    return jsonify(cliente)

@bp.route('/cliente',methods=['POST'])

def post_cliente():
    posted_cliente = ClienteSchema().load(request.get_json())
    cliente = Cliente(**posted_cliente)
    session.add(cliente)
    session.commit()
    new_cliente = ClienteSchema().dump(cliente)
    session.close()
    return jsonify(new_cliente),201
