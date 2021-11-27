from flask import Flask
from database.models.Usuario import Usuario
from database.db import Base,Engine,Session
from database.models.Empleado import Empleado
from database.models.Cliente import Cliente
from database.models.Mascota import Mascota
from database.models.Producto import Producto
from sqlalchemy import select
from flask import Flask,jsonify,request
from flask import Blueprint


Base.metadata.create_all(Engine)
session = Session
app = Flask(__name__)

@app.route('/')
def index():
    return "hola,como estas"