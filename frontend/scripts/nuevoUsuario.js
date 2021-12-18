window.onload = function(){
  checkCookie();
  fetch(API_URL + "/empleado/" + parseInt(getCookie("usuario")))
  .then(res => res.json())
  .then(data => {
    if(data.role != "Superusuario"){
      alert("No deberías estar aqui");
      location.href = "hubEmpleado.html";
    }
  })
  .catch(err => console.log(err))
};

let formulario = document.getElementById("formEmpleado");

// SE MUESTRAN LOS DATOS EN UN MODAL PARA CONFIRMAR
function mostrarDatos(){
  formulario.addEventListener("submit", function(e){
    e.preventDefault();

    let tamCed = ("" + parseInt(document.getElementById("cedula").value)).length;
    let tamTel = ("" + parseInt(document.getElementById("telefono").value)).length;

    if(tamCed < 8 || document.getElementById("cedula").value > 1500000000){
      alert("El número de cédula no es válido");
    }else if(tamTel < 10){
      alert("El número de teléfono no es válido");
    }else{
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
    }    
  })
}

// SE AGREGAN LOS DATOS DE EMPLEADO A LA BASE DE DATOS
function agregarEmpleado(){
  
  var datos = new FormData(formulario);

  let contraseña = datos.get("nombres");
  contraseña = contraseña.toLowerCase();
  contraseña = contraseña.replace(/\s/g,'');

  var data = {apellido: datos.get("apellidos"),
    direccion: datos.get("direccion"),
    id: parseInt(datos.get("cedula")),
    id_tipo: "CC",
    nombre: datos.get("nombres"),
    role: datos.get("cargo"),
    telefono: datos.get("telefono"),
    password: contraseña,
    ventasTotales: 0.0
  };

  fetch(API_URL + "/empleado", {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }

  }).then(res => res.json())
  .then(response => {
    document.getElementById("cedula").value = "";
    document.getElementById("nombres").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("cargo").selectedIndex = 0;
  })
  .catch(err => {
    console.log(err);
    var myModal = new bootstrap.Modal(document.getElementById("empleadoErrorModalCenter"));
    myModal.show();
  })
}