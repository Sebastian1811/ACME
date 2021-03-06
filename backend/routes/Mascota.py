from flask import Blueprint,request,jsonify,abort
from sqlalchemy import select,update
from backend.database.db import Session
from sqlalchemy.sql.expression import join
from backend.database.models.Mascota import Mascota
from backend.database.models.Cliente import Cliente
from backend.schemas.Mascota import MascotaSchema
from backend.schemas.Cliente import ClienteSchema

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
    try:
        session.add(mascota)
        session.commit()
        new_mascota = MascotaSchema().dump(mascota)
    except:
        session.rollback()
        return abort(404)    
    return jsonify(new_mascota),201

@bp.route('/mascota/delete/<int:mascota_id>',methods=['DELETE'])

def delete_mascota(mascota_id):
    schema = MascotaSchema()
    stmt = select(Mascota).where(Mascota.id == mascota_id)
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

@bp.route('/mascota/<int:id_mascota>',methods=['PUT'])

def updateMascota(id_mascota):
    schema =MascotaSchema(partial=1)
    updtMascota = request.get_json()

    stmt = update(Mascota).where(Mascota.id == id_mascota).values(updtMascota)
    try:
        session.execute(stmt)
        session.commit()
        session.close()
    except:
        session.rollback()
        return abort(404)    
    stmt = select(Mascota).where(Mascota.id == id_mascota)
    try:
        result=session.execute(stmt).scalars().one()
        mascota = schema.dump(result)
    except:
        session.rollback()
        return abort(404)
    return jsonify(mascota)
