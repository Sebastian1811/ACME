from flask import Blueprint,jsonify,request,abort
from sqlalchemy import select,update
from backend.database.models.Empleado import Empleado
from backend.database.models.Producto import Producto
from backend.database.db import Session
from backend.database.models.Factura import Factura
from backend.database.models.Detalle import Detalle
from backend.schemas.Factura import FacturaSchema
from backend.schemas.Detalle import DetalleSchema
from backend.schemas.Producto import ProductoSchema
from sqlalchemy.sql.expression import join

bp = Blueprint('factura',__name__)
session = Session

@bp.route('/facturar',methods=['POST'])

def index_factura():
    solicitud = request.get_json()
    detalles = solicitud['detalles']
    id_empleado = solicitud['id_empleado']
    ventas = 0
    cantidad = []
    precio = []
    for i in detalles:
        stmt = select(Producto.precio).where(Producto.id == i['id_producto'])
        price = session.execute(stmt)
        cantidad.append(i['cantidad'])
        for j in price:
            precio.append(j.precio) 

    for i in range(len(precio)):
        ventas += precio[i] * cantidad[i]
        
    try:
        postedfactura = FacturaSchema().load(solicitud)
        factura = Factura(**postedfactura)
        session.add(factura)
        session.commit()
        session.close()
    except:
        session.rollback()
        return abort(404)
    try:
        for i in detalles:
            postedDetalle = DetalleSchema().load(i)
            detalle = Detalle(**postedDetalle)
            session.add(detalle)
            session.commit()
        session.close()
    except:
        session.rollback()
        return abort(404)   
    try:
        stmt = select(Empleado.ventasTotales).where(Empleado.id == id_empleado)
        result = session.execute(stmt)
        for i in result:
            ventas += i.ventasTotales
        stmtU = update(Empleado).where(Empleado.id == id_empleado).values(ventasTotales = ventas).\
        execution_options(synchronize_session="fetch")
        session.execute(stmtU)
        session.commit()
        session.close()
        
    except:
        session.rollback()
        return abort(404)    
            
    return jsonify(result="SUCCESS")

@bp.route('/facturas')

def facturas():
    schema = FacturaSchema(many=1)
    stmt = select(Factura)
    result = session.execute(stmt).scalars().all()
    session.close()
    facturas = schema.dump(result)
    return jsonify(results = facturas)

@bp.route('/factura/<int:id_factura>')

def get_factura(id_factura):
    schema = FacturaSchema()
    stmt = select(Factura).where(Factura.id_factura == id_factura)
    try:
        result = session.execute(stmt).scalars().one()
        session.close()
        factura = schema.dump(result)
    except:
        session.rollback()
        return abort(404)
    return jsonify(factura)    

@bp.route('/factura/details/<int:factura_id>')

def factura(factura_id):
    schemaFactura = FacturaSchema()
    schemaDetalle = DetalleSchema(many=1)
    schemaProducto = ProductoSchema(many=1)

    Join2 = join(Detalle,Producto,Detalle.id_producto == Producto.id)

    stmt = select(Factura).where(Factura.id_factura==factura_id)
    stmt2 = select(Detalle).where(Detalle.id_factura == factura_id)
    stmt3 = select(Producto).select_from(Join2).where(Detalle.id_factura == factura_id)
    
    try:
        result = session.execute(stmt).scalars().one()
        facturas = schemaFactura.dump(result)
    except:
        return abort(404)    
    try:
        result = session.execute(stmt2).scalars().all()
        detalles = schemaDetalle.dump(result)
    except:
        return abort(404)
    try:
        result = session.execute(stmt3).scalars().all()
        productos = schemaProducto.dump(result)
    except:
        return abort(404)       
    session.close()
    return jsonify(factura = facturas,detalles = detalles,productos =productos)

@bp.route('/factura/delete/<int:id_factura>',methods=['DELETE'])

def delete_factura(id_factura):
    schemaFactura = FacturaSchema()
    schemaDetalle = DetalleSchema(many=1)
    stmt = select(Factura).where(Factura.id_factura==id_factura)
    stmt2 = select(Detalle).where(Detalle.id_factura == id_factura)

    Join = join(Detalle,Producto,Detalle.id_producto == Producto.id)
    Join2 = join(Factura,Empleado,Factura.id_empleado == Empleado.id)
    stmt3 = select(Producto.precio).select_from(Join).where(Detalle.id_factura == id_factura)
    stmt4 = select(Empleado.ventasTotales,Empleado.id).select_from(Join2).where(Factura.id_factura == id_factura)

    stmt5 = select(Detalle.cantidad).where(Detalle.id_factura == id_factura)
    cantidad = []
    value = 0
    precio = []
    ventasAct = 0
    id_empleado = 0
    result = session.execute(stmt3)
   
    for i in result:
        precio.append(i.precio)
    result = session.execute(stmt5)   
    for i in result:
        cantidad.append(i.cantidad)  
    for i in range(len(cantidad)):
        value += cantidad[i]*precio[i]    
    result = session.execute(stmt4)
    for i in result:
        ventasAct = i.ventasTotales
        id_empleado = i.id
    newVentasTotales = ventasAct - value
    try:
        resultFactura = session.execute(stmt).scalars().one()
        session.delete(resultFactura)
        session.commit()
        factura = schemaFactura.dump(resultFactura)
    except:
        return abort(404)    
    try:
        resultDetalle = session.execute(stmt2).scalars().all()
        detalle = schemaDetalle.dump(resultDetalle)
        for i in resultDetalle:
            session.delete(i)
            session.commit()
    except:
        return abort(404)
    try:
        stmtU = update(Empleado).where(Empleado.id == id_empleado).values(ventasTotales = newVentasTotales).\
        execution_options(synchronize_session="fetch")
        session.execute(stmtU)
        session.commit()
        session.close()
    except:
        return abort(404)    
    session.close()    
    return jsonify(factura = factura,detalle = detalle)
