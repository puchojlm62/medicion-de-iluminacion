
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