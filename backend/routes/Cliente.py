from flask import Blueprint,jsonify,request
from sqlalchemy import select
from sqlalchemy.orm import session
from database.models.Cliente import Cliente
from database.models.Mascota import Mascota
from sqlalchemy.sql.expression import join
from schemas.Cliente import ClienteSchema
from schemas.Mascota import MascotaSchema
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
    session.close()
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

@bp.route('/cliente/delete/<int:cliente_id>',methods=['DELETE'])

def delete_cliente(cliente_id):
    schema = ClienteSchema()
    stmt = select(Cliente).where(Cliente.id == cliente_id)
    result = session.execute(stmt).scalars().one()
    session.delete(result)
    session.commit()
    cliente = schema.dump(result)
    session.close()
    return jsonify(cliente)

@bp.route('/cliente/<int:cliente_id>/mascotas')

def getMascotas(cliente_id):
    schema = MascotaSchema(many=1)
    Join = join(Cliente,Mascota,Cliente.id == Mascota.id_propietario)
    stmt = select(Mascota).select_from(Join).where(Cliente.id == cliente_id)
    result = session.execute(stmt).scalars().all()
    mascotas = schema.dump(result)
    session.close()
    return  jsonify(results = mascotas)


