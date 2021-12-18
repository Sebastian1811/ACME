var API_URL = "https://acme-backend1.herokuapp.com"; //https://acme-backend1.herokuapp.com/   http://localhost:5000

// CREACION BOTONES EN INVENTARIO
function creacionBotones(tabla, funcion, modal){
  let tbodyRowCount = tabla.rows.length - 1;
  let tbodyCellsCount = tabla.rows[tbodyRowCount].cells.length - 1;
  let celda = tabla.rows[tbodyRowCount].cells[tbodyCellsCount];
  let btnMod = document.createElement("button");
  let btnEli = document.createElement("button");
  btnMod.innerHTML = "Modificar";
  btnMod.className = "btn btn-warning";
  btnMod.style.marginRight = "5px";
  btnEli.innerHTML = "Eliminar";
  btnEli.className = "btn btn-danger";
  celda.appendChild(btnMod);
  celda.appendChild(btnEli);
  btnMod.onclick = funcion;
  btnMod.setAttribute("data-bs-toggle", "modal");
  btnMod.setAttribute("data-bs-target", "#" + modal);
  btnEli.onclick = borrarDato;
}

// CREACION BOTONES PARA DETALLES DE FACTURAS
function creacionBotonesDet(tabla, funcion, modal){
  let tbodyRowCount = tabla.rows.length - 1;
  let tbodyCellsCount = tabla.rows[tbodyRowCount].cells.length - 1;
  let celda = tabla.rows[tbodyRowCount].cells[tbodyCellsCount];
  let btnDet = document.createElement("button");
  let btnEli = document.createElement("button");
  btnDet.innerHTML = "Detalles";
  btnDet.className = "btn btn-success";
  btnDet.style.marginRight = "5px";
  btnEli.innerHTML = "Eliminar";
  btnEli.className = "btn btn-danger";
  celda.appendChild(btnDet);
  celda.appendChild(btnEli);
  btnDet.onclick = funcion;
  btnDet.setAttribute("data-bs-toggle", "modal");
  btnDet.setAttribute("data-bs-target", "#" + modal);
  btnEli.onclick = borrarDato;
}

// DAR FORMATO A NUMEROS
function formato(numero){
  if(numero < 1000){
    return String(numero);
  }else if(numero < 1000000){
    return formatoMil(numero);
  }else if(numero < 1000000000){
    return formatoMillon(numero);
  }else{
    return formatoMilMillon(numero);
  }
}

// DAR FORMATO DE MIL
function formatoMil(numero){
  string = numero.toString();
  let posPunto = string.length % 3;
  if(posPunto == 0){
    string = string.substring(0, posPunto+3) + "." + string.substring(posPunto+3, string.length);
  }else{
    string = string.substring(0, posPunto) + "." + string.substring(posPunto, string.length);
  }
  return string;
}

// DAR FORMATO DE MILLON
function formatoMillon(numero){
  string = numero.toString();
  let posPunto = string.length % 3;
  if(posPunto == 0){
    string = string.substring(0, posPunto+3) + "." + string.substring(posPunto+3, posPunto+6) + "." + string.substring(posPunto+6, string.length);
  }else{
    string = string.substring(0, posPunto) + "." + string.substring(posPunto, posPunto+3) + "." + string.substring(posPunto+3, string.length);
  }
  return string;
}

// DAR FORMATO DE MIL MILLON
function formatoMilMillon(numero){
  string = numero.toString();
  let posPunto = string.length % 3;
  if(posPunto == 0){
    string = string.substring(0, posPunto+3) + "." + string.substring(posPunto+3, posPunto+6) + "." + string.substring(posPunto+6, posPunto+9) + "." + string.substring(posPunto+9, string.length);
  }else{
    string = string.substring(0, posPunto) + "." + string.substring(posPunto, posPunto+3) + "." + string.substring(posPunto+3, posPunto+6) + "." + string.substring(posPunto+6, string.length);
  }
  return string;
}

// CONVIERTE EL STRING DE UN PRECIO A UN NUMERO ENTERO
function limpiarNumero(string){
  let valor = string;
  valor = valor.slice(1);
  valor = valor.replace(",", "");
  let cantidadPuntos = (valor.match(/\./g)).length;
  for(let i = 0; i<cantidadPuntos; i++){
    valor = valor.replace(".", "");
  }
  valor = parseInt(valor);
  return valor
}

// CONVIERTE EL STRING DE UNA CEDULA, O ID, A UN NUMERO ENTERO
function limpiarID(string){
  let valor = string;
  if(valor.match(/\./g) != null){
    let cantidadPuntos = (valor.match(/\./g)).length;
    for(let i = 0; i<cantidadPuntos; i++){
      valor = valor.replace(".", "");
    }
  }
  valor = parseInt(valor);
  return valor
}

// SORTEA UN JSON EN FORMA ASCENDENTE DE UN ATRIBUTO
function sortOrder(atributo){
  return function(a, b) {    
      if (a[atributo] > b[atributo]) {    
        return 1;    
      }else if (a[atributo] < b[atributo]) {    
        return -1;    
      } 
      return 0;    
  }
}

// CONSEGUIR COOKIE DE LA SESIÓN
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

// VERIFICA SI HAY COOKIE EN EL NAVEGADOR
function checkCookie() {
  if(getCookie("usuario") == "") {
    alert("No estas logeado");
    window.location.href = "..";
  }
};

// BORRA LA COOKIE DE LA SESIÓN
function deleteCookie() {
  document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

function volver(){
  fetch(API_URL + "/empleado/" + parseInt(getCookie("usuario")))
  .then(res => res.json())
  .then(data => {
    if(data.role != "superusuario"){
      location.href = "hubEmpleado.html";
    }else{
      location.href = "hub.html";
    }
  })
}