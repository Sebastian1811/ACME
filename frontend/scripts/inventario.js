window.onload = function(){
  checkCookie();
  fetch(API_URL + "/empleado/" + parseInt(getCookie("usuario")))
  .then(res => res.json())
  .then(data => {
    if(data.role != "superusuario"){
      document.getElementById("nav-contact-tab-E").style.display = "none";
    }
  })
  .catch(err => console.log(err))
};

var tableProd = document.getElementById("bodyProds");
var tableClientes = document.getElementById("bodyClientes");
var tableMascotas = document.getElementById("bodyMascotas");
var tableEmpleados = document.getElementById("bodyEmpleados");
var tableFacturas = document.getElementById("bodyFacturas");

// CONSEGUIR DATOS PRODUCTOS
function getProductos(){
  fetch(API_URL + "/productos")
  .then(res => res.json())
  .then(data => {
    let arrayProductos = Object.values(data)[0];
    arrayProductos.sort(sortOrder("id"));
    arrayProductos.forEach(productos => {
      let id = productos.id;
      let nombre = productos.nombre;
      let precio = productos.precio;
      let tipo = productos.tipo;
      agregarProducto(id, nombre, precio, tipo[0].toUpperCase() + tipo.slice(1));
  })})
  .catch(err => console.log(err))
  fetch(API_URL + "/procedimientos")
  .then(res => res.json())
  .then(data => {
    let arrayProductos = Object.values(data)[0];
    arrayProductos.sort(sortOrder("id"));
    Object.values(data)[0].forEach(procedimientos => {
      let id = procedimientos.id;
      let nombre = procedimientos.nombre;
      let precio = procedimientos.precio;
      let tipo = procedimientos.tipo;
      agregarProducto(id, nombre, precio, tipo[0].toUpperCase() + tipo.slice(1));
  })})
  .catch(err => console.log(err))
}

// CONSEGUIR DATOS CLIENTES
function getClientes(){
  fetch(API_URL + "/clientes")
  .then(res => res.json())
  .then(data => { 
    let arrayClientes = Object.values(data)[0];
    arrayClientes.sort(sortOrder("id"));
    arrayClientes.forEach(clientes => {
    let id = clientes.id;
    let nombre = clientes.nombre;
    let apellido = clientes.apellido;
    let telefono = clientes.telefono;
    let direccion = clientes.direccion;
    let ciudad = clientes.ciudad;
    let correo = clientes.email;
    agregarCliente(id, nombre, apellido, telefono, direccion, ciudad, correo);
  })})
  .catch(err => console.log(err))
}

// CONSEGUIR DATOS MASCOTAS
function getMascotas(){
  fetch(API_URL + "/mascotas")
  .then(res => res.json())
  .then(data => {
    let arrayMascotas = Object.values(data)[0];
    arrayMascotas.sort(sortOrder("id"));
    arrayMascotas.forEach(mascotas => {
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
  })})
  .catch(err => console.log(err))
}

// CONSEGUIR DATOS EMPLEADOS
function getEmpleados(){
  fetch(API_URL + "/empleados")
  .then(res => res.json())
  .then(data => {
    let arrayEmpleados = Object.values(data)[0];
    arrayEmpleados.sort(sortOrder("id"));
    arrayEmpleados.forEach(empleados => {
      let id = empleados.id;
      let nombre = empleados.nombre;
      let apellido = empleados.apellido;
      let telefono = empleados.telefono;
      let direccion = empleados.direccion;
      let role = empleados.role;
      let ventas = empleados.ventasTotales;
      agregarEmpleado(id, nombre, apellido, telefono, direccion, role, ventas);
    })}) 
  .catch(err => console.log(err))
}

