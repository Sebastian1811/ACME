from flask import Blueprint,jsonify,request
from sqlalchemy import select
from database.models.Empleado import Empleado
from schemas.Empleado import EmpleadoSchema
from database.db import Session

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
    result = session.execute(stmt).scalars().one()
    empleado = schema.dump(result)
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