/**
  Un fichero de prueba para el examen
  @author Pablo Ceballos Benitez
*/

let div = document.getElementById("divError")

var textoMulta = [
      "Aparcar en zona prohibida",
      "Dañar un vehiculo",
      "No llevar puesta la matricula trasera",
      "No encender luz de corto alcance en tunel",
      "Sobrepasar el limite de velocidad",
      "Huir de la policia",
      "Tener neumaticos caducados",
      "Conducir usando un dispositivo movil sin manos libres",
      "Lanzar objetos que pueden poner en peligro en la carretera",
      "Darle un infarto a la señora con el claxon"
]

/**
  Funcion para saber si la fecha existe o no
  @return {boolean} Indica si estamos en el futuro o no
*/
function esFuturo(){
  var fechaActual = new Date()
  var fechaIntroducida = new Date(document.getElementById("iFecha").value)

  if(fechaIntroducida > fechaActual)
    return true
  else
    if(fechaIntroducida <= fechaActual)
      return false

}

/**
  Funcion para validar todos los campos del formulario
  Si fallan los datos introducidos manda a la funcion mostrarError
  Si los datos son correctos manda a la funcion crearRespuesta
  @param {string} e Contiene el texto de error
*/
function validarFormulario(){

  try{
    var regExpMatricula = /^([A-Z]{3})?[-]\d{4}$/    /*/^[A-Z]{3}-[0-9]{4}$/*/
    var matricula = document.getElementById("iMatricula").value
    if (!regExpMatricula.test(matricula)) throw 'Formato de Matricula incorrecto.'
    if(esFuturo() == undefined) throw 'Introduce una fecha'
    if(esFuturo() == true) throw 'Introduce una fecha valida'
    var localidad = document.getElementById("iLocalidad").value
    if(localidad == "") throw 'La localidad no puede quedar vacia'

    crearRespuesta()
  }
  catch (e){
    mostrarError(e)
  }
}

/**
  Funcion para crear respuesta en caso de que los datos esten correctos
  @param {string} textoMulta Contiene el texto aleatorio del motivo de multa
  @param {string} random Genera numero aleatorio de 1 al 5
*/
function crearRespuesta(){
  div.style.display = "none"
  borrarElementosTabla()
  var tabla = document.getElementById("iTabla")
  for(let i = 0; i<= random(1,10)-1; i++)
  {
    var result = new Resultado(textoMulta[i],random(1,5))
    var fila = document.createElement("tr")
    fila.classList.add("cfilas")
    var celda = document.createElement("td")
    var textocelda = document.createTextNode(result.concepto)
    var celda2 = document.createElement("td")
    var textocelda2 = document.createTextNode("      Multas   " + result.numMultas)
    celda.appendChild(textocelda)
    celda2.appendChild(textocelda2)
    fila.appendChild(celda)
    fila.appendChild(celda2)
    tabla.appendChild(fila)
    celda.style.padding = "5px"
    celda2.style.padding = "5px"
  }
}


/**
  Funcion que muestra error
  @param {string} texto para mostrar error
*/

function mostrarError(texto){
  let pError = document.getElementById("pError")
  pError.innerHTML=""
  pError.appendChild(document.createTextNode(texto))
  div.style.display = "block"
  borrarElementosTabla()
}


/**
  Funcion que se encarga de rellenar la localidad al tener una provincia seleccionada
*/
function ponerLocalidad(){
  var provincia = document.getElementById("iProvincia").value
  var arrBa = ["Gevora","Sevilla","Almendralejo"]
  var arrCa = ["Coria","Plasencia","Navalmoral"]

  //Hora de rellenar
  var select = document.getElementById("iLocalidad")
  if(provincia == "Badajoz")
  {
    borrarElementosOptions()
    for(let i = 0; i<= 2; i++)
    {
      var option = document.createElement('option')
      option.value = arrBa[i]
      option.text = arrBa[i]
      select.appendChild(option)
    }
  }
  else{
    if(provincia == "Caceres")
    {
      borrarElementosOptions()
      for(let i = 0; i<= 2; i++)
      {
        var option = document.createElement('option')
        option.value = arrCa[i]
        option.text = arrCa[i]
        select.appendChild(option)
      }
    }
  }
}


/**
  Funcion que se encarga de borrar todos los elementos de provincias para no repetirse
*/
function borrarElementosOptions(){
  var select = document.getElementById("iLocalidad");
  var finSelect = select.options.length;
  for (i = finSelect-1; i >= 0; i--) {
    select.options[i] = null;
  }
}

/**
  Funcion que se encarga de borrar todos los elementos de multa al generar uno nuevo para que no se repita
*/
function borrarElementosTabla(){
  var tabla = document.getElementById("iTabla")
  if(tabla !== "undefined")
  {
    while(tabla.hasChildNodes())
    {
      tabla.removeChild(tabla.lastChild)
    }
  }
}

/**
  Funcion que genera numero aleatorio entre un minimo y un maximo
  @param {number} min Numero minimo para elegir 1 aleatorio
  @param {number} max Numero maximo para elegir 1 aleatorio
  @return {number} Retorna un numero aleatorio entre un minimo y un maximo
*/
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}











//