// CONSEGUIR DATOS FACTURAS
function getFacturas(){
  fetch(API_URL + "/facturas")
  .then(res => res.json())
  .then(data => {
    let arrayFacturas = Object.values(data)[0];
    arrayFacturas.sort(sortOrder("id"));
    arrayFacturas.forEach(facturas => {
      let fecha = new Date(facturas.fecha);
      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let año = fecha.getFullYear();
      let fecha_fac = dia + "/" + mes + "/" + año;
      let id_fact = facturas.id_factura;
      let id_clien = facturas.id_cliente;
      let id_empl = facturas.id_empleado;
      agregarFacturas(id_fact, id_clien, id_empl, fecha_fac);
  })}) 
  .catch(err => console.log(err))
}

// ------------------- PRODUCTOS -------------------

// AGREGAR PRODUCTOS A LA TABLA
function agregarProducto(id, nombre, precio, tipo){
  let row = tableProd.insertRow();
  row.classList.add("align-middle");
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  cell1.innerHTML = id;
  cell2.innerHTML = nombre;
  cell3.innerHTML = "$" + formato(precio);
  cell4.innerHTML = tipo;
  cell5.classList.add("justify-content-center");
  document.getElementById("nombreProdAg").value = "";
  document.getElementById("precioProdAg").value = "";
  document.getElementById("tipoProdAg").selectedIndex = 0;
  creacionBotones(tableProd, modalModProd, "modProdModal");
}

// MODIFICAR INFORMACIÓN PRODUCTOS
function modalModProd(){
  let rowID = event.target.parentNode.parentNode;
  btnPress = rowID;
  let nombreProd = rowID.cells[1].innerHTML;
  let precioProd = limpiarNumero(rowID.cells[2].innerHTML);
  let tipoProd = rowID.cells[3].innerHTML;
  document.getElementById("nombreProdMod").value = nombreProd;
  document.getElementById("precioProdMod").value = precioProd;
  let indicesSelectTipoProdMod = document.getElementById("tipoProdMod").length;
  let y = document.getElementById("tipoProdMod").options;
  let a = 0;
  for (let i=0; i<indicesSelectTipoProdMod; i++) {
    if(y[i].text == tipoProd){
      a = i;
      break;
    }
  }
  document.getElementById("tipoProdMod").selectedIndex = a;
}

function modProds(){
  let nombreProd = document.getElementById("nombreProdMod").value;
  let precioProd = document.getElementById("precioProdMod").value;
  let x = document.getElementById("tipoProdMod").selectedIndex;
  let y = document.getElementById("tipoProdMod").options;
  let tipoProd = (y[x].text).toLowerCase();

  if(nombreProd != ""){ 
    if(precioProd != ""){

      idFila = obetenerIDFila(btnPress);

      btnPress.cells[1].innerHTML = nombreProd;
      btnPress.cells[2].innerHTML = "$" + formato(precioProd);
      btnPress.cells[3].innerHTML = tipoProd[0].toUpperCase() + tipoProd.slice(1);
      

      let data = {
        nombre: nombreProd, 
        precio: parseInt(precioProd),
        tipo: tipoProd, 
      }

      fetch(API_URL+"/producto/" + idFila, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(response => {
        document.getElementById("nombreProdMod").value = "";
        document.getElementById("precioProdMod").value = "";
      })
      .catch(err => console.log(err))

    }else{
      alert("El número ingresado no es válido");
      let myModal = new bootstrap.Modal(document.getElementById("modProdModal"));
      myModal.show();
    }
  }else{
    alert("El nombre del producto no es válido");
    let myModal = new bootstrap.Modal(document.getElementById("modProdModal"));
    myModal.show();
    document.getElementById("nombreProdMod").value = nombreProd;
    document.getElementById("precioProdMod").value = precioProd;
  }
}

function postProducto(){

  fetch(API_URL + "/productos")
  .then(res => res.json())
  .then(data => {
    let arrayProductos = Object.values(data)[0];
    arrayProductos.sort(sortOrder("id"));
    let tamArrayProductos = arrayProductos.length;
    let id_last_prod = arrayProductos[tamArrayProductos - 1].id + 1;

    let nombre_pos = document.getElementById("nombreProdAg").value;
    let precio_pos = parseInt(document.getElementById("precioProdAg").value);
    let lenPrecio = (document.getElementById("precioProdAg").value).length;
    let tamPrecio = ("" + precio_pos).length;
    let x = document.getElementById("tipoProdAg").selectedIndex;
    let y = document.getElementById("tipoProdAg").options;
    let tipo_pos = y[x].text;

    if(lenPrecio != tamPrecio){
      alert("El precio no es válido");
      let myModal = new bootstrap.Modal(document.getElementById("agregarProdModal"));
      myModal.show();
    }else{

      let datos = {id: id_last_prod,
        nombre: nombre_pos,
        precio: precio_pos,
        descripcion: "",
        tipo: tipo_pos.toLowerCase()
      }

      fetch(API_URL+"/producto", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers:{
          'Content-Type': 'application/json'
        }

      }).then(res => res.json())
      .then(response => {
        agregarProducto(id_last_prod, nombre_pos, precio_pos);
        nombre_pos = "";
        precio_pos = "";
      })
      .catch(err => console.log(err)) 
    }
  })
  .catch(err => console.log(err))
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
  cell1.innerHTML = formato(id);
  cell2.innerHTML = nombre;
  cell3.innerHTML = apellido;
  cell4.innerHTML = telefono;
  cell5.innerHTML = direccion;
  cell6.innerHTML = ciudad;
  cell7.innerHTML = correo;
  cell8.classList.add("justify-content-center");
  creacionBotones(tableClientes, modalModClientes, "modClienteModal");
}

