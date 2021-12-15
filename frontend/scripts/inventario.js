var tableProd = document.getElementById("bodyProds");
var tableClientes = document.getElementById("bodyClientes");
var tableMascotas = document.getElementById("bodyMascotas");
var tableEmpleados = document.getElementById("bodyEmpleados");

// CONSEGUIR DATOS PRODUCTOS
fetch(API_URL + "/productos")
.then(res => res.json())
.then(data => Object.values(data)[0].forEach(productos => {
  let id = productos.id;
  let nombre = productos.nombre;
  let precio = productos.precio;
  agregarProducto(id, nombre, precio);
}))
.catch(err => console.log(err))

// CONSEGUIR DATOS CLIENTES
fetch(API_URL + "/clientes")
.then(res => res.json())
.then(data => Object.values(data)[0].forEach(clientes => {
  let id = clientes.id;
  let nombre = clientes.nombre;
  let apellido = clientes.apellido;
  let telefono = clientes.telefono;
  let direccion = clientes.direccion;
  let ciudad = clientes.ciudad;
  let correo = clientes.email;
  agregarCliente(id, nombre, apellido, telefono, direccion, ciudad, correo);
}))
.catch(err => console.log(err))

// CONSEGUIR DATOS MASCOTAS
fetch(API_URL + "/mascotas")
.then(res => res.json())
.then(data => Object.values(data)[0].forEach(mascotas => {
  let id = mascotas.id;
  let id_prop = mascotas.id_propietario;
  let nombre = mascotas.nombre;
  let tipo = mascotas.tipo;
  let raza = mascotas.raza;
  let fecha = new Date(mascotas.fecha_nacimiento);
  let dia = fecha.getDate();
  let mes = fecha.getMonth() + 1;
  let año = fecha.getFullYear();
  let fecha_nac = dia + "/" + mes + "/" + año; 
  agregarMascota(id, id_prop, nombre, tipo, raza, fecha_nac);
})) 
.catch(err => console.log(err))

// CONSEGUIR DATOS EMPLEADOS
fetch(API_URL + "/empleados")
.then(res => res.json())
.then(data => Object.values(data)[0].forEach(empleados => {
  let id = empleados.id;
  let nombre = empleados.nombre;
  let apellido = empleados.apellido;
  let telefono = empleados.telefono;
  let direccion = empleados.direccion;
  let role = empleados.role;
  let ventas = empleados.ventasTotales;
  agregarEmpleado(id, nombre, apellido, telefono, direccion, role, ventas);
})) 
.catch(err => console.log(err))

// ------------------- PRODUCTOS -------------------

// AGREGAR PRODUCTOS A LA TABLA
function agregarProducto(id, nombre, precio){
  let row = tableProd.insertRow();
  row.classList.add("align-middle");
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  cell1.innerHTML = id;
  cell2.innerHTML = nombre;
  cell3.innerHTML = "$" + formato(precio);
  cell4.classList.add("justify-content-center");
  document.getElementById("nombreAg").value = "";
  document.getElementById("precioAg").value = "";
  creacionBotonesProd();
}

// CREACION BOTONES NUEVOS PRODUCTOS
function creacionBotonesProd(){
  let tbodyRowCount = tableProd.rows.length - 1;
  let tbodyCellsCount = tableProd.rows[tbodyRowCount].cells.length - 1;
  let celda = tableProd.rows[tbodyRowCount].cells[tbodyCellsCount];
  let btnMod = document.createElement("button");
  let btnEli = document.createElement("button");
  btnMod.innerHTML = "Modificar";
  btnMod.className = "btn btn-warning";
  btnMod.style.marginRight = "5px";
  btnEli.innerHTML = "Eliminar";
  btnEli.className = "btn btn-danger";
  celda.appendChild(btnMod);
  celda.appendChild(btnEli);
  btnMod.onclick = modalModProd;
  btnMod.setAttribute("data-bs-toggle", "modal");
  btnMod.setAttribute("data-bs-target", "#modProdModal");
  btnEli.onclick = borrarFila;
}

// MODIFICAR INFORMACIÓN PRODUCTOS
function modalModProd(){
  let rowID = event.target.parentNode.parentNode;
  btnPress = rowID;
  let nombreProd = rowID.cells[1].innerHTML;
  let precioProd = limpiarNumero(rowID.cells[2].innerHTML);
  document.getElementById("nombreProdMod").value = nombreProd;
  document.getElementById("precioProdMod").value = precioProd;
}

function modProd(){
  // FETCH POST PRODUCTOS
  btnPress.cells[1].innerHTML = document.getElementById("nombreProdMod").value;
  btnPress.cells[2].innerHTML = document.getElementById("precioProdMod").value;
  document.getElementById("nombreProdMod").value = "";
  document.getElementById("precioProdMod").value = "";
}

// ------------------- CLIENTES -------------------

