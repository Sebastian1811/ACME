var table = document.getElementById("myTable");

// AGREGAR VALORES A LA TABLA
function agregarProducto(){
  let tbodyRowCount = table.tBodies[0].rows.length;
  let ID = parseInt(table.rows[tbodyRowCount].cells[0].innerHTML) + 1;
  let row = table.insertRow();
  row.classList.add("align-middle");
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  cell1.innerHTML = ID;
  cell2.innerHTML = document.getElementById("nombreAg").value;
  cell3.innerHTML = "$" + formato(document.getElementById("precioAg").value);
  cell4.classList.add("justify-content-center");
  document.getElementById("nombreAg").value = "";
  document.getElementById("precioAg").value = "";
  creacionBotonesModEli();
}

// CREACION BOTONES NUEVOS
function creacionBotonesModEli(){
  let tbodyRowCount = table.tBodies[0].rows.length;
  let celda = table.rows[tbodyRowCount].cells[3];
  let btnMod = document.createElement("button");
  let btnEli = document.createElement("button");
  btnMod.innerHTML = "Modificar";
  btnMod.className = "btn btn-warning";
  btnMod.style.marginRight = "5px";
  btnEli.innerHTML = "Eliminar";
  btnEli.className = "btn btn-danger";
  celda.appendChild(btnMod);
  celda.appendChild(btnEli);
  btnMod.onclick = modalModInfo;
  btnMod.setAttribute("data-bs-toggle", "modal");
  btnMod.setAttribute("data-bs-target", "#modProdModal");
  btnEli.onclick = alerta;
}

// MODIFICAR INFORMACIÓN
function modalModInfo(){
  let rowID = event.target.parentNode.parentNode;
  btnPress = rowID;
  let nombreProd = rowID.cells[1].innerHTML;
  let precioProd = limpiarPrecio(rowID.cells[2].innerHTML);
  document.getElementById("nombreMod").value = nombreProd;
  document.getElementById("precioMod").value = precioProd;
}

function modInfo(){
  btnPress.cells[1].innerHTML = document.getElementById("nombreMod").value;
  btnPress.cells[2].innerHTML = document.getElementById("precioMod").value;
  document.getElementById("nombreMod").value = "";
  document.getElementById("precioMod").value = "";
}

// ELIMINAR INFORMACION
function alerta(){
  let rowID = event.target.parentNode.parentNode;
  let nomProdDel = rowID.cells[1].innerHTML;
  let opcion = confirm("¿Está seguro que desea borra el producto " + nomProdDel);
  if (opcion == true) {
    rowID.remove();
  }
}

// FETCHS

fetch(API_URL + "/empleados")
.then(res => res.json())
.then(data => Object.values(data)[0].forEach(empleado => (console.log(empleado.nombre + " " + empleado.apellido))))
.catch(err => console.log(err));