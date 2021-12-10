from flask import Blueprint,request,jsonify,abort
from sqlalchemy import select
from database.db import Session
from sqlalchemy.sql.expression import join
from database.models.Mascota import Mascota
from database.models.Cliente import Cliente
from schemas.Mascota import MascotaSchema
from schemas.Cliente import ClienteSchema

bp = Blueprint('mascota',__name__)
session = Session

@bp.route('/mascotas')

def index_mascotas():
    schema = MascotaSchema(many=1)
    stmt = select(Mascota)
    result = session.execute(stmt).scalars().all()
    mascotas = schema.dump(result)
    session.close()
    return jsonify(results = mascotas)

@bp.route('/mascotas/<int:mascota_id>')

def get_mascota(mascota_id):
    schema = MascotaSchema()
    stmt = select(Mascota).where(Mascota.id == mascota_id)
    try:
        result = session.execute(stmt).scalars().one()
        mascota = schema.dump(result)
    except:
        return abort(404)
    return jsonify(mascota)

@bp.route('/mascota',methods=['POST'])

def post_mascota():
    posted_mascota = MascotaSchema().load(request.get_json())
    mascota = Mascota(**posted_mascota)
    session.add(mascota)
    session.commit()
    new_mascota = MascotaSchema().dump(mascota)
    return jsonify(new_mascota),201

@bp.route('/mascota/delete/<int:mascota_id>',methods=['DELETE'])

def delete_mascota(mascota_id):
    schema = MascotaSchema()
    stmt = select(Mascota).where(Mascota.id_propietario == mascota_id)
    try:
        result = session.execute(stmt).scalars().one()
        session.delete(result)
        session.commit()
        mascota = schema.dump(result)
        session.close()
    except:
        return abort(404)   
    return jsonify(mascota)

@bp.route('/mascota/<int:id_mascota>/owner')

def getMascotas(id_mascota):
    schema = ClienteSchema()
    Join = join(Mascota,Cliente,Mascota.id_propietario == Cliente.id)
    stmt = select(Cliente).select_from(Join).where(Mascota.id == id_mascota)
    try:
        result = session.execute(stmt).scalars().one()
        owner = schema.dump(result)
        session.close()
    except:
        return abort(404)   
    return  jsonify(owner)