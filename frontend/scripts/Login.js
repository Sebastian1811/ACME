// Para sacar la URL de la API, la variable se llama API_URL, está en funcExternas.js, es para no escribir la URL por todos lados.
// <script src="../scripts/funcExternas.js"></script>  <-- Eso es para que cargue la variable global y otras funciones por si las necesita, 
//			aunque no creo que sea necesario.

var formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function(e){
  e.preventDefault();
  console.log('click')
  
  var datos = new FormData(formulario);

  console.log(datos);
  document.getElementById('Cedula').value = "";
  document.getElementById('Contra').value = "";
  var data = {username: parseInt(datos.get('Cedula')),password: datos.get('pass')};

  console.log(data);
  fetch(API_URL+"/login", {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }

  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    console.log('Success:', response)
    window.location.href = "hub.html";
    location.reload();
  });

})


// Algo así es para enviar datos, el data lo hace concatenando lo que halla en usuario y contraseña y ya.
// La URL, lo que dije, solo es escribir API_URL.


