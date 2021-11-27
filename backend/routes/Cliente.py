from flask import Blueprint
from schemas.Cliente import ClienteSchema
bp = Blueprint('cliente',__name__)

@bp.route('/clientes')

def index_cliente():
    
    return "clientes"
