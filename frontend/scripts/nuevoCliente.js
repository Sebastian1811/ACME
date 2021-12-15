function mostrarDatos(){
  var name = document.getElementById("nombres").value;
  var surname = document.getElementById("apellidos").value;
  var nombreCompleto = name + " " + surname;
  var id = parseInt(document.getElementById("cedula").value);
  var idFormateado = formato(id);
  document.getElementById("modalNombres").innerHTML = nombreCompleto;
  document.getElementById("modalCedula").innerHTML = idFormateado;
}