document.addEventListener("DOMContentLoaded", () => {
  // Selecciona cualquier tarjeta dentro de la página de método de forma segura
  const cards = document.querySelectorAll(".servicio-card, .metodo-card, article, .card");
  
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    card.style.transitionDelay = `${index * 0.1}s`;

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100);
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

        // Cierra el modal al hacer clic en el fondo oscuro
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    cerrarModal(this.id);
                }
            });
        });
