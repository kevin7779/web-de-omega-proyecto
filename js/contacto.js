'use strict';

/* =====================================================
   1. BOTÓN DE EMERGENCIA "SUFRÍ UN ATAQUE"
   Va primero y es independiente de Supabase y del formulario,
   así funciona aunque algo más falle en la página.
   ===================================================== */
(function iniciarBotonSOS() {
  const sosBtn = document.getElementById('sosBtn');
  const sosPanel = document.getElementById('sosPanel');
  const sosClose = document.getElementById('sosClose');

  if (!sosBtn || !sosPanel) return;

  const toggleSos = (abrir) => {
    sosPanel.classList.toggle('open', abrir);
    sosBtn.setAttribute('aria-expanded', String(abrir));
  };

  sosBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSos(!sosPanel.classList.contains('open'));
  });

  if (sosClose) {
    sosClose.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSos(false);
    });
  }

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleSos(false);
  });

  // Cerrar al hacer clic fuera del botón/panel
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.sos-wrap')) toggleSos(false);
  });
})();

/* =====================================================
   2. CONEXIÓN CON SUPABASE
   La clave "publishable" es pública por diseño.
   La seguridad la dan las políticas RLS de la tabla.
   ===================================================== */
const SUPABASE_URL = 'https://tixyhsysyktnxxspsjtz.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_43jIfpHrcapxjcSF6MPm1w_V0jh-ad1';

// Si el CDN de Supabase no carga, no se rompe el resto de la página
let db = null;
try {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    db = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  } else {
    console.error('No se pudo cargar la librería de Supabase.');
  }
} catch (err) {
  console.error('Error al iniciar Supabase:', err);
}

/* =====================================================
   3. FORMULARIO DE CONTACTO
   ===================================================== */
const form = document.getElementById('contact-form');

if (form) {
  const statusMessage = document.getElementById('estado');
  const submitButton = form.querySelector('button[type="submit"]');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const mostrarEstado = (texto, esError = false) => {
    statusMessage.textContent = texto;
    statusMessage.classList.toggle('error', esError);
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Campo trampa anti-bots: si tiene contenido, se simula el envío y no se guarda nada
    if (document.getElementById('sitio-web').value) {
      form.reset();
      mostrarEstado('Gracias. Tu mensaje ha sido registrado correctamente.');
      return;
    }

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !correo) {
      mostrarEstado('Por favor, completa tu nombre y correo electrónico.', true);
      (!nombre ? document.getElementById('nombre') : document.getElementById('correo')).focus();
      return;
    }

    if (!emailPattern.test(correo)) {
      mostrarEstado('Escribe un correo electrónico válido para poder responderte.', true);
      document.getElementById('correo').focus();
      return;
    }

    if (!db) {
      mostrarEstado('No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.', true);
      return;
    }

    // Evita envíos dobles mientras se guarda
    submitButton.disabled = true;
    mostrarEstado('Enviando tu solicitud…');

    try {
      // Nombres de columna de la tabla "Contacto" (ver supabase_contacto.sql)
      const { error } = await db.from('Contacto').insert([{
        nombre: nombre,
        correo: correo,
        empresa: empresa || null,
        servicio: servicio,
        mensaje: mensaje || null
      }]);

      if (error) throw error;

      mostrarEstado(`Gracias, ${nombre}. Tu mensaje ha sido registrado correctamente. Nos pondremos en contacto contigo lo antes posible.`);
      form.reset();
    } catch (error) {
      console.error('Error de Supabase:', error);
      mostrarEstado('No se pudo enviar tu solicitud. Inténtalo de nuevo en unos minutos.', true);
    } finally {
      submitButton.disabled = false;
    }
  });
}
