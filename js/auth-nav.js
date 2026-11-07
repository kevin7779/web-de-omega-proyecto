'use strict';

// Menú inteligente: si hay una sesión iniciada, cambia "Iniciar sesión" por "Mi panel"
// y "Regístrate" por "Cerrar sesión". Solo cambia la apariencia del menú; la seguridad
// real de los datos la dan Supabase Auth y las políticas RLS.
(function () {
    var SUPABASE_URL = 'https://tixyhsysyktnxxspsjtz.supabase.co';
    var SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_43jIfpHrcapxjcSF6MPm1w_V0jh-ad1';
    var CLAVE_SESION = 'sb-tixyhsysyktnxxspsjtz-auth-token';

    function haySesion() {
        try {
            var guardada = localStorage.getItem(CLAVE_SESION);
            if (!guardada) return false;
            var sesion = JSON.parse(guardada);
            return Boolean(sesion && sesion.refresh_token);
        } catch (e) {
            return false;
        }
    }

    // La librería de Supabase solo se descarga si la persona pulsa "Cerrar sesión"
    function cargarSupabase() {
        return new Promise(function (resolve, reject) {
            if (window.supabase) return resolve();
            var s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    async function cerrarSesion(e) {
        e.preventDefault();
        try {
            await cargarSupabase();
            var cliente = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
            await cliente.auth.signOut();
        } catch (err) {
            localStorage.removeItem(CLAVE_SESION);
        }
        window.location.href = 'login.html';
    }

    function ajustarMenu() {
        if (!haySesion()) return;

        document.querySelectorAll('nav a[href="login.html"]').forEach(function (enlace) {
            enlace.textContent = 'Mi panel';
            enlace.setAttribute('href', 'panel.html');
            enlace.classList.remove('active');
        });

        document.querySelectorAll('nav a[href="registrate.html"]').forEach(function (enlace) {
            enlace.textContent = 'Cerrar sesión';
            enlace.setAttribute('href', '#');
            enlace.addEventListener('click', cerrarSesion);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ajustarMenu);
    } else {
        ajustarMenu();
    }

    // Las páginas vuelven a dibujar el menú al cargar; se ajusta de nuevo cuando terminan
    window.addEventListener('load', ajustarMenu);

    // ===== Bloqueo de información si no hay sesión (ventana profesional) =====

    var estilosListos = false;

    function inyectarEstilos() {
        if (estilosListos) return;
        estilosListos = true;
        var st = document.createElement('style');
        st.textContent =
            '.aviso-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;visibility:visible !important;opacity:0;transition:opacity .25s ease;font-family:inherit}' +
            '.aviso-overlay.aviso-visible{opacity:1}' +
            '.aviso-overlay.aviso-pagina{background:#050b12}' +
            '.aviso-overlay.aviso-enlace{background:rgba(5,11,18,.78);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}' +
            '.aviso-card{position:relative;width:100%;max-width:420px;background:linear-gradient(160deg,#0d1b2a,#0a1420);border:1px solid rgba(56,189,248,.25);border-radius:18px;padding:36px 30px 28px;text-align:center;color:#e6edf5;box-shadow:0 24px 60px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.03) inset;transform:translateY(18px) scale(.96);transition:transform .3s cubic-bezier(.2,.9,.3,1.2)}' +
            '.aviso-visible .aviso-card{transform:translateY(0) scale(1)}' +
            '.aviso-icono{width:64px;height:64px;margin:0 auto 18px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.35);color:#38bdf8}' +
            '.aviso-icono svg{width:28px;height:28px}' +
            '.aviso-etiqueta{display:inline-block;font-size:.7rem;letter-spacing:1.5px;font-weight:700;color:#38bdf8;margin-bottom:8px}' +
            '.aviso-card h2{margin:0 0 10px;font-size:1.4rem;font-weight:700;color:#fff}' +
            '.aviso-card p{margin:0 0 24px;font-size:.95rem;line-height:1.55;color:#9fb3c8}' +
            '.aviso-botones{display:flex;flex-direction:column;gap:10px}' +
            '.aviso-btn{display:block;padding:12px 18px;border-radius:10px;font-size:.95rem;font-weight:600;text-decoration:none;cursor:pointer;transition:transform .15s ease,background .2s ease,border-color .2s ease}' +
            '.aviso-btn:hover{transform:translateY(-1px)}' +
            '.aviso-btn-primario{background:#38bdf8;color:#04121c;border:1px solid #38bdf8}' +
            '.aviso-btn-primario:hover{background:#5cc9fa}' +
            '.aviso-btn-secundario{background:transparent;color:#e6edf5;border:1px solid rgba(255,255,255,.18)}' +
            '.aviso-btn-secundario:hover{border-color:#38bdf8;color:#38bdf8}' +
            '.aviso-volver{display:inline-block;margin-top:16px;font-size:.85rem;color:#7d93a9;text-decoration:none}' +
            '.aviso-volver:hover{color:#38bdf8}' +
            '.aviso-cerrar{position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;border:none;background:rgba(255,255,255,.06);color:#9fb3c8;font-size:18px;line-height:1;cursor:pointer}' +
            '.aviso-cerrar:hover{background:rgba(255,255,255,.14);color:#fff}' +
            '@media (prefers-reduced-motion:reduce){.aviso-overlay,.aviso-card{transition:none}}';
        document.head.appendChild(st);
    }

    // modo "pagina": bloquea la página completa (sin cerrar)
    // modo "enlace": aparece sobre la página y se puede cerrar
    function mostrarAviso(modo) {
        if (document.getElementById('aviso-sesion')) return;
        inyectarEstilos();

        var esPagina = modo === 'pagina';
        var overlay = document.createElement('div');
        overlay.id = 'aviso-sesion';
        overlay.className = 'aviso-overlay ' + (esPagina ? 'aviso-pagina' : 'aviso-enlace');
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', 'aviso-titulo');

        overlay.innerHTML =
            '<div class="aviso-card">' +
                (esPagina ? '' : '<button type="button" class="aviso-cerrar" aria-label="Cerrar">&times;</button>') +
                '<div class="aviso-icono">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                        '<rect x="4" y="11" width="16" height="10" rx="2"></rect>' +
                        '<path d="M8 11V7a4 4 0 0 1 8 0v4"></path>' +
                    '</svg>' +
                '</div>' +
                '<span class="aviso-etiqueta">ACCESO RESTRINGIDO</span>' +
                '<h2 id="aviso-titulo">Inicia sesión para continuar</h2>' +
                '<p>' + (esPagina
                    ? 'Esta sección es solo para usuarios registrados. Inicia sesión o crea tu cuenta en unos segundos.'
                    : 'Esta información es solo para usuarios registrados. Inicia sesión o crea tu cuenta para verla.') + '</p>' +
                '<div class="aviso-botones">' +
                    '<a class="aviso-btn aviso-btn-primario" href="login.html">Iniciar sesión</a>' +
                    '<a class="aviso-btn aviso-btn-secundario" href="registrate.html">Crear cuenta</a>' +
                '</div>' +
                (esPagina ? '<a class="aviso-volver" href="index.html">Volver al inicio</a>' : '') +
            '</div>';

        // Se agrega al <html> para que se vea aunque el body esté oculto
        document.documentElement.appendChild(overlay);
        if (esPagina) document.documentElement.style.overflow = 'hidden';

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                overlay.classList.add('aviso-visible');
            });
        });

        if (!esPagina) {
            var cerrar = function () {
                overlay.classList.remove('aviso-visible');
                document.removeEventListener('keydown', alTeclear);
                setTimeout(function () {
                    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                }, 250);
            };
            var alTeclear = function (ev) {
                if (ev.key === 'Escape') cerrar();
            };
            overlay.querySelector('.aviso-cerrar').addEventListener('click', cerrar);
            overlay.addEventListener('click', function (ev) {
                if (ev.target === overlay) cerrar();
            });
            document.addEventListener('keydown', alTeclear);
        }
    }

    // 1) Iconos / enlaces / botones con la clase "requiere-sesion"
    document.addEventListener('click', function (e) {
        var el = e.target.closest ? e.target.closest('.requiere-sesion') : null;
        if (el && !haySesion()) {
            e.preventDefault();
            e.stopPropagation();
            mostrarAviso('enlace');
        }
    }, true);

    // 2) Páginas completas con el atributo "data-protegida" en el body
    function protegerPagina() {
        var body = document.body;
        if (!body || !body.hasAttribute('data-protegida')) return;

        if (haySesion()) {
            body.style.visibility = 'visible';
        } else {
            mostrarAviso('pagina');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', protegerPagina);
    } else {
        protegerPagina();
    }
})();
