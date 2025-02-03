const hamburger = document.querySelector("#hamburguesa");
const enlaces= document.querySelector('#nav__links');



hamburger.addEventListener('click',() => {
    enlaces.classList.toggle('show')
});

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
   // Nùmero de puntos mìnimos de medición
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
}


// Declara las variables
let largo = 0;
let ancho = 0;
let altura = 0;
let numeroPuntos = 0;  // Esta variable almacena el valor de puntos minimos de medición
let indiceLocal = 0;
let indiceLocalAdoptado = 0;

