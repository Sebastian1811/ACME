from flask import Blueprint

bp = Blueprint('mascota',__name__)

@bp.route('/mascotas')
def index_mascotas():
    return 'mascotas'