// AGREGAR CLIENTES A LA TABLA
function agregarCliente(id, nombre, apellido, telefono, direccion, ciudad, correo){
  let row = tableClientes.insertRow();
  row.classList.add("align-middle");
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  let cell6 = row.insertCell(5);
  let cell7 = row.insertCell(6);
  let cell8 = row.insertCell(7);
  cell1.innerHTML = id;
  cell2.innerHTML = nombre;
  cell3.innerHTML = apellido;
  cell4.innerHTML = telefono;
  cell5.innerHTML = direccion;
  cell6.innerHTML = ciudad;
  cell7.innerHTML = correo;
  cell8.classList.add("justify-content-center");
  creacionBotonesClientes();
}

// CREACION BOTONES NUEVOS CLIENTES
function creacionBotonesClientes(){
  let tbodyRowCount = tableClientes.rows.length - 1;
  let tbodyCellsCount = tableClientes.rows[tbodyRowCount].cells.length - 1;
  let celda = tableClientes.rows[tbodyRowCount].cells[tbodyCellsCount];
  let btnMod = document.createElement("button");
  let btnEli = document.createElement("button");
  btnMod.innerHTML = "Modificar";
  btnMod.className = "btn btn-warning";
  btnMod.style.marginRight = "5px";
  btnEli.innerHTML = "Eliminar";
  btnEli.className = "btn btn-danger";
  celda.appendChild(btnMod);
  celda.appendChild(btnEli);
  btnMod.onclick = modalModClientes;
  btnMod.setAttribute("data-bs-toggle", "modal");
  btnMod.setAttribute("data-bs-target", "#modClienteModal");
  btnEli.onclick = borrarFila;
}

// MODIFICAR INFORMACIÓN CLIENTES
function modalModClientes(){
  let rowID = event.target.parentNode.parentNode;
  btnPress = rowID;
  let nombreClientes = rowID.cells[1].innerHTML;
  let apellidosClientes = rowID.cells[2].innerHTML;
  let telefonoClientes = rowID.cells[3].innerHTML;
  let direccionClientes = rowID.cells[4].innerHTML;
  let ciudadClientes = rowID.cells[5].innerHTML;
  let correoClientes = rowID.cells[6].innerHTML;
  document.getElementById("nombreClientesMod").value = nombreClientes;
  document.getElementById("apellidosClientesMod").value = apellidosClientes;
  document.getElementById("telefonoClientesMod").value = telefonoClientes;
  document.getElementById("direccionClientesMod").value = direccionClientes;
  document.getElementById("ciudadClientesMod").value = ciudadClientes;
  document.getElementById("correoClientesMod").value = correoClientes;
}

function modClientes(){
  btnPress.cells[1].innerHTML = document.getElementById("nombreClientesMod").value
  btnPress.cells[2].innerHTML = document.getElementById("precioMod").value;
  btnPress.cells[3].innerHTML = document.getElementById("apellidosClientesMod").value
  btnPress.cells[4].innerHTML = document.getElementById("telefonoClientesMod").value
  btnPress.cells[5].innerHTML = document.getElementById("direccionClientesMod").value
  btnPress.cells[6].innerHTML = document.getElementById("ciudadClientesMod").value
  btnPress.cells[7].innerHTML = document.getElementById("correoClientesMod").value
  document.getElementById("nombreClientesMod").value = "";
  document.getElementById("precioMod").value = "";
  document.getElementById("telefonoClientesMod").value = "";
  document.getElementById("direccionClientesMod").value = "";
  document.getElementById("ciudadClientesMod").value = "";
  document.getElementById("correoClientesMod").value = "";
}

// ------------------- MASCOTAS -------------------

// AGREGAR MASCOTAS A LA TABLA
function agregarMascota(id, id_prop, nombre, tipo, raza, fecha){
  let row = tableMascotas.insertRow();
  row.classList.add("align-middle");
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  let cell6 = row.insertCell(5);
  let cell7 = row.insertCell(6);
  cell1.innerHTML = id;
  cell2.innerHTML = nombre;
  cell3.innerHTML = id_prop;
  cell4.innerHTML = tipo;
  cell5.innerHTML = raza;
  cell6.innerHTML = fecha;
  cell7.classList.add("justify-content-center");
  creacionBotonesMascotas();
}

// CREACION BOTONES NUEVOS MASCOTAS
function creacionBotonesMascotas(){
  let tbodyRowCount = tableMascotas.rows.length - 1;
  let tbodyCellsCount = tableMascotas.rows[tbodyRowCount].cells.length - 1;
  let celda = tableMascotas.rows[tbodyRowCount].cells[tbodyCellsCount];
  let btnMod = document.createElement("button");
  let btnEli = document.createElement("button");
  btnMod.innerHTML = "Modificar";
  btnMod.className = "btn btn-warning";
  btnMod.style.marginRight = "5px";
  btnEli.innerHTML = "Eliminar";
  btnEli.className = "btn btn-danger";
  celda.appendChild(btnMod);
  celda.appendChild(btnEli);
  btnMod.onclick = modalModMascotas;
  btnMod.setAttribute("data-bs-toggle", "modal");
  btnMod.setAttribute("data-bs-target", "#modMascotasModal");
  btnEli.onclick = borrarFila;
}

// MODIFICAR INFORMACIÓN MASCOTAS
function modalModMascotas(){
  let rowID = event.target.parentNode.parentNode;
  btnPress = rowID;
  let nombreMascotas = rowID.cells[1].innerHTML;
  let cedDueñoMascotas = rowID.cells[2].innerHTML;
  let tipoMascotas = rowID.cells[3].innerHTML;
  let razaMascotas = rowID.cells[4].innerHTML;
  document.getElementById("nombreMascotasMod").value = nombreMascotas;
  document.getElementById("cedDueñoMascotasMod").value = cedDueñoMascotas;
  document.getElementById("tipoMascotasMod").value = tipoMascotas;
  document.getElementById("razaMascotasMod").value = razaMascotas;
}

function modMascotas(){
  btnPress.cells[1].innerHTML = document.getElementById("nombreMascotasMod").value
  btnPress.cells[2].innerHTML = document.getElementById("cedDueñoMascotasMod").value;
  btnPress.cells[3].innerHTML = document.getElementById("tipoMascotasMod").value
  btnPress.cells[4].innerHTML = document.getElementById("razaMascotasMod").value
  document.getElementById("nombreMascotasMod").value = "";
  document.getElementById("cedDueñoMascotasMod").value = "";
  document.getElementById("tipoMascotasMod").value = "";
  document.getElementById("razaMascotasMod").value = "";
}

// ------------------- EMPLEADOS -------------------

// AGREGAR EMPLEADOS A LA TABLA
function agregarEmpleado(id, nombre, apellido, telefono, direccion, role, ventas){
  let row = tableEmpleados.insertRow();
  row.classList.add("align-middle");
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  let cell6 = row.insertCell(5);
  let cell7 = row.insertCell(6);
  let cell8 = row.insertCell(7);
  cell1.innerHTML = id;
  cell2.innerHTML = nombre;
  cell3.innerHTML = apellido
  cell4.innerHTML = telefono;
  cell5.innerHTML = direccion;
  cell6.innerHTML = role;
  cell7.innerHTML = ventas;
  cell8.classList.add("justify-content-center");
  creacionBotonesEmpleados();
}

// CREACION BOTONES NUEVOS EMPLEADOS
function creacionBotonesEmpleados(){
  let tbodyRowCount = tableEmpleados.rows.length - 1;
  let tbodyCellsCount = tableEmpleados.rows[tbodyRowCount].cells.length - 1;
  let celda = tableEmpleados.rows[tbodyRowCount].cells[tbodyCellsCount];
  let btnMod = document.createElement("button");
  let btnEli = document.createElement("button");
  btnMod.innerHTML = "Modificar";
  btnMod.className = "btn btn-warning";
  btnMod.style.marginRight = "5px";
  btnEli.innerHTML = "Eliminar";
  btnEli.className = "btn btn-danger";
  celda.appendChild(btnMod);
  celda.appendChild(btnEli);
  btnMod.onclick = modalModEmpleados;
  btnMod.setAttribute("data-bs-toggle", "modal");
  btnMod.setAttribute("data-bs-target", "#modEmpleadosModal");
  btnEli.onclick = borrarFila;
}

// MODIFICAR INFORMACIÓN EMPLEADOS
function modalModEmpleados(){
  let rowID = event.target.parentNode.parentNode;
  btnPress = rowID;
  let nombreEmpleado = rowID.cells[1].innerHTML;
  let apellidoEmpleado = rowID.cells[2].innerHTML;
  let telefonoEmpleado = rowID.cells[3].innerHTML;
  let direccionEmpleado = rowID.cells[4].innerHTML;
  document.getElementById("nombreEmpleadosMod").value = nombreEmpleado;
  document.getElementById("apellidoEmpleadosMod").value = apellidoEmpleado;
  document.getElementById("telefonoEmpleadosMod").value = telefonoEmpleado;
  document.getElementById("direccionEmpleadosMod").value = direccionEmpleado;
}

function modEmpleados(){
  btnPress.cells[1].innerHTML = document.getElementById("nombreEmpleadosMod").value
  btnPress.cells[2].innerHTML = document.getElementById("apellidoEmpleadosMod").value;
  btnPress.cells[3].innerHTML = document.getElementById("telefonoEmpleadosMod").value
  btnPress.cells[4].innerHTML = document.getElementById("direccionEmpleadosMod").value
  document.getElementById("nombreEmpleadosMod").value = "";
  document.getElementById("apellidoEmpleadosMod").value = "";
  document.getElementById("telefonoEmpleadosMod").value = "";
  document.getElementById("direccionEmpleadosMod").value = "";
}

// ELIMINAR FILA
function borrarFila(){
  let rowID = event.target.parentNode.parentNode;
  let nomProdDel = rowID.cells[1].innerHTML;
  let opcion = confirm("¿Está seguro que desea borra el producto '" + nomProdDel + "'?");
  if (opcion == true) {
    rowID.remove();
  }
}