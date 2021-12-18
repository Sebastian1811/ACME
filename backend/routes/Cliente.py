from flask import Blueprint,jsonify,request,abort
from sqlalchemy import select,update
from backend.database.models.Cliente import Cliente
from backend.database.models.Mascota import Mascota
from sqlalchemy.sql.expression import join
from backend.schemas.Cliente import ClienteSchema
from backend.schemas.Mascota import MascotaSchema
from backend.database.db import Session

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
    try:
        result = session.execute(stmt).scalars().one()
        cliente = schema.dump(result)
        session.close()
    except:    
        return abort(404)
    return jsonify(cliente)

@bp.route('/cliente',methods=['POST'])

def post_cliente():
    posted_cliente = ClienteSchema().load(request.get_json())
    cliente = Cliente(**posted_cliente)
    try:
        session.add(cliente)
        session.commit()
        new_cliente = ClienteSchema().dump(cliente)
        session.close()
    except:
        session.rollback()
        return abort(404)    
    return jsonify(new_cliente),201

@bp.route('/cliente/delete/<int:cliente_id>',methods=['DELETE'])

def delete_cliente(cliente_id):
    schema = ClienteSchema()
    mascotaSchema = MascotaSchema(many=1)
    stmt = select(Cliente).where(Cliente.id == cliente_id)
    stmt2 = select(Mascota).where(Mascota.id_propietario == cliente_id)
    try: 
        resultMascotas = session.execute(stmt2).scalars().all()  
        mascotas = mascotaSchema.dump(resultMascotas) 
        for i in resultMascotas:
            session.delete(i)
            session.commit()
    except:
        session.rollback()
        return abort(404)   
    try:
        result = session.execute(stmt).scalars().one()
        session.delete(result)
        session.commit()
        cliente = schema.dump(result)
    except:
        return abort(404)   
    session.close()      
    return jsonify(cliente = cliente,mascotas = mascotas)

@bp.route('/cliente/<int:cliente_id>/mascotas')

def getMascotas(cliente_id):
    schema = MascotaSchema(many=1)
    Join = join(Cliente,Mascota,Cliente.id == Mascota.id_propietario)
    stmt = select(Mascota).select_from(Join).where(Cliente.id == cliente_id)
    try:
        result = session.execute(stmt).scalars().all()
        mascotas = schema.dump(result)
        session.close()
    except:
        return abort(404)    
    return  jsonify(results = mascotas)

@bp.route('/cliente/<int:id_cliente>',methods =['PUT'])
def updateCliente(id_cliente):
    schema =ClienteSchema(partial=1)
    updtCliente = request.get_json()

    stmt = update(Cliente).where(Cliente.id == id_cliente).values(updtCliente)
    try:
        session.execute(stmt)
        session.commit()
        session.close()
    except:
        session.rollback()
        return abort(404)    
    stmt = select(Cliente).where(Cliente.id == id_cliente)
    try:
        result=session.execute(stmt).scalars().one()
        product = schema.dump(result)
    except:
        session.rollback()
        return abort(404)
    return jsonify(product)



