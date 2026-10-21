'use strict';

// ===== Conexión con Supabase =====
// La clave "publishable" es pública por diseño. Los datos los protegen Supabase Auth y las políticas RLS.
const SUPABASE_URL = 'https://tixyhsysyktnxxspsjtz.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_43jIfpHrcapxjcSF6MPm1w_V0jh-ad1';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const SERVICIOS = {
    pentest: 'Pruebas de Penetración (Pentesting)',
    redes: 'Auditoría de Redes e Infraestructura',
    web: 'Auditoría de Aplicaciones Web / Móviles',
    consultoria: 'Consultoría General de Ciberseguridad'
};

const estado = document.getElementById('estado');
const contenido = document.getElementById('contenido');

// textContent evita inyectar HTML con datos escritos por el usuario
function poner(id, texto) {
    document.getElementById(id).textContent = texto;
}

async function cerrarSesion(e) {
    if (e) e.preventDefault();
    await db.auth.signOut();
    window.location.replace('login.html');
}

async function cargarPanel() {
    const { data: { session } } = await db.auth.getSession();

    // Sin sesión: de vuelta al inicio de sesión
    if (!session) {
        window.location.replace('login.html');
        return;
    }

    const usuario = session.user;

    // Gracias a RLS, esta consulta solo devuelve la fila del propio usuario
    const { data, error } = await db
        .from('Registrate')
        .select('nombre, apellido, correo, empresa, servicio, mensaje, creado_en')
        .eq('id', usuario.id)
        .maybeSingle();

    if (error) {
        console.error('Error de Supabase:', error);
        estado.textContent = 'No se pudieron cargar tus datos. Inténtalo de nuevo en unos minutos.';
        estado.className = 'error';
        return;
    }

    // Cuentas sin fila en Registrate: se muestra lo mínimo
    const perfil = data || {
        nombre: usuario.email.split('@')[0],
        apellido: '',
        correo: usuario.email,
        empresa: '—',
        servicio: '',
        mensaje: '',
        creado_en: usuario.created_at
    };

    poner('p-nombre', perfil.nombre);
    poner('p-inicial', perfil.nombre.charAt(0).toUpperCase());
    poner('p-titular', `${perfil.nombre} ${perfil.apellido}`.trim());
    poner('p-correo', perfil.correo);
    poner('p-empresa', perfil.empresa);
    poner('p-servicio', SERVICIOS[perfil.servicio] || '—');
    poner('p-fecha', new Date(perfil.creado_en).toLocaleDateString('es-PE', {
        day: 'numeric', month: 'long', year: 'numeric'
    }));
    poner('p-mensaje', perfil.mensaje || 'No dejaste comentarios al registrarte.');

    // Credencial de acceso
    poner('b-nombre', `${perfil.nombre} ${perfil.apellido}`.trim());
    poner('b-empresa', perfil.empresa);
    poner('b-id', usuario.id.slice(0, 8).toUpperCase());

    // Estado del correo: confirmado o pendiente
    const itemCorreo = document.getElementById('c-correo');
    const confirmado = Boolean(usuario.email_confirmed_at);
    itemCorreo.className = confirmado ? 'ok' : 'pendiente';
    itemCorreo.querySelector('i').className = confirmado
        ? 'fa-solid fa-circle-check'
        : 'fa-solid fa-circle-exclamation';
    itemCorreo.querySelector('span').textContent = confirmado
        ? 'Correo confirmado'
        : 'Correo pendiente de confirmar';

    estado.hidden = true;
    contenido.hidden = false;
}

document.getElementById('btn-salir').addEventListener('click', cerrarSesion);
document.getElementById('btn-salir-menu').addEventListener('click', cerrarSesion);

cargarPanel();
