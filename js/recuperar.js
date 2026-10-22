'use strict';

// ===== Conexión con Supabase =====
const SUPABASE_URL = 'https://tixyhsysyktnxxspsjtz.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_43jIfpHrcapxjcSF6MPm1w_V0jh-ad1';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const form = document.getElementById('form-recuperar');
const estado = document.getElementById('estado');
const boton = document.getElementById('btn-recuperar');

function mostrar(mensaje, tipo) {
    estado.textContent = mensaje;
    estado.className = tipo || '';
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();

    boton.disabled = true;
    mostrar('Enviando…');

    // El enlace del correo lleva a restablecer.html, en la misma carpeta que esta página
    const { error } = await db.auth.resetPasswordForEmail(email, {
        redirectTo: new URL('restablecer.html', window.location.href).href
    });

    boton.disabled = false;

    if (error && error.code === 'over_email_send_rate_limit') {
        console.error('Error de Supabase:', error);
        return mostrar('Hiciste muchos intentos seguidos. Espera unos minutos e inténtalo de nuevo.', 'error');
    }

    if (error) console.error('Error de Supabase:', error);

    // Mensaje igual exista o no el correo, para no revelar qué cuentas están registradas
    form.reset();
    mostrar('Si el correo está registrado, te enviamos un enlace para crear una contraseña nueva. Revisa también tu carpeta de spam.', 'ok');
});
