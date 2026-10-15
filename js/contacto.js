'use strict';

const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('estado');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
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

  // Esta demostración valida el formulario en el navegador, pero no envía datos a un servidor.
  statusMessage.textContent = `Gracias, ${nombre}!. Tu mensaje a sido registrado correctamente. Nos pondremos en contacto contigo lo antes posible.`;
  form.reset();
});
