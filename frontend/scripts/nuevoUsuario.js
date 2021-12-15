function mostrarDatos(){
  var name = document.getElementById("nombres").value;
  var surname = document.getElementById("apellidos").value;
  var nombreCompleto = name + " " + surname;
  var id = formato(parseInt(document.getElementById("cedula").value));
  var x = document.getElementById("cargo").selectedIndex;
  var y = document.getElementById("cargo").options;
  document.getElementById("modalNombres").innerHTML = nombreCompleto;
  document.getElementById("modalCedula").innerHTML = id;
  document.getElementById("modalCargo").innerHTML = y[x].text;
}