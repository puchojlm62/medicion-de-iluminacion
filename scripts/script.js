
//Este código valida que solo se ingresen numeros
// js/validacionDecimal.js
function validarNumeroReal(input) {
  let valor = input.value;

  // Eliminar caracteres no válidos
  valor = valor.replace(/[^0-9.,-]/g, '');

  // Permitir solo un signo menos al principio
  if (valor.indexOf('-') > 0) {
    valor = valor.replace(/-/g, '');
  }
  if (valor.startsWith('-') && valor.indexOf('-') !== valor.length -1) {
    valor = valor.replace(/-/g, '');
    valor = "-" + valor;
  }
  // Permitir solo una coma o punto
  const comaIndex = valor.indexOf(',');
  const puntoIndex = valor.indexOf('.');

  if (comaIndex !== -1 && puntoIndex !== -1) {
    // Si hay ambos, eliminar el segundo
    valor = valor.slice(0, Math.max(comaIndex, puntoIndex)) + valor.slice(Math.max(comaIndex, puntoIndex) + 1);
  } else if (comaIndex !== -1) {
    // Si hay coma, reemplazarla por punto
    valor = valor.replace(',', '.');
  }

  // Limitar a dos decimales
  const puntoIndexFinal = valor.indexOf('.');
  if (puntoIndexFinal !== -1 && valor.length > puntoIndexFinal + 3) {
    valor = valor.slice(0, puntoIndexFinal + 3);
  }

  input.value = valor;
}


function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("activo");
}

/* para abrir y cerrar el modal */
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalAcerca");
    const openModal = document.getElementById("openModal");
    const closeModal = document.querySelector(".close");

    // Abrir el modal al hacer clic en el enlace
    openModal.addEventListener("click", function (event) {
        event.preventDefault(); // Evita que el enlace recargue la página
        modal.style.display = "block";
    });

    // Cerrar el modal al hacer clic en la "X"
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Cerrar el modal si el usuario hace clic fuera del contenido
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});


window.addEventListener('DOMContentLoaded', (event) => {
  const inputs = {
    largo: document.getElementById('largo'),
    ancho: document.getElementById('ancho'),
    luminaria: document.getElementById('luminaria')
  };

  for (const key in inputs) {
    const boton = document.getElementById(`boton${key.charAt(0).toUpperCase() + key.slice(1)}`);
    if (boton && inputs[key]) {
      boton.addEventListener('click', () => startRecognition(key));
    } else {
      console.error(`No se encontró el botón o input para ${key}.`);
    }
  }

  let streamActivo = null; // Variable para almacenar el MediaStream activo

  function startRecognition(inputId) {
    if (streamActivo && streamActivo.active) { // Verifica si el stream está activo
      console.log("Usando MediaStream activo.");
      iniciarReconocimiento(streamActivo, inputId);
    } else {
      console.log(`Intentando acceder al micrófono para ${inputId}...`);
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          console.log("Permiso concedido:", stream);
          streamActivo = stream; // Guarda el MediaStream activo
          iniciarReconocimiento(stream, inputId);
        })
        .catch(err => {
          console.error("Error al acceder al micrófono:", err);
          inputs[inputId].placeholder = "Permiso de micrófono denegado o error: " + err.message;
        });
    }
  }

  function iniciarReconocimiento(stream, inputId) {
    const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (recognition && typeof recognition === 'function') {
      console.log("API de reconocimiento de voz encontrada:", recognition);
      const recognizer = new recognition();
      recognizer.lang = 'es-ES';

      recognizer.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        inputs[inputId].value = transcript;
      };

      recognizer.onerror = (event) => {
        console.error("Error en el reconocimiento de voz:", event.error);
        inputs[inputId].placeholder = "Error: " + event.error;
      };

      recognizer.onstart = () => {
        console.log("Reconocimiento de voz iniciado.");
      };

      recognizer.onend = () => {
        console.log("Reconocimiento de voz finalizado.");
      };

      recognizer.start();
    } else {
      console.error("Reconocimiento de voz no compatible o no inicializado correctamente.");
      inputs[inputId].placeholder = "Reconocimiento de voz no compatible.";
    }
  }
});