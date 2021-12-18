from flask import Flask
from flask_cors import CORS
from backend.database.models.Usuario import Usuario
from backend.database.db import Base,Engine,Session
from backend.database.models.Empleado import Empleado
from backend.database.models.Cliente import Cliente
from backend.database.models.Mascota import Mascota
from backend.database.models.Producto import Producto
from backend.database.models.Factura import Factura
from backend.database.models.Detalle import Detalle

from backend.routes.Cliente import bp as bpCliente
from backend.routes.Empleado import bp as bpEmpleado
from backend.routes.Mascota import bp as bpMascota
from backend.routes.Producto import bp as bpProducto
from backend.routes.Factura import bp as bpFactura

Base.metadata.create_all(Engine)
session = Session
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "hola,como estas"

app.register_blueprint(bpCliente)
app.register_blueprint(bpEmpleado)
app.register_blueprint(bpMascota)
app.register_blueprint(bpProducto)
app.register_blueprint(bpFactura)
