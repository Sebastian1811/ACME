from flask import Blueprint

bp = Blueprint('cliente',__name__)

@bp.route('/clientes')
def index_cliente():
    return "clientes"
