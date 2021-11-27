from flask import Blueprint

bp = Blueprint('empleado',__name__)

@bp.route('/empleados')
def index_empleado():
    return "empleados"