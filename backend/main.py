from flask import Flask
from flask_cors import CORS
from database.models.Usuario import Usuario
from database.db import Base,Engine,Session
from database.models.Empleado import Empleado
from database.models.Cliente import Cliente
from database.models.Mascota import Mascota
from database.models.Producto import Producto
from routes.Cliente import bp as bpCliente
from routes.Empleado import bp as bpEmpleado
from routes.Mascota import bp as bpMascota
from routes.Producto import bp as bpProducto

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