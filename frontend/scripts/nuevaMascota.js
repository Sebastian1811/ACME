let botonRegistrar = document.getElementById("btnRegistrar");
let formulario = document.getElementById("formCliente");

// SORTEA EL JSON CON TODAS LAS MASCOTAS Y COLOCA UN ID QUE NO EXISTE
fetch(API_URL + "/mascotas")
.then(res => res.json())
.then(data => {
  let arrayMascotas = Object.values(data)[0];
  let tamArrayMasctoas = arrayMascotas.length
  arrayMascotas.sort(sortOrder("id"));
  document.getElementById("id").value = arrayMascotas[tamArrayMasctoas - 1].id + 1;
})
.catch(err => console.log(err))


// SE MUESTRAN LOS DATOS EN UN MODAL PARA CONFIRMAR
function mostrarDatos(){
  formulario.addEventListener("submit", function(e){
    e.preventDefault();

    let cedDueño = parseInt(document.getElementById("cedDueño").value);
    let tamCed = ("" + cedDueño).length;

    if(tamCed < 8){
      alert("El número de cédula del dueño no es válido");
    }else{
      fetch(API_URL + "/cliente/" + cedDueño)
      .then(res => res.json())
      .then(response => {
        var myModal = new bootstrap.Modal(document.getElementById("mascotasModalCenter"));
        myModal.show();

        var name = document.getElementById("nombre").value;
        var idDueño = formato(parseInt(document.getElementById("cedDueño").value));
        document.getElementById("modalNombreMascota").innerHTML = name;
        document.getElementById("modalCedulaDueño").innerHTML = idDueño;
      })
      .catch(err => {
        var myModal = new bootstrap.Modal(document.getElementById("cedNoEncontradaModalCenter"));
        myModal.show();
      })
    }
  })
}

// SE AGREGAN LOS DATOS DE MASCOTA A LA BASE DE DATOS
function agregarMascota(){
  
  var datos = new FormData(formulario);

  let fecha = new Date(document.getElementById("nacimiento").value);
  let dia = fecha.getDate() + 1;
  let mes = fecha.getMonth();
  let año = fecha.getFullYear();
  let nacimiento = año + "-" + mes + "-" + dia + "T00:00:00.000000"

  var data = {fecha_nacimiento: nacimiento,
    id: datos.get("id"),
    id_propietario: datos.get("cedDueño"),
    nombre: datos.get("nombre"),
    raza: datos.get("raza"),
    tipo: datos.get("tipo"),
  };

  fetch(API_URL+"/mascota", {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }

  }).then(res => res.json())
  .then(response => {
    console.log("Success", response)
    document.getElementById("id").value = "";
    document.getElementById("cedDueño").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("raza").value = "";
    document.getElementById("nacimiento").value = "";
  })
  .catch(err => console.log(err))
}