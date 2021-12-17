window.onload = function() {
  fetch(API_URL + "/empleados" + ced)
.then(res => res.json())
.then(data => {
  let nombreCompleto = data.nombre + " " + data.apellido;
  document.getElementById("bienvenido").innerHTML += ", " + nombreCompleto;
})
.catch(err => console.log(err))
};