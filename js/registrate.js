'use strict';

// ===== Conexión con Supabase =====
// La clave "publishable" es pública por diseño. La seguridad la dan Supabase Auth y las políticas RLS.
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

// ===== Registro de usuario =====
const form = document.getElementById('form-registro');
const estado = document.getElementById('estado');
const boton = document.getElementById('btn-registro');

function mostrar(mensaje, tipo) {
    estado.textContent = mensaje;
    estado.className = tipo || '';
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const password = document.getElementById('password').value;
    const confirmar = document.getElementById('confirm-password').value;
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('comentario').value.trim();

    // Validaciones en el navegador (la base de datos también valida)
    if (password.length < 8) {
        return mostrar('La contraseña debe tener al menos 8 caracteres.', 'error');
    }
    if (password !== confirmar) {
        return mostrar('Las contraseñas no coinciden.', 'error');
    }
    if (!servicio) {
        return mostrar('Selecciona un servicio de interés.', 'error');
    }

    boton.disabled = true;
    mostrar('Creando tu cuenta…');

    // La contraseña la maneja Supabase Auth (se guarda con hash, nunca en tu tabla).
    // El resto de datos viajan como metadata y un trigger los copia a la tabla "Registrate".
    const { data, error } = await db.auth.signUp({
        email,
        password,
        options: {
            data: { nombre, apellido, empresa, servicio, mensaje },
            emailRedirectTo: new URL('login.html', window.location.href).href
        }
    });

    boton.disabled = false;

    if (error) {
        console.error('Error de Supabase:', error);
        return mostrar('No se pudo crear la cuenta. Revisa los datos e inténtalo de nuevo.', 'error');
    }

    // Si el correo ya existe, Supabase devuelve un usuario sin identidades
    if (data.user && data.user.identities && data.user.identities.length === 0) {
        return mostrar('Este correo ya está registrado. Intenta iniciar sesión.', 'error');
    }

    form.reset();
    mostrar('Cuenta creada. Revisa tu correo para confirmar tu registro.', 'ok');
});
