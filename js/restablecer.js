'use strict';

// ===== Conexión con Supabase =====
const SUPABASE_URL = 'https://tixyhsysyktnxxspsjtz.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_43jIfpHrcapxjcSF6MPm1w_V0jh-ad1';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// ===== Mostrar / ocultar contraseña =====
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

const form = document.getElementById('form-restablecer');
const estado = document.getElementById('estado');
const boton = document.getElementById('btn-restablecer');
const verificando = document.getElementById('verificando');

function mostrar(mensaje, tipo) {
    estado.textContent = mensaje;
    estado.className = tipo || '';
}

function mostrarFormulario() {
    verificando.hidden = true;
    form.hidden = false;
}

// Supabase abre una sesión temporal cuando la persona llega desde el enlace del correo
db.auth.onAuthStateChange((evento) => {
    if (evento === 'PASSWORD_RECOVERY') mostrarFormulario();
});

// Si no llegó el evento, se revisa si ya hay sesión; si no la hay, el enlace no sirve
setTimeout(async () => {
    if (!form.hidden) return;
    const { data } = await db.auth.getSession();
    if (data.session) {
        mostrarFormulario();
    } else {
        verificando.textContent = 'Este enlace no es válido o ya venció. Pide uno nuevo desde la página de recuperación.';
        verificando.className = 'error';
    }
}, 2000);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirmar = document.getElementById('confirm-password').value;

    if (password.length < 8) {
        return mostrar('La contraseña debe tener al menos 8 caracteres.', 'error');
    }
    if (password !== confirmar) {
        return mostrar('Las contraseñas no coinciden.', 'error');
    }

    boton.disabled = true;
    mostrar('Guardando tu contraseña nueva…');

    const { error } = await db.auth.updateUser({ password });

    boton.disabled = false;

    if (error) {
        console.error('Error de Supabase:', error);
        if (error.code === 'same_password') {
            return mostrar('La contraseña nueva debe ser distinta a la anterior.', 'error');
        }
        if (error.code === 'weak_password') {
            return mostrar('Esa contraseña es muy débil. Usa una más larga y variada.', 'error');
        }
        return mostrar('No se pudo cambiar la contraseña. Pide un enlace nuevo e inténtalo de nuevo.', 'error');
    }

    form.reset();
    mostrar('Contraseña actualizada. Te llevamos a tu panel…', 'ok');
    setTimeout(() => { window.location.href = 'panel.html'; }, 2000);
});