// MODIFICAR INFORMACIÓN CLIENTES
function modalModClientes(){
  let rowID = event.target.parentNode.parentNode;
  btnPress = rowID;
  let nombreClientes = rowID.cells[1].innerHTML;
  let apellidosClientes = rowID.cells[2].innerHTML;
  let telefonoClientes = rowID.cells[3].innerHTML;
  let direccionCliente = rowID.cells[4].innerHTML;
  let ciudadClientes = rowID.cells[5].innerHTML;
  let correoClientes = rowID.cells[6].innerHTML;
  document.getElementById("nombreClientesMod").value = nombreClientes;
  document.getElementById("apellidosClientesMod").value = apellidosClientes;
  document.getElementById("telefonoClientesMod").value = telefonoClientes;
  document.getElementById("direccionClientesMod").value = direccionCliente;
  document.getElementById("ciudadClientesMod").value = ciudadClientes;
  document.getElementById("correoClientesMod").value = correoClientes;
}

function modClientes(){
  let nombreCliente = document.getElementById("nombreClientesMod").value;
  let apellidosCliente = document.getElementById("apellidosClientesMod").value;
  let telefonoCliente = document.getElementById("telefonoClientesMod").value;
  let direccionCliente = document.getElementById("direccionClientesMod").value;
  let ciudadCliente = document.getElementById("ciudadClientesMod").value;
  let correoCliente = document.getElementById("correoClientesMod").value;

  if(nombreCliente != "" || apellidosCliente != "" || direccionCliente != "" || ciudadCliente != "" || correoCliente  != ""){ 
    if(telefonoCliente != ""){

      idFila = obetenerIDFila(btnPress);

      btnPress.cells[1].innerHTML = nombreCliente;
      btnPress.cells[2].innerHTML = apellidosCliente;
      btnPress.cells[3].innerHTML = telefonoCliente;
      btnPress.cells[4].innerHTML = direccionCliente;
      btnPress.cells[5].innerHTML = ciudadCliente;
      btnPress.cells[6].innerHTML = correoCliente;

      let data = {apellido: document.getElementById("apellidosClientesMod").value,
        ciudad: document.getElementById("ciudadClientesMod").value,
        direccion: document.getElementById("direccionClientesMod").value,
        email: document.getElementById("correoClientesMod").value,
        nombre: document.getElementById("nombreClientesMod").value,
        telefono: document.getElementById("telefonoClientesMod").value
      }

      fetch(API_URL+"/cliente/" + idFila, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(response => {
        console.log("Success", response);
        document.getElementById("nombreClientesMod").value;
        document.getElementById("apellidosClientesMod").value;
        document.getElementById("telefonoClientesMod").value;
        document.getElementById("direccionClientesMod").value;
        document.getElementById("ciudadClientesMod").value;
        document.getElementById("correoClientesMod").value;
      })
      .catch(err => console.log(err))

    }else{
      alert("El número de teléfono no es válido");
      let myModal = new bootstrap.Modal(document.getElementById("modClienteModal"));
      myModal.show();
    }
  }else{
    alert("Por favor, rellene bien los datos");
    let myModal = new bootstrap.Modal(document.getElementById("modClienteModal"));
    myModal.show();
    document.getElementById("nombreClientesMod").value = nombreCliente;
    document.getElementById("apellidosClientesMod").value = apellidosCliente;
    document.getElementById("telefonoClientesMod").value = telefonoCliente;
    document.getElementById("direccionClientesMod").value = direccionCliente;
    document.getElementById("ciudadClientesMod").value = ciudadCliente;
    document.getElementById("correoClientesMod").value = correoCliente;
  }
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
  cell3.innerHTML = formato(id_prop);
  cell4.innerHTML = tipo;
  cell5.innerHTML = raza;
  cell6.innerHTML = fecha;
  cell7.classList.add("justify-content-center");
  creacionBotones(tableMascotas, modalModMascotas, "modMascotasModal");
}

// MODIFICAR INFORMACIÓN MASCOTAS
function modalModMascotas(){
  let rowID = event.target.parentNode.parentNode;
  btnPress = rowID;
  let nombreMascotas = rowID.cells[1].innerHTML;
  let cedDueñoMascotas = rowID.cells[2].innerHTML;
  let tipoMascotas = rowID.cells[3].innerHTML;
  let razaMascotas = rowID.cells[4].innerHTML;
  let nacimientoMascotas = new Date(rowID.cells[5].innerHTML);
  let dia = nacimientoMascotas.getDate();
  dia = dia + "";
  let mes = nacimientoMascotas.getMonth() + 1;
  mes = mes + "";
  let año = nacimientoMascotas.getFullYear();
  if(dia.length < 2){
    dia = "0" + dia;
  }
  if(mes.length < 2){
    mes = "0" + mes;
  }
  let fecha = año + "-" + dia + "-" + mes;
  document.getElementById("nombreMascotasMod").value = nombreMascotas;
  document.getElementById("cedDueñoMascotasMod").value = limpiarID(cedDueñoMascotas);
  document.getElementById("tipoMascotasMod").value = tipoMascotas;
  document.getElementById("razaMascotasMod").value = razaMascotas;
  document.getElementById("nacimientoMascotasMod").value = fecha;
}

function modMascotas(){

  let fecha = new Date(document.getElementById("nacimientoMascotasMod").value);
  let dia = fecha.getDate() + 1;
  let mes = fecha.getMonth() + 1;
  let año = fecha.getFullYear();
  let nacimiento = año + "-" + mes + "-" + dia + "T00:00:00.000000";
  fechaSinFormato = dia + "/" + mes + "/" + año;

  let nombreMascota = document.getElementById("nombreMascotasMod").value;
  let cedDueñoMascota = limpiarID(document.getElementById("cedDueñoMascotasMod").value);
  let tipoMascota = document.getElementById("tipoMascotasMod").value;
  let razaMascotas = document.getElementById("razaMascotasMod").value;
  let nacimientoMascotas = fechaSinFormato;

  if(nombreMascota != "" || tipoMascota != "" || razaMascotas != ""){ 
    if(cedDueñoMascota != ""){

      idFila = obetenerIDFila(btnPress);

      btnPress.cells[1].innerHTML = nombreMascota;
      btnPress.cells[2].innerHTML = formato(cedDueñoMascota);
      btnPress.cells[3].innerHTML = tipoMascota;
      btnPress.cells[4].innerHTML = razaMascotas;
      btnPress.cells[5].innerHTML = nacimientoMascotas;

      let data = {fecha_nacimiento: nacimiento,
        id_propietario: cedDueñoMascota,
        nombre: document.getElementById("nombreMascotasMod").value,
        raza: document.getElementById("razaMascotasMod").value,
        tipo: document.getElementById("tipoMascotasMod").value
      }

      fetch(API_URL+"/mascota/" + idFila, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(response => {
        console.log("Success", response);
        document.getElementById(nombreMascota).value = "";
        document.getElementById(cedDueñoMascota).value = "";
        document.getElementById(tipoMascota).value = "";
        document.getElementById(razaMascotas).value = "";
      })
      .catch(err => console.log(err))

    }else{
      alert("El número de la cédula del dueño no es válido");
      let myModal = new bootstrap.Modal(document.getElementById("modClienteModal"));
      myModal.show();
    }
  }else{
    alert("Por favor, rellene bien los datos");
    let myModal = new bootstrap.Modal(document.getElementById("modClienteModal"));
    myModal.show();
    document.getElementById("nombreMascotasMod").value = nombreMascota;
    document.getElementById("tipoMascotasMod").value = tipoMascota;
    document.getElementById("razaMascotasMod").value = razaMascotas;
  }
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
  cell1.innerHTML = formato(id);
  cell2.innerHTML = nombre;
  cell3.innerHTML = apellido
  cell4.innerHTML = telefono;
  cell5.innerHTML = direccion;
  cell6.innerHTML = role;
  cell7.innerHTML = formato(ventas);
  cell8.classList.add("justify-content-center");
  creacionBotones(tableEmpleados, modalModEmpleados, "modEmpleadosModal");
}

// MODIFICAR INFORMACIÓN EMPLEADOS
function modalModEmpleados(){
  let rowID = event.target.parentNode.parentNode;
  btnPress = rowID;
  let nombreEmpleado = rowID.cells[1].innerHTML;
  let apellidoEmpleado = rowID.cells[2].innerHTML;
  let telefonoEmpleado = rowID.cells[3].innerHTML;
  let direccionEmpleado = rowID.cells[4].innerHTML;
  let cargoEmpleado = rowID.cells[5].innerHTML;
  document.getElementById("nombreEmpleadosMod").value = nombreEmpleado;
  document.getElementById("apellidoEmpleadosMod").value = apellidoEmpleado;
  document.getElementById("telefonoEmpleadosMod").value = telefonoEmpleado;
  document.getElementById("direccionEmpleadosMod").value = direccionEmpleado;
  let indicesSelectCargoMod = document.getElementById("cargoEmpleadosMod").length;
  let y = document.getElementById("cargoEmpleadosMod").options;
  let a = 0;
  for (let i=0; i<indicesSelectCargoMod; i++) {
    if(y[i].text == cargoEmpleado){
      a = i;
      break;
    }
  }
  document.getElementById("cargoEmpleadosMod").selectedIndex = a;
}

function modEmpleados(){
  let nombreEmpleado = document.getElementById("nombreEmpleadosMod").value;
  let apellidoEmpleado = document.getElementById("apellidoEmpleadosMod").value;
  let telefonoEmpleado = document.getElementById("telefonoEmpleadosMod").value;
  let direccionEmpleado = document.getElementById("direccionEmpleadosMod").value;
  let x = document.getElementById("cargoEmpleadosMod").selectedIndex;
  let y = document.getElementById("cargoEmpleadosMod").options;
  let cargoEmpleado = y[x].text;
  let ventasT = limpiarID(btnPress.cells[6].innerHTML);

  if(nombreEmpleado != "" || apellidoEmpleado != "" || direccionEmpleado != "" || cargoEmpleado != ""){ 
    if(telefonoEmpleado != ""){

      idFila = obetenerIDFila(btnPress);

      btnPress.cells[1].innerHTML = nombreEmpleado;
      btnPress.cells[2].innerHTML = apellidoEmpleado;
      btnPress.cells[3].innerHTML = telefonoEmpleado;
      btnPress.cells[4].innerHTML = direccionEmpleado;
      btnPress.cells[5].innerHTML = cargoEmpleado;

      let data = {apellido: apellidoEmpleado,
        direccion: direccionEmpleado,
        nombre: nombreEmpleado,
        role: cargoEmpleado,
        telefono: telefonoEmpleado,
      }

      fetch(API_URL+"/empleado/" + idFila, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(response => {
        console.log("Success", response);
        document.getElementById("nombreEmpleadosMod").value = "";
        document.getElementById("apellidoEmpleadosMod").value = "";
        document.getElementById("telefonoEmpleadosMod").value = "";
        document.getElementById("direccionEmpleadosMod").value = "";
        document.getElementById("cargoEmpleadosMod").selectedIndex = 0;
      })
      .catch(err => console.log(err))

    }else{
      alert("El número de teléfono no es válido");
      let myModal = new bootstrap.Modal(document.getElementById("modClienteModal"));
      myModal.show();
    }
  }else{
    alert("Por favor, rellene bien los datos");
    let myModal = new bootstrap.Modal(document.getElementById("modClienteModal"));
    myModal.show();
    document.getElementById("nombreClientesMod").value = nombreCliente;
    document.getElementById("apellidosClientesMod").value = apellidosCliente;
    document.getElementById("telefonoClientesMod").value = telefonoCliente;
    document.getElementById("direccionClientesMod").value = direccionCliente;
    document.getElementById("ciudadClientesMod").value = ciudadCliente;
    document.getElementById("correoClientesMod").value = correoCliente;
  }
}

// ------------------- FACTURAS -------------------

// AGREGAR FACTURAS A LA TABLA
function agregarFacturas(id, id_cliente, id_empleado, fecha){

  fetch(API_URL + "/factura/details/" + id)
  .then(res => res.json())
  .then(data => {
    let details = Object.values(data);

    let totalFactura = 0;

    for(let i=0; i<details[0].length; i++){
      let cant_Producto = details[0][i].cantidad;
      let precio_Producto = details[2][i].precio;
      totalFactura += cant_Producto * precio_Producto;
    }

    let row = tableFacturas.insertRow();
    row.classList.add("align-middle");
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    cell1.innerHTML = formato(id);
    cell2.innerHTML = formato(id_cliente);
    cell3.innerHTML = formato(id_empleado);
    cell4.innerHTML = fecha;
    cell5.innerHTML = "$" + formato(totalFactura);
    cell6.classList.add("justify-content-center");
    creacionBotonesDet(tableFacturas, modalVisDetallesFacturas, "visDetallesFacturasModal");

    })
    .catch(err => console.log(err))
}

// VISUALIZAR DETALLES DE LA FACTURA
function modalVisDetallesFacturas(){

  let bodyModalDetalles = document.getElementById("divDetallesFact");
  let rowID = event.target.parentNode.parentNode;
  let idFactura = parseInt(rowID.cells[0].innerHTML);
  fetch(API_URL + "/factura/details/" + idFactura)
  .then(res => res.json())
  .then(data => {
    let details = Object.values(data);;
    details[0].sort(sortOrder("id_producto"));
    let totalFactura = 0;

    for(let i=0; i<details[0].length; i++){
      let id_Producto = details[0][i].id_producto;
      let name_Producto = details[2][i].nombre;
      let cant_Producto = details[0][i].cantidad;
      let precio_Producto = details[2][i].precio;
      totalFactura += cant_Producto * precio_Producto;

      let pIDProducto = document.createElement("p");
      let pNombreProducto = document.createElement("p");
      let pCantidadProducto = document.createElement("p");
      let pPrecioProducto = document.createElement("p");
      
      let sID = document.createElement("strong");
      let sName = document.createElement("strong");
      let sCant = document.createElement("strong");
      let sPrecio = document.createElement("strong");

      sID.innerHTML = "ID Producto: ";
      pIDProducto.style.marginBottom = "-5px";
      sName.innerHTML = "Nombre: ";
      pNombreProducto.style.marginBottom = "-5px";
      sCant.innerHTML = "Cantidad: ";
      pCantidadProducto.style.marginBottom = "-5px";
      sPrecio.innerHTML = "Precio: ";

      let labelIDProducto = document.createElement("label");
      labelIDProducto.innerHTML = id_Producto;
      let labelNombreProducto = document.createElement("label");
      labelNombreProducto.innerHTML = name_Producto;
      let labelCantidadProducto = document.createElement("label");
      labelCantidadProducto.innerHTML = cant_Producto;
      let labelPrecioProducto = document.createElement("label");
      labelPrecioProducto.innerHTML = "$" + formato(precio_Producto);

      bodyModalDetalles.appendChild(pIDProducto);
      pIDProducto.appendChild(sID);
      pIDProducto.appendChild(labelIDProducto);
      bodyModalDetalles.appendChild(pNombreProducto);
      pNombreProducto.appendChild(sName);
      pNombreProducto.appendChild(labelNombreProducto);
      bodyModalDetalles.appendChild(pCantidadProducto);
      pCantidadProducto.appendChild(sCant);
      pCantidadProducto.appendChild(labelCantidadProducto);
      bodyModalDetalles.appendChild(pPrecioProducto);
      pPrecioProducto.appendChild(sPrecio);
      pPrecioProducto.appendChild(labelPrecioProducto);

    }

    let pTotalFactura = document.createElement("p");
    let sTotal = document.createElement("strong");
    sTotal.innerHTML = "Total: ";
    pTotalFactura.style.marginTop = "10px";
    let labelTotalFactura = document.createElement("label");
    labelTotalFactura.innerHTML = "$" + formato(totalFactura);

    bodyModalDetalles.appendChild(pTotalFactura);
    pTotalFactura.appendChild(sTotal);
    pTotalFactura.appendChild(labelTotalFactura);
    

  })
  .catch(err => console.log(err))

  document.getElementById("divDetallesFact").innerHTML = "";
}

// ------------------- ELIMINACION -------------------

// ELIMINAR DATO DE LA TABLA Y DE LA BASE DE DATOS
function borrarDato(){
  let tabla = (event.target.parentNode.parentNode.parentNode.parentNode).id;
  let bodyTabla = (event.target.parentNode.parentNode.parentNode).id;
  let rowID = event.target.parentNode.parentNode;
  idFila = obetenerIDFila(rowID);
  tabla = tabla.replace("table", "");
  tabla = tabla.toLowerCase();
  tabla = tabla.substring(0, tabla.length - 1);
  let idDatoDel = limpiarID(rowID.cells[0].innerHTML);
  let nombreCompletoDatoDel = rowID.cells[1].innerHTML;;
  if(tabla == "cliente" || tabla == "empleado"){
    let apeDatoDel = rowID.cells[2].innerHTML;
    nombreCompletoDatoDel = nombreCompletoDatoDel + " " + apeDatoDel;
  }  
  let opcion = confirm("¿Está seguro que desea borrar " + tabla + " " + nombreCompletoDatoDel + "?");
  if (opcion == true) {
    fetch(API_URL + "/" + tabla + "/delete/" + idFila, {
        method: "DELETE",
      })
      .then(res => res.json())
      .then(response => {
        var myModal = new bootstrap.Modal(document.getElementById("confElimModal"));
        myModal.show();
        rowID.remove();
        if(tabla == "cliente"){
          tableMascotas.innerHTML = "";
          getMascotas();
        }
      });
  }
}

// ELIMINAR FILA
function obetenerIDFila(filaAMod){
  return limpiarID(filaAMod.cells[0].innerHTML);
}

getProductos();
getClientes();
getMascotas();
getEmpleados();
getFacturas();