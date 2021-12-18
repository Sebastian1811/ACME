from flask import Blueprint,jsonify,request,abort 
from sqlalchemy import select
from backend.database.models.Empleado import Empleado
from backend.schemas.Empleado import EmpleadoSchema

from backend.database.db import Session
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
        return abort(404)   
    return jsonify(empleado) 

@bp.route('/empleado',methods=['POST'])

def post_empleado():
    posted_empleado = EmpleadoSchema().load(request.get_json())
    empleado = Empleado(**posted_empleado)
    try:
        session.add(empleado)
        session.commit()
        new_empleado = EmpleadoSchema().dump(empleado)
        session.close()
    except:
        session.rollback()
        return abort(404)    
    return jsonify(new_empleado),201

@bp.route('/empleado/delete/<int:empleado_id>',methods=['DELETE'])

def delete_empleado(empleado_id):
    schema = EmpleadoSchema()
    stmt = select(Empleado).where(Empleado.id == empleado_id)
    try:
        result = session.execute(stmt).scalars().one()
        session.delete(result)
        session.commit()
        empleado = schema.dump(result)
        session.close()
    except:
        session.rollback()
        return abort(404)    
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

    return jsonify(result='success')

@bp.route("/empleado/ventas")

def get_ventas_totales():
    schema = EmpleadoSchema(many=1,partial=1)
    stmt = select(Empleado.id,Empleado.nombre,Empleado.apellido,Empleado.ventasTotales)
    try:
        result = session.execute(stmt)
        report = schema.dump(result)
        session.close()
    except:
        return abort(404)
    return jsonify(reportes = report)
