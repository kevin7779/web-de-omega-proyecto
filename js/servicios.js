document.addEventListener("DOMContentLoaded", () => {
  // Animación suave de las tarjetas de servicios
  const tarjetasServicios = document.querySelectorAll(".servicio-card");
  tarjetasServicios.forEach((tarjeta, index) => {
    tarjeta.style.opacity = "0";
    tarjeta.style.transform = "translateY(25px)";
    tarjeta.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    tarjeta.style.transitionDelay = `${index * 0.12}s`;

    setTimeout(() => {
      tarjeta.style.opacity = "1";
      tarjeta.style.transform = "translateY(0)";
    }, 150);
  });
});
function abrirModal(id) {
          const modal = document.getElementById(id);
          if (modal) {
              modal.style.display = "flex";
              setTimeout(() => {
                  modal.classList.add("active");
              }, 10);
          }
      }

      function cerrarModal(id) {
          const modal = document.getElementById(id);
          if (modal) {
              modal.classList.remove("active");
              setTimeout(() => {
                  modal.style.display = "none";
              }, 300);
          }
      }

      document.querySelectorAll('.modal-overlay').forEach(overlay => {
          overlay.addEventListener('click', function(e) {
              if (e.target === this) {
                  cerrarModal(this.id);
              }
          });
      });
