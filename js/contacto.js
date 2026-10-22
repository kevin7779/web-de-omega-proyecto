'use strict';

// ===== Conexión con Supabase =====
// La clave "publishable" es pública por diseño. La seguridad la dan las políticas RLS de la tabla.
const SUPABASE_URL = 'https://tixyhsysyktnxxspsjtz.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_43jIfpHrcapxjcSF6MPm1w_V0jh-ad1';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// ===== Formulario =====
const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('estado');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Campo trampa anti-bots: si tiene contenido, se simula el envío y no se guarda nada
  if (document.getElementById('sitio-web').value) {
    form.reset();
    statusMessage.textContent = 'Gracias. Tu mensaje ha sido registrado correctamente.';
    return;
  }

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const empresa = document.getElementById('empresa').value.trim();
  const servicio = document.getElementById('servicio').value;
  const mensaje = document.getElementById('mensaje').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  statusMessage.classList.remove('error');

  if (!nombre || !correo) {
    statusMessage.textContent = 'Por favor, completa tu nombre y correo electrónico.';
    statusMessage.classList.add('error');
    (!nombre ? document.getElementById('nombre') : document.getElementById('correo')).focus();
    return;
  }

  if (!emailPattern.test(correo)) {
    statusMessage.textContent = 'Escribe un correo electrónico válido para poder responderte.';
    statusMessage.classList.add('error');
    document.getElementById('correo').focus();
    return;
  }

  // Evita envíos dobles mientras se guarda
  submitButton.disabled = true;
  statusMessage.textContent = 'Enviando tu solicitud…';

  // Nombres de columna de la tabla "Contacto" (ver supabase_contacto.sql)
  const { error } = await db.from('Contacto').insert([{
    nombre: nombre,
    correo: correo,
    empresa: empresa || null,
    servicio: servicio,
    mensaje: mensaje || null
  }]);

  submitButton.disabled = false;

  if (error) {
    console.error('Error de Supabase:', error);
    statusMessage.textContent = 'No se pudo enviar tu solicitud. Inténtalo de nuevo en unos minutos.';
    statusMessage.classList.add('error');
    return;
  }

  statusMessage.textContent = `Gracias, ${nombre}. Tu mensaje ha sido registrado correctamente. Nos pondremos en contacto contigo lo antes posible.`;
  form.reset();
});
