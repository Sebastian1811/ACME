let formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function(e){
  e.preventDefault();
  
  let datos = new FormData(formulario);

  let data = {username: parseInt(datos.get('Cedula')),password: datos.get('pass')};

  fetch(API_URL+"/login", {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }

  }).then(res => res.json())
  .then(response => {
    document.getElementById('Cedula').value = "";
    document.getElementById('Contra').value = "";
    let url = window.location.href;
    url += "hub.html";
    window.location = url;
  })
  .catch(err => {
    let myModal = new bootstrap.Modal(document.getElementById("datosIncorrectos"));
    document.getElementById("errorDatosIncorrectos").innerHTML = err;
    myModal.show();
  })
})