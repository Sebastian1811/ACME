window.onload = function(){
  checkCookie();
};

let formulario = document.getElementById("formCliente");

// SE MUESTRAN LOS DATOS EN UN MODAL PARA CONFIRMAR
function mostrarDatos(){
  formulario.addEventListener("submit", function(e){
    e.preventDefault();

    let lenCed = (document.getElementById("cedula").value).length
    let lenTel = (document.getElementById("telefono").value).length
    let ced = parseInt(document.getElementById("cedula").value);
    let tel = parseInt(document.getElementById("telefono").value);
    let tamCed = ("" + ced).length;
    let tamTel = ("" + tel).length;
    

    if(lenCed != tamCed || ced > 1999999999){
      alert("El número de cédula no es válido");
    }else if(tamTel < 10 || lenTel != tamTel){
      alert("El número de teléfono no es válido");
    }else{
      var myModal = new bootstrap.Modal(document.getElementById("clientesModalCenter"));
      myModal.show();

      var name = document.getElementById("nombres").value;
      var surname = document.getElementById("apellidos").value;
      var nombreCompleto = name + " " + surname;
      var id = formato(parseInt(document.getElementById("cedula").value));
      document.getElementById("modalNombres").innerHTML = nombreCompleto;
      document.getElementById("modalCedula").innerHTML = id;
    }
  })
}

// SE AGREGAN LOS DATOS DE CLIENTE A LA BASE DE DATOS
function agregarCliente(){
  
  var datos = new FormData(formulario);

  var data = {apellido: datos.get("apellidos"),
    ciudad: datos.get("ciudad"),
    direccion: datos.get("direccion"),
    email: datos.get("email"),
    id: parseInt(datos.get("cedula")),
    id_tipo: "CC",
    nombre: datos.get("nombres"),
    telefono: datos.get("telefono")
  };

  fetch(API_URL+"/cliente", {
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
    document.getElementById("email").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("ciudad").value = "";
  })
  .catch(err => console.log(err))
}