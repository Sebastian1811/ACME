var API_URL = "http://localhost:5000";

// DAR FORMATO A NUMEROS
function formato(numero){
  if(numero < 1000){
    return String(numero);
  }else if(numero < 1000000){
    return formatoMil(numero);
  }else if(numero < 1000000000){
    return formatoMillon(numero);
  }else{
    return formatoMilMillon(numero);
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
    string = string.substring(0, posPunto+3) + "." + string.substring(posPunto+3, posPunto+6) + "." + string.substring(posPunto+6, string.length);
  }else{
    string = string.substring(0, posPunto) + "." + string.substring(posPunto, posPunto+3) + "." + string.substring(posPunto+3, string.length);
  }
  return string;
}

// DAR FORMATO DE MIL
function formatoMilMillon(numero){
  string = numero.toString();
  let posPunto = string.length % 3;
  if(posPunto == 0){
    string = string.substring(0, posPunto+3) + "." + string.substring(posPunto+3, posPunto+6) + "." + string.substring(posPunto+6, posPunto+9) + "." + string.substring(posPunto+9, string.length);
  }else{
    string = string.substring(0, posPunto) + "." + string.substring(posPunto, posPunto+3) + "." + string.substring(posPunto+3, posPunto+6) + "." + string.substring(posPunto+6, string.length);
  }
  return string;
}

// CONVIERTE EL STRING DE UN PRECIO A UN NUMERO ENTERO
function limpiarNumero(string){
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

// SORTEA UN JSON EN FORMA ASCENDENTE DE UN ATRIBUTO
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
} 