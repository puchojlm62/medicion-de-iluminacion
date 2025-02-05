//Con esta rutina se genera la tabla
document.addEventListener("DOMContentLoaded", function() {
  let tbody = document.querySelector("#tabla tbody");
  for (let i = 0; i < 10; i++) {
      let fila = document.createElement("tr");
      for (let j = 0; j < 5; j++) {
          let celda = document.createElement("td");
          celda.textContent = ""; // Celdas vacías por defecto
          celda.setAttribute("contenteditable", "true");
          fila.appendChild(celda);
      }
      tbody.appendChild(fila);
  }
});

//Esta funciòn borra los valores de la tabla de la página mediciones
function borrarTabla() {
  let celdas = document.querySelectorAll("#tabla tbody td");
  celdas.forEach(celda => {
      celda.textContent = "";
  });

  document.getElementById("nroMediciones").textContent = "-";
  document.getElementById("emedio").textContent = "-";
  document.getElementById("minimo").textContent = "-";
  document.getElementById("ilum-general").textContent = "";
  document.getElementById("uniformidad").textContent = "";
  document.querySelector('#nivel-iluminacion-requerido').value = '';
}



//Esta función determina el numero de puntos mínimo a medir en la página index.html
function calcular() {
     
    largo = parseFloat(document.getElementById('largo').value);
    if (isNaN(largo) || (largo<=0)){
      limpiarCajasResultados();
      alert('La expresión ingresada en Largo no es válida o es menor o igual a 0. Vuelva a ingresar el valor');
      return;      
    }
    ancho = parseFloat(document.getElementById('ancho').value);
    if (isNaN(ancho) || (ancho<=0)) {
      limpiarCajasResultados();
      alert('La expresión ingresada en ancho no es válida o es menor o igual a 0. Vuelva a ingresar el valor');
      return ;     
    }
    altura = parseFloat(document.getElementById('luminaria').value);
    if (isNaN(altura) || (altura<=0)){
      limpiarCajasResultados();
      alert('La expresión ingresada en Altura de las luminarias no es válida o es menor o igual a 0. Vuelva a ingresar el valor');
      return;     
    }
     //Calcula el valor índice local
    indiceLocal = ancho * largo / (altura * (ancho + largo));
    if (indiceLocal <= 3) {
      indiceLocalAdoptado = Math.trunc(indiceLocal) + 1;
    } else {
      indiceLocalAdoptado = 4;
    }
   // Nùmero de puntos mínimos de medición
    numeroPuntos = (indiceLocalAdoptado + 2) * (indiceLocalAdoptado + 2);
    let parrafoIndice = document.getElementById('indice');
    let parrafoResultado = document.getElementById('resultado');
    parrafoIndice.innerHTML=`El índice del local es: ${indiceLocalAdoptado}`;
    parrafoResultado.innerHTML = `Puntos mínimos de medición: ${numeroPuntos}`;
    }

function limpiarCajasResultados(){
  let parrafoIndice = document.getElementById('indice');
  let parrafoResultado = document.getElementById('resultado');
  parrafoIndice.innerHTML=`El índice del local es: `;
  parrafoResultado.innerHTML = `Puntos mínimos de medición: `;
  return;
}

//Esta función lee los valores de la tabla en la página mediciones y realiza los cálculos de promedio y mínimo
 function leerTabla() {
  let mediciones = [];
  let celdas = document.querySelectorAll("#tabla tbody td");

  for (let celda of celdas) {
      let valor = celda.textContent.trim();

      // Si la celda está vacía, simplemente la ignoramos
      if (valor === "") {
          continue;
      }

      // Validación: verificar que el contenido sea un número real mayor a 0
      if (isNaN(valor) || parseFloat(valor) <= 0) {
          alert("Error: Todas las celdas con valores deben contener un número real mayor a 0.");
          celda.textContent = ""; // Borra el contenido de la celda con error
          // Posicionar el cursor en la celda con error
          celda.focus();
          //Borra los resltados en la página mediciones.html
          document.getElementById("nroMediciones").textContent = "";
          document.getElementById("emedio").textContent = "";
          document.getElementById("minimo").textContent = "";         
          return;
      }

      mediciones.push(parseFloat(valor));
  }

  let nroMediciones = mediciones.length;
  let emedio = nroMediciones > 0 ? (mediciones.reduce((a, b) => a + b, 0) / nroMediciones).toFixed(1) : "0.0";
  let minimo = nroMediciones > 0 ? Math.min(...mediciones).toFixed(1) : "0.0";

  //Escribe los resultados en la página mediciones.html
  document.getElementById("nroMediciones").textContent = nroMediciones;
  document.getElementById("emedio").textContent = emedio;
  document.getElementById("minimo").textContent = minimo;

  // Si el númro de mediciones es menor a 1 interrumpe el cálculo y da error
  if (nroMediciones<=0){
    alert("Ingrese en la tabla los valores medidos");
    return;
  }

  // Si la celda de iluminación requerido está vacía o se ingresó valores no numéricos, señala error
  nivelIluminacionRequerido = parseFloat(document.getElementById('nivel-iluminacion-requerido').value);
  if (isNaN(nivelIluminacionRequerido) || (nivelIluminacionRequerido<=0)) { 
    alert("Debe ingresar un valor de iluminación requerido para chequear el cumplimiento de la legislación");
    return;
  }
  parrafo = document.getElementById("ilum-general");
  if (emedio < nivelIluminacionRequerido) {
    parrafo.style.color = "red"; // Se vuelve rojo si la iluminación promedio es menor al requerido
    document.getElementById("ilum-general").textContent = "El nivel de iluminación general NO CUMPLE con la legislación vigente";
  } else {
    parrafo.style.color = "green"; // Se vuelve rojo si la iluminación promedio es menor al requerido
    document.getElementById("ilum-general").textContent = "El nivel de iluminación general CUMPLE con la legislación vigente";
  }

  parrafo = document.getElementById("uniformidad");
  if (minimo < emedio/2) {
    parrafo.style.color = "red"; // Se vuelve rojo si no cumple con la uniformidad
    document.getElementById("uniformidad").textContent = "El nivel de uniformidad NO CUMPLE con la legislación vigente";
  } else {
    parrafo.style.color = "green"; // Se vuelve verde si cumple con la uniformidad
    document.getElementById("uniformidad").textContent = "El nivel de uniformidad CUMPLE con la legislación vigente";
  }
}


// Declara las variables
let largo = 0;
let ancho = 0;
let altura = 0;
let numeroPuntos = 0;  // Esta variable almacena el valor de puntos minimos de medición
let indiceLocal = 0;
let indiceLocalAdoptado = 0;
let nivelIluminacionRequerido = 0;
let parrafo ="";


