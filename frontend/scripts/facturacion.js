window.onload = function(){
  checkCookie();
};

var table = document.getElementById("myTable");
let idProd = [];
let nombresProd = [];
let precioProd = [];
let idProductosAFacturar = [];
let productosAFacturar = [];
let cantidadProductosAFacturar = [];
let factura_Actual = 0;
let id_cliente_factura = 0;


// OBTENER NÚMERO DE ÚLTIMA FACTURA PARA PODER SABER QUÉ FACTURA SIGUE
fetch(API_URL + "/facturas")
  .then(res => res.json())
  .then(data => {
    let arrayFacturas = Object.values(data)[0];
    arrayFacturas.sort(sortOrder("id_factura"));
    let tamFacturas = Object.values(data)[0].length;
    var numUltimaFactura = arrayFacturas[tamFacturas - 1].id_factura;
    factura_Actual = numUltimaFactura + 1;
    document.getElementById("numeroFactura").innerHTML += factura_Actual;
  })
.catch(err => console.log(err))

// OBTENER LOS PRODCUTOS DISPONIBLES Y AGREGARLOS A LA LISTA
fetch(API_URL + "/productos")
  .then(res => res.json())
  .then(data => {
    let listadoProductos = Object.values(data)[0];
    listadoProductos.sort(sortOrder("nombre"));

    for(let i=0; i<listadoProductos.length; i++){
      idProd.push(listadoProductos[i].id);
      nombresProd.push(listadoProductos[i].nombre);
      precioProd.push(listadoProductos[i].precio);
    }

    console.log(idProd);

    // AGREGAR PRODUCTOS A LA LISTA DE PRODUCTOS A PAGAR
    let optProd = document.getElementById("selPro");
    for(let i=0; i<idProd.length; i++){
      var option = document.createElement("option");
      option.text = nombresProd[i] + " | $" + formato(precioProd[i]);
      optProd.add(option);
    }

  })
.catch(err => console.log(err))

// SE VERIFICA SI LA CÉDULA INGRESADA EXISTE EN EL SISTEMA
let formVerificar = document.getElementById("formVer");
formVerificar.addEventListener("submit", function(e){
  e.preventDefault();
  
  var numCed = document.getElementById("inpVerificar").value;

  let datos = new FormData(formVerificar);

  fetch(API_URL + "/cliente/" + datos.get("Cedula"))
  .then(res => res.json())
  .then(data => {
    var nombreCli = data.nombre + " " + data.apellido;
    var cedulaCli = data.id;
    id_cliente_factura = cedulaCli;
    var direccionCli = data.direccion;
    var ciudadCli = data.ciudad;

    document.getElementById("nombreCliente").innerHTML = nombreCli;
    document.getElementById("nombreCliente").style.fontWeight = "bold";
    document.getElementById("cedulaCliente").innerHTML = "CC: " + cedulaCli;
    document.getElementById("direccionCliente").innerHTML = direccionCli;
    document.getElementById("direccionCliente").style.fontWeight = "bold";
    document.getElementById("ciudadCliente").innerHTML = ciudadCli;

    document.getElementById("selMet").disabled = false;
    document.getElementById("selPro").disabled = false;
    document.getElementById("cantidadProducto").disabled = false;
    document.getElementById("agregarProd").disabled = false;
    document.getElementById("genFactura").disabled = false;

  })
  .catch(err => {
    var myModal = new bootstrap.Modal(document.getElementById("cedNoRegModal"));
    document.getElementById("errorCedVer").innerHTML = "El cliente con número de cédula " + numCed + " no se encuentra registrado en el sistema."
    myModal.show();
  })
});

// DATOS PARA OBTENER LA FECHA DEL DÍA ACTUAL
let n = new Date();
let y = n.getFullYear();
let m = n.getMonth() + 1;
let d = n.getDate();
document.getElementById("tDate").innerHTML = d + "/" + m + "/" + y; 
document.getElementById("tDate").style.fontWeight = "bold";
document.getElementById("eDate").innerHTML = d + "/" + m + "/" + y; 
document.getElementById("eDate").style.fontWeight = "bold";

// SUMAR LOS VALORES DE TODOS LOS PRODUCTOS EN LA FACTURA
var valorTotalFac = 0;
document.getElementById("valTot").innerHTML = "$0,00";
function suma(filas){
  let impTotal = "";
  let precio = table.rows[filas].cells[3].innerHTML;
  let valor = limpiarNumero(precio);
  valorTotalFac += valor;
  
  impTotal = formato(valorTotalFac);

  document.getElementById("valTot").innerHTML = "$" + impTotal + ",00";
  document.getElementById("valTot").style.fontWeight = "bold";
  document.getElementById("valTot").classList.add("text-left");
}

// FUNCIÓN PARA AGREGAR ELEMENTOS A LA TABLA DE LA FACTURA
var tbodyRef = table.getElementsByTagName('tbody')[0];
function agregarProducto(){

  let opcionSel = document.getElementById("selPro").selectedIndex;

  let cantidadAgregada = document.getElementById("cantidadProducto").value; 
  let lenCantidad = cantidadAgregada.length
  let cantidad = parseInt(cantidadAgregada);
  let tamCant = ("" + cantidadAgregada).length;

  if(opcionSel == 0){
    alert("Seleccione un producto o procedimiento");
  }else if(cantidadAgregada == ""){
    alert("Ingrese una cantidad válida");
  }else{
    let tbodyRowCount = table.tBodies[0].rows.length;
    let cant = document.getElementById("cantidadProducto").value; // Cantidad del producto
    let row = tbodyRef.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let x = document.getElementById("selPro").selectedIndex;
    let y = document.getElementById("selPro").options;
    indice = y[x].index - 1;
    cell1.innerHTML = nombresProd[indice];
    cell2.innerHTML = "$" + formato(precioProd[indice]);
    cell3.innerHTML = cant;
    cell4.innerHTML = "$" + formato(precioProd[indice] * cant);
    document.getElementById("cantidadProducto").value = "";

    let productoSeleccionado = idProductosAFacturar[opcionSel]

    if(idProductosAFacturar.includes(productoSeleccionado) == false){
      idProductosAFacturar.push(productoSeleccionado);
      productosAFacturar.push(nombresProd[productoSeleccionado]);
      cantidadProductosAFacturar.push(parseInt(cantidadAgregada));
    }else{
      let prodAgregado = idProductosAFacturar.indexOf(productoSeleccionado);
      cantidadProductosAFacturar[prodAgregado] += parseInt(cantidadAgregada);
    }

    suma(tbodyRowCount+1)
  }
}

// MUESTRA EL VALOR TOTAL DE LA FACTURA EN EL MODAL
function mostrarValorFacturaModal(){

  let metodoSeleccionado = document.getElementById("selMet").selectedIndex;

  if(metodoSeleccionado == 0){
    alert("Seleccione un método de pago");
  }else{
    let confFact = "El total de la factura es de " + document.getElementById("valTot").innerHTML;
    document.getElementById("divConfFact").innerHTML = confFact;
    let myModal = new bootstrap.Modal(document.getElementById("genFactModal"));
    myModal.show();
  }  
}

function postFactura(){

  let detalles = [];
  let i = 1;

  idProductosAFacturar.forEach(productos => {
    let data = {
      num_detalle: i,
      id_factura: factura_Actual,
      id_producto: idProductosAFacturar[i-1],
      cantidad: cantidadProductosAFacturar[i-1]
    }
    detalles.push(data);
    i++;
  })

  let fechaFactura = y + "-" + m + "-" + d + "T00:00:00.000000";

  let factura = {
    id_factura: factura_Actual,
    id_cliente: id_cliente_factura,
    id_empleado: parseInt(getCookie("usuario")),
    fecha: fechaFactura,
    detalles: detalles
  }

  fetch(API_URL+"/facturar", {
  method: 'POST',
  body: JSON.stringify(factura),
  headers:{
    'Content-Type': 'application/json'
  }})
  .then(res => res.json())
  .then(response => {
    console.log("Success", response);
    detalles = [];
    factura = null;
  })
  .catch(err => console.log(err))

}

function limpiarTabla(){
  document.getElementById("bodyFact").innerHTML = "";
  document.getElementById("valTot").innerHTML = "$0,00";
  valorTotalFac = 0;
}