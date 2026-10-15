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
