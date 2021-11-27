from flask import Blueprint,request,jsonify
from sqlalchemy import select
from sqlalchemy.orm import session
from database.db import Session
from database.models.Mascota import Mascota
from schemas.Mascota import MascotaSchema

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
    result = session.execute(stmt).scalars().one()
    mascota = schema.dump(result)
    return jsonify(mascota)

@bp.route('/mascota',methods=['POST'])

def post_mascota():
    posted_mascota = MascotaSchema().load(request.get_json())
    mascota = Mascota(**posted_mascota)
    session.add(mascota)
    session.commit()
    new_mascota = MascotaSchema().dump(mascota)
    return jsonify(new_mascota),201