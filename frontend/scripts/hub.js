window.onload = function(){
  checkCookie();
  fetch(API_URL + "/empleado/" + parseInt(getCookie("usuario")))
  .then(res => res.json())
  .then(data => {
    if(data.role != "superusuario"){
      alert("No deberías estar aqui");
      location.href = "hubEmpleado.html";
    }else{
      let nombreCompleto = data.nombre + " " + data.apellido;
      document.getElementById("bienvenido").innerHTML += ", " + nombreCompleto;
    }
  })
  .catch(err => console.log(err))
};