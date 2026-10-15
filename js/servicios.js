document.addEventListener("DOMContentLoaded", () => {
  // 1. Inyectar el Header específico para la página de servicios
  const headerElement = document.querySelector("header");
  if (headerElement) {
    headerElement.innerHTML = `
      <div>
        <a href="index.html" class="brand-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" style="width: 26px; height: 26px; fill: #38bdf8; flex-shrink: 0; display: block;">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6a3 3 0 0 1 3 3c0 1.3-.84 2.4-2 2.81V15h-2v-2.19A3.001 3.001 0 0 1 9 10a3 3 0 0 1 3-3z"/>
          </svg>
          <span style="color: #f8fafc; font-weight: 700; font-size: 1.15rem;">Omega Ciberseguridad</span>
        </a>
        <nav aria-label="Principal">
          <ul>
            <li><a href="servicios.html" data-page="servicios.html" style="color: #38bdf8; font-weight: 600;">Servicios</a></li>
            <li><a href="metodo.html" data-page="metodo.html">Cómo trabajamos</a></li>
            <li><a href="nosotros.html" data-page="nosotros.html">Nosotros</a></li>
            <li><a href="contacto.html" data-page="contacto.html">Contacto</a></li>
            <li><a href="login.html" data-page="login.html" class="btn-login">Iniciar sesión</a></li>
            <li><a href="registrate.html" data-page="registrate.html" class="btn-registro">Regístrate</a></li>
          </ul>
        </nav>
      </div>
    `;
  }

  // 2. Inyectar el Footer
  const footerElement = document.querySelector("footer");
  if (footerElement) {
    footerElement.innerHTML = `
      <div>
        <span>© 2026 Omega Ciberseguridad</span>
        <span>Pruebas siempre con autorización por escrito del cliente.</span>
      </div>
    `;
  }

  // 3. Animación de aparición suave para las tarjetas de servicios
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
