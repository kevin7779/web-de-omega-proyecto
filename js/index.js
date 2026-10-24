document.addEventListener("DOMContentLoaded", () => {
  // 1. Inyectar el Header unificado con diseño profesional
  const headerElement = document.querySelector("header");
  if (headerElement) {
    headerElement.innerHTML = `
      <div>
        <a href="index.html" class="brand-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6a3 3 0 0 1 3 3c0 1.3-.84 2.4-2 2.81V15h-2v-2.19A3.001 3.001 0 0 1 9 10a3 3 0 0 1 3-3z"/>
          </svg>
          <span>Omega Ciberseguridad</span>
        </a>
        <nav aria-label="Principal">
          <ul>
            <li><a href="servicios.html" data-page="servicios.html">Servicios</a></li>
            <li><a href="metodo.html" data-page="metodo.html">Cómo trabajamos</a></li>
            <li><a href="nosotros.html" data-page="nosotros.html">Nosotros</a></li>
            <li><a href="contacto.html" data-page="contacto.html">Contacto</a></li>
            <li><a href="login.html" data-page="login.html" class="btn-login">Iniciar sesión</a></li>
            <li><a href="registrate.html" data-page="registrate.html" class="btn-registro">Regístrate</a></li>
          </ul>
        </nav>
      </div>
    `;

    // Detectar en qué página estás y ponerle estilo activo automáticamente
    const currentLocation = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = headerElement.querySelectorAll("nav a[data-page]");
    navLinks.forEach(link => {
      if (link.getAttribute("data-page") === currentLocation) {
        link.style.color = "#38bdf8";
        link.style.fontWeight = "600";
      }
    });
  }

  // 2. Inyectar el Footer unificado
  const footerElement = document.querySelector("footer");
  if (footerElement) {
    footerElement.innerHTML = `
      <div>
        <span>© 2026 Omega Ciberseguridad</span>
        <span>Pruebas siempre con autorización por escrito del cliente.</span>
      </div>
    `;
  }

  // 3. Animación de aparición suave (Fade-in) al cargar la página
  const elementsToAnimate = document.querySelectorAll(".hero-texto, aside, .card");
  elementsToAnimate.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    el.style.transitionDelay = `${index * 0.15}s`;

    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
  });

  // 4. EFECTOS BACANES EN BOTONES Y ENLACES (Hover fluido y Clic estilo resorte)
  const interactiveElements = document.querySelectorAll(".btn-primary, .btn-secondary, .btn-registro, .btn-login, nav a, button");
  
  interactiveElements.forEach(el => {
    // Transición suave general
    el.style.transition = "all 0.25s ease";

    // Efecto cuando el mouse pasa por encima (Hover flotante y brillo)
    el.addEventListener("mouseenter", () => {
      if (!el.classList.contains("btn-registro") && !el.classList.contains("btn-primary") && !el.classList.contains("btn-login")) {
        el.style.color = "#38bdf8"; // Vuelve los textos del menú cian brillante al pasar el mouse
      }
      el.style.transform = "translateY(-2px)"; // Pequeño efecto de elevación hacia arriba
    });

    // Cuando el mouse sale, regresa a la normalidad
    el.addEventListener("mouseleave", () => {
      // Si no es la página actual, respeta el color original del menú
      const currentLocation = window.location.pathname.split("/").pop() || "index.html";
      if (el.getAttribute("data-page") !== currentLocation) {
        if (el.tagName === "A" && !el.className.includes("btn")) {
          el.style.color = "#94a3b8"; 
        }
      }
      el.style.transform = "translateY(0)";
    });

    // Efecto de clic tipo resorte (contraerse al tocar)
    el.addEventListener("mousedown", () => {
      el.style.transform = "scale(0.96) translateY(0)";
    });

    el.addEventListener("mouseup", () => {
      el.style.transform = "scale(1) translateY(-2px)";
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const botonesFiltro = document.querySelectorAll('.btn-filtro');
  const tarjetas = document.querySelectorAll('.card-testimonio');

  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
      // 1. Cambiar estado activo en los botones
      botonesFiltro.forEach(btn => btn.classList.remove('active'));
      boton.classList.add('active');

      const filtro = boton.getAttribute('data-filter');

      // 2. Filtrar las tarjetas segun la categoria
      tarjetas.forEach(tarjeta => {
        const categoria = tarjeta.getAttribute('data-category');

        if (filtro === 'todos' || categoria === filtro) {
          tarjeta.classList.remove('oculto');
        } else {
          tarjeta.classList.add('oculto');
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', async () => {
  const promptLogin = document.getElementById('comentario-login-prompt');
  const formComentario = document.getElementById('form-comentario');
  const contenedor = document.querySelector('.testimonios-grid');
  if (!promptLogin || !formComentario || !contenedor || !window.supabase) return;

  // Conexión con Supabase (la clave "publishable" es pública por diseño; la seguridad la dan las políticas RLS)
  const db = window.supabase.createClient(
    'https://tixyhsysyktnxxspsjtz.supabase.co',
    'sb_publishable_43jIfpHrcapxjcSF6MPm1w_V0jh-ad1'
  );

  // Crea la tarjeta con textContent (nunca innerHTML) para que nadie pueda inyectar código en un comentario
  function crearTarjeta(c) {
    const iniciales = c.nombre.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase();

    const tarjeta = document.createElement('article');
    tarjeta.className = 'card-testimonio';
    tarjeta.setAttribute('data-category', 'todos');

    const header = document.createElement('div');
    header.className = 'testimonio-header';
    const avatar = document.createElement('div');
    avatar.className = 'avatar-placeholder';
    avatar.textContent = iniciales;
    const info = document.createElement('div');
    info.className = 'autor-info';
    const h3 = document.createElement('h3');
    h3.textContent = c.nombre;
    const cargo = document.createElement('span');
    cargo.textContent = c.cargo;
    info.append(h3, cargo);
    header.append(avatar, info);

    const estrellas = document.createElement('div');
    estrellas.className = 'estrellas';
    estrellas.textContent = c.calificacion;

    const texto = document.createElement('p');
    texto.className = 'comentario';
    texto.textContent = '"' + c.mensaje + '"';

    tarjeta.append(header, estrellas, texto);
    return tarjeta;
  }

  // 1. Mostrar el formulario solo si hay una sesión iniciada en Supabase
  const { data: sesionData } = await db.auth.getSession();
  const hayUsuario = Boolean(sesionData && sesionData.session);
  promptLogin.classList.toggle('oculto', hayUsuario);
  formComentario.classList.toggle('oculto', !hayUsuario);

  // 2. Cargar los comentarios guardados (los más nuevos primero)
  const { data: guardados, error: errorCarga } = await db
    .from('comentarios')
    .select('nombre, cargo, calificacion, mensaje')
    .order('creado_en', { ascending: false })
    .limit(20);

  if (errorCarga) {
    console.error('No se pudieron cargar los comentarios:', errorCarga);
  } else if (guardados && guardados.length) {
    // Los más nuevos van primero, arriba de los testimonios fijos
    contenedor.prepend(...guardados.map(crearTarjeta));
  }

  // 3. Guardar un comentario nuevo en la base de datos
  formComentario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const boton = formComentario.querySelector('button[type="submit"]');
    const comentario = {
      nombre: document.getElementById('autor-nombre').value.trim(),
      cargo: document.getElementById('autor-cargo').value.trim(),
      calificacion: document.getElementById('autor-calificacion').value,
      mensaje: document.getElementById('autor-mensaje').value.trim()
    };

    boton.disabled = true;
    const { error } = await db.from('comentarios').insert(comentario);
    boton.disabled = false;

    if (error) {
      alert('No se pudo publicar tu comentario. Inténtalo de nuevo en unos minutos.');
      return;
    }

    contenedor.prepend(crearTarjeta(comentario));
    formComentario.reset();
    alert('¡Gracias! Tu comentario ha sido publicado exitosamente.');
  });
});
