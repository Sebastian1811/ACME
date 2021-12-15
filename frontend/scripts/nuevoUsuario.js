let botonRegistrar = document.getElementById("btnRegistar");
let formulario = document.getElementById("formEmpleado");
let botonConfirmar = document.getElementById("agregarEmpleado");

botonRegistrar.addEventListener("click", function(e){
  botonRegistrar.setAttribute("type", "submit");
  mostrarDatos();
})

function mostrarDatos(){
  formulario.addEventListener("submit", function(e){
    e.preventDefault();

    var myModal = new bootstrap.Modal(document.getElementById("empleadoModalCenter"));
    myModal.show();

    var name = document.getElementById("nombres").value;
    var surname = document.getElementById("apellidos").value;
    var nombreCompleto = name + " " + surname;
    var id = formato(parseInt(document.getElementById("cedula").value));
    var x = document.getElementById("cargo").selectedIndex;
    var y = document.getElementById("cargo").options;
    document.getElementById("modalNombres").innerHTML = nombreCompleto;
    document.getElementById("modalCedula").innerHTML = id;
    document.getElementById("modalCargo").innerHTML = y[x].text;
  })
}

function agregarEmpleado(){
  
  var datos = new FormData(formulario);

  var data = {apellido: datos.get("apellidos"),
    direccion: datos.get("direccion"),
    id: parseInt(datos.get("cedula")),
    id_tipo: "CC",
    nombre: datos.get("nombres"),
    role: datos.get("cargo"),
    telefono: datos.get("telefono"),
    password: datos.get("nombres"),
    ventasTotales: 0.0
  };

  fetch(API_URL+"/empleado", {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }

  }).then(res => res.json())
  .then(response => {
    console.log("Success", response)
    document.getElementById("cedula").value = "";
    document.getElementById("nombres").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("cargo").selectedIndex = 0;
  })
  .catch(err => console.log(erro))
}