var table = document.getElementById("myTable");

// DATOS PARA OBTENER LA FECHA DEL DÍA ACTUAL
n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("tDate").innerHTML = d + "/" + m + "/" + y; 
document.getElementById("tDate").style.fontWeight = "bold";
document.getElementById("eDate").innerHTML = d + "/" + m + "/" + y; 
document.getElementById("eDate").style.fontWeight = "bold";

// Placeholders para la información del cliente
var nombreCli = "Sebastian Andica";
var cedulaCli = "4145815165";
var direccionCli = "Detrás de La 14 (¿Eso sigue existiendo?)";
var ciudadCli = "En el centro del Valle";

document.getElementById("nombreCliente").innerHTML = nombreCli;
document.getElementById("nombreCliente").style.fontWeight = "bold";
document.getElementById("cedulaCliente").innerHTML = "CC: " + cedulaCli;
document.getElementById("direccionCliente").innerHTML = direccionCli;
document.getElementById("direccionCliente").style.fontWeight = "bold";
document.getElementById("ciudadCliente").innerHTML = ciudadCli;

// AGREGAR PRODUCTOS A LA LISTA DE PRODUCTOS A PAGAR
let nombresProd = ["Consulta general", "Esterilización perros raza grande", "Esterilización perros raza pequeña", "Esterilización gatos", "Hemograma"];
let valorProd = [15000, 300000, 320000, 320000, 20000];
var optProd = document.getElementById("selPro");
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
  let valor = limpiarPrecio(precio);
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