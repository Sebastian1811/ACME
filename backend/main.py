from flask import Flask
from database.models.Usuario import Usuario
from database.db import Base,Engine,Session
from database.models.Empleado import Empleado
from database.models.Cliente import Cliente
from database.models.Mascota import Mascota
from database.models.Producto import Producto


Base.metadata.create_all(Engine)
session = Session
app = Flask(__name__)

@app.route('/')
def index():
    return "hola,como estas"