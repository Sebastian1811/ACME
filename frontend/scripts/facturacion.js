var table = document.getElementById("myTable");

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

// AGREGAR PRODUCTOS A LA LISTA DE PRODUCTOS A PAGAR
let nombresProd = ["Consulta general", "Esterilización perros raza grande", "Esterilización perros raza pequeña", "Esterilización gatos", "Hemograma"];
let valorProd = [15000, 300000, 320000, 320000, 20000];
let optProd = document.getElementById("selPro");
for(let i=0; i<nombresProd.length; i++){
  let option = document.createElement("option");
  option.text = nombresProd[i] + " | $" + valorProd[i].toString();
  optProd.add(option);
}

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
  cell2.innerHTML = "$" + formato(valorProd[indice]);
  cell3.innerHTML = cant;
  cell4.innerHTML = "$" + formato(valorProd[indice] * cant);
  document.getElementById("cantidadProducto").value = "";
  suma(tbodyRowCount+1)
}

// MUESTRA EL VALOR TOTAL DE LA FACTURA EN EL MODAL
function mostrarValorFacturaModal(){
  let confFact = "El total de la factura es de " + document.getElementById("valTot").innerHTML;
  document.getElementById("divConfFact").innerHTML = confFact;
}

function limpiarTabla(){
  document.getElementById("bodyFact").innerHTML = "";
  document.getElementById("valTot").innerHTML = "$0,00";
  valorTotalFac = 0;
}