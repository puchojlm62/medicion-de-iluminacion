const hamburger = document.querySelector("#hamburguesa");
const enlaces= document.querySelector('#nav__links');



hamburger.addEventListener('click',() => {
    enlaces.classList.toggle('show')
});

//Esta función determina el numero de puntos mínimo a medir
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

// Declara las variables
let largo = 0;
let ancho = 0;
let altura = 0;
let numeroPuntos = 0;  // Esta variable almacena el valor de puntos minimos de medición
let indiceLocal = 0;
let indiceLocalAdoptado = 0;
