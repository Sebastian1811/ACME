from flask import Blueprint

bp = Blueprint('producto',__name__)

@bp.route('/productos')
def index_producto():
    return 'productos'