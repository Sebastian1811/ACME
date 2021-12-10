from flask import Blueprint,jsonify,request
from sqlalchemy import select
from database.models.Empleado import Empleado
from schemas.Empleado import EmpleadoSchema
from marshmallow import INCLUDE
from database.db import Session
from werkzeug.security import check_password_hash

session = Session

bp = Blueprint('empleado',__name__)

@bp.route('/empleados')

def index_empleado():
    schema = EmpleadoSchema(many=1)
    stmt = select(Empleado)
    result = session.execute(stmt).scalars().all()
    empleados = schema.dump(result)
    session.close()
    return jsonify(results = empleados)

@bp.route('/empleado/<int:empleado_id>')

def get_empleado(empleado_id):
    schema = EmpleadoSchema()
    stmt = select(Empleado).where(Empleado.id == empleado_id)
    try:
        result = session.execute(stmt).scalars().one()
        empleado = schema.dump(result)  
        session.close()
    except:
        return "No existe el ID"    
    return jsonify(empleado)

@bp.route('/empleado',methods=['POST'])

def post_empleado():
    posted_empleado = EmpleadoSchema().load(request.get_json())
    empleado = Empleado(**posted_empleado)
    session.add(empleado)
    session.commit()
    new_empleado = EmpleadoSchema().dump(empleado)
    session.close()
    return jsonify(new_empleado),201

@bp.route('/empleado/delete/<int:empleado_id>',methods=['DELETE'])

def delete_empleado(empleado_id):
    schema = EmpleadoSchema()
    stmt = select(Empleado).where(Empleado.id == empleado_id)
    result = session.execute(stmt).scalars().one()
    session.delete(result)
    session.commit()
    empleado = schema.dump(result)
    session.close()
    return jsonify(empleado)

@bp.route('/login',methods=['POST'])
def login():

    user = request.get_json()['username']
    passw = request.get_json()['password']
    stmt = select(Empleado).where(Empleado.id == user)
    try:
        result = session.execute(stmt).scalars().one()
        session.close()
    except:
        return "Username o password incorrecta"
    if not check_password_hash(result.password,passw):
        return "Username o password incorrecta"    

    return "SUCCESFULL"    
