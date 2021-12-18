let formulario = document.getElementById("formulario");
deleteCookie();

formulario.addEventListener('submit', function(e){
  e.preventDefault();

  let datos = new FormData(formulario);
  let id = parseInt(datos.get("Cedula"));

  let data = {username: parseInt(datos.get("Cedula")),
    password: datos.get("pass")
  };

  if(getCookie("usuario") != null){
    document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  document.cookie = "usuario = " + datos.get("Cedula") + "; path = /";

  fetch(API_URL+"/login", {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }

  }).then(res => res.json())
  .then(response => {
    fetch(API_URL + "/empleado/" + id)
    .then(res => res.json())
    .then(data => {
      if(data.role == "superusuario"){
        document.getElementById("Cedula").value = "";
        document.getElementById("Contra").value = "";
        let url = window.location.href;
        url = "hub.html";
        window.location = url;
      }else{
        document.getElementById("Cedula").value = "";
        document.getElementById("Contra").value = "";
        let url = window.location.href;
        url = "hubEmpleado.html";
        window.location = url;
      }
    })
    .catch(err => console.log(err))
  })
  .catch(err => {
    let myModal = new bootstrap.Modal(document.getElementById("datosIncorrectos"));
    document.getElementById("errorDatosIncorrectos").innerHTML = err;
    myModal.show();
  })
})