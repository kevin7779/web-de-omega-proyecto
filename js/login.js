'use strict';

// ===== Conexión con Supabase =====
// La clave "publishable" es pública por diseño. La seguridad la da Supabase Auth.
const SUPABASE_URL = 'https://tixyhsysyktnxxspsjtz.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_43jIfpHrcapxjcSF6MPm1w_V0jh-ad1';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// ===== Mostrar / ocultar contraseña (tu función original) =====
function togglePasswordVisibility(fieldId, iconId) {
    const passwordInput = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(iconId);

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// ===== Inicio de sesión =====
const form = document.getElementById('loginForm');
const estado = document.getElementById('estado');
const boton = document.getElementById('btn-ingresar');

function mostrar(mensaje, tipo) {
    estado.textContent = mensaje;
    estado.className = tipo || '';
}

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    boton.disabled = true;
    mostrar('Verificando…');

    // Supabase Auth compara la contraseña contra el hash guardado.
    // La contraseña nunca se guarda ni se muestra en ninguna tabla.
    const { error } = await db.auth.signInWithPassword({ email, password });

    boton.disabled = false;

    if (error) {
        console.error('Error de Supabase:', error);

        if (error.code === 'email_not_confirmed') {
            return mostrar('Confirma tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.', 'error');
        }
        // Mensaje genérico: no revela si el correo existe o no
        return mostrar('Correo o contraseña incorrectos.', 'error');
    }

    mostrar('Inicio de sesión exitoso. Redirigiendo…', 'ok');
    window.location.href = 'panel.html'; // Redirige al panel
});

// Si ya hay sesión (por ejemplo, tras confirmar el correo), va directo al panel
db.auth.getSession().then(({ data }) => {
    if (data.session) window.location.href = 'panel.html';
});
