var API_URL = "http://localhost:5000";

// DAR FORMATO A NUMEROS
function formato(numero){
  if(numero < 1000){
    return String(numero);
  }else if(numero < 1000000){
    return formatoMil(numero);
  }else if(numero < 1000000000){
    return formatoMillon(numero);
  }
}

// DAR FORMATO DE MIL
function formatoMil(numero){
  string = numero.toString();
  let posPunto = string.length % 3;
  if(posPunto == 0){
    string = string.substring(0, posPunto+3) + "." + string.substring(posPunto+3, string.length);
  }else{
    string = string.substring(0, posPunto) + "." + string.substring(posPunto, string.length);
  }
  return string;
}

// DAR FORMATO DE MIL
function formatoMillon(numero){
  string = numero.toString();
  let posPunto = string.length % 3;
  if(posPunto == 0){
    string = string.substring(0, posPunto+3) + "." + string.substring(posPunto+3, string.length);
  }else{
    string = string.substring(0, posPunto) + "." + string.substring(posPunto, posPunto+3) + "." + string.substring(posPunto+3, string.length);
  }
  return string;
}

// CONVIERTE EL STRING DE UN PRECIO A UN NUMERO ENTERO
function limpiarPrecio(string){
  let valor = string;
  valor = valor.slice(1);
  valor = valor.replace(",", "");
  let cantidadPuntos = (valor.match(/./g)||[]).length;
  for(let i = 0; i<cantidadPuntos; i++){
    valor = valor.replace(".", "");
  }
  valor = parseInt(valor);
  return valor
}