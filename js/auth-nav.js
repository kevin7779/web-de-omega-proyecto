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

    // ===== Bloqueo de información si no hay sesión (ventana dinámica) =====

    var estilosListos = false;

    function inyectarEstilos() {
        if (estilosListos) return;
        estilosListos = true;
        var st = document.createElement('style');
        st.textContent = `
.aviso-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;visibility:visible !important;opacity:0;transition:opacity .35s ease;overflow:hidden;font-family:inherit}
.aviso-overlay.aviso-visible{opacity:1}
.aviso-overlay.aviso-pagina{background:radial-gradient(circle at 50% 30%,#0b1b2b 0%,#050b12 70%)}
.aviso-overlay.aviso-enlace{background:rgba(4,10,17,.72);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}

.aviso-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(56,189,248,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.07) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(circle at center,#000 15%,transparent 72%);mask-image:radial-gradient(circle at center,#000 15%,transparent 72%);animation:avisoGrid 16s linear infinite}
@keyframes avisoGrid{to{background-position:44px 44px}}
.aviso-orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:.32;pointer-events:none}
.aviso-orb.o1{width:340px;height:340px;background:#0ea5e9;top:-90px;left:-70px;animation:avisoFlota 9s ease-in-out infinite}
.aviso-orb.o2{width:300px;height:300px;background:#6366f1;bottom:-100px;right:-60px;animation:avisoFlota 11s ease-in-out infinite reverse}
@keyframes avisoFlota{50%{transform:translate(45px,30px) scale(1.15)}}

.aviso-card{position:relative;width:100%;max-width:430px;padding:1.5px;border-radius:22px;overflow:hidden;opacity:0;transform:translateY(34px) scale(.9);transition:transform .6s cubic-bezier(.2,1.1,.3,1),opacity .4s ease;box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 60px rgba(56,189,248,.12)}
.aviso-visible .aviso-card{opacity:1;transform:translateY(0) scale(1)}
.aviso-card::before{content:'';position:absolute;inset:-70%;background:conic-gradient(from 0deg,transparent 0 55%,#38bdf8 78%,#818cf8 90%,transparent 100%);animation:avisoGira 4.5s linear infinite}
@keyframes avisoGira{to{transform:rotate(360deg)}}
.aviso-interior{position:relative;z-index:1;border-radius:20.5px;padding:38px 30px 28px;text-align:center;color:#e6edf5;background:linear-gradient(160deg,#0d1b2a,#08111b)}

.aviso-item{opacity:0;transform:translateY(16px)}
.aviso-visible .aviso-item{animation:avisoSube .6s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:calc(var(--d) * 90ms + 200ms)}
@keyframes avisoSube{to{opacity:1;transform:translateY(0)}}

.aviso-icono{position:relative;width:78px;height:78px;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;color:#38bdf8}
.aviso-icono .aviso-circulo{position:absolute;inset:0;border-radius:50%;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.4)}
.aviso-icono::before,.aviso-icono::after{content:'';position:absolute;inset:0;border-radius:50%;border:1.5px solid rgba(56,189,248,.55);animation:avisoOnda 2.6s ease-out infinite}
.aviso-icono::after{animation-delay:1.3s}
@keyframes avisoOnda{from{transform:scale(.8);opacity:.9}to{transform:scale(1.7);opacity:0}}
.aviso-icono svg{position:relative;width:34px;height:34px;animation:avisoSacude 3.4s ease-in-out infinite}
.aviso-arco{animation:avisoCandado 3.4s ease-in-out infinite}
@keyframes avisoCandado{0%,30%{transform:translateY(-3px)}42%,100%{transform:translateY(0)}}
@keyframes avisoSacude{0%,40%,56%,100%{transform:rotate(0)}46%{transform:rotate(-7deg)}52%{transform:rotate(6deg)}}

.aviso-etiqueta{display:inline-flex;align-items:center;gap:8px;padding:5px 12px;border-radius:999px;font-size:.68rem;letter-spacing:1.5px;font-weight:700;color:#fbbf24;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.28);margin-bottom:14px}
.aviso-punto{width:7px;height:7px;border-radius:50%;background:#fbbf24;animation:avisoLatido 1.4s ease-in-out infinite}
@keyframes avisoLatido{50%{transform:scale(1.7);opacity:.4}}

.aviso-interior h2{margin:0 0 10px;font-size:1.45rem;font-weight:700;color:#fff;line-height:1.25}
.aviso-interior p{margin:0 0 24px;font-size:.95rem;line-height:1.55;color:#9fb3c8}
.aviso-botones{display:flex;flex-direction:column;gap:10px}
.aviso-btn{position:relative;overflow:hidden;display:block;padding:13px 18px;border-radius:11px;font-size:.95rem;font-weight:600;text-decoration:none;cursor:pointer;transition:transform .18s ease,box-shadow .2s ease,border-color .2s ease,color .2s ease,background .2s ease}
.aviso-btn:hover{transform:translateY(-2px)}
.aviso-btn-primario{background:linear-gradient(135deg,#38bdf8,#0ea5e9);color:#04121c;border:1px solid #38bdf8;box-shadow:0 8px 24px rgba(14,165,233,.35)}
.aviso-btn-primario:hover{box-shadow:0 12px 30px rgba(14,165,233,.5)}
.aviso-btn-primario::after{content:'';position:absolute;top:0;left:-70%;width:45%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-20deg);animation:avisoBrillo 3.2s ease-in-out infinite}
@keyframes avisoBrillo{0%,55%{left:-70%}100%{left:130%}}
.aviso-btn-secundario{background:transparent;color:#e6edf5;border:1px solid rgba(255,255,255,.18)}
.aviso-btn-secundario:hover{border-color:#38bdf8;color:#38bdf8;background:rgba(56,189,248,.06)}
.aviso-volver{display:inline-block;margin-top:18px;font-size:.85rem;color:#7d93a9;text-decoration:none;transition:color .2s}
.aviso-volver:hover{color:#38bdf8}
.aviso-cerrar{position:absolute;top:14px;right:14px;z-index:2;width:34px;height:34px;border-radius:50%;border:none;background:rgba(255,255,255,.06);color:#9fb3c8;font-size:20px;line-height:1;cursor:pointer;transition:background .2s,transform .2s,color .2s}
.aviso-cerrar:hover{background:rgba(255,255,255,.15);color:#fff;transform:rotate(90deg)}

@media (max-width:480px){.aviso-interior{padding:32px 22px 24px}.aviso-interior h2{font-size:1.25rem}}
@media (prefers-reduced-motion:reduce){.aviso-overlay,.aviso-card,.aviso-item{transition:none;animation:none !important;opacity:1;transform:none}.aviso-card::before,.aviso-grid,.aviso-orb,.aviso-icono::before,.aviso-icono::after,.aviso-icono svg,.aviso-arco,.aviso-punto,.aviso-btn-primario::after{animation:none !important}}
`;
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
            (esPagina ? '<div class="aviso-grid"></div><div class="aviso-orb o1"></div><div class="aviso-orb o2"></div>' : '') +
            '<div class="aviso-card">' +
                (esPagina ? '' : '<button type="button" class="aviso-cerrar" aria-label="Cerrar">&times;</button>') +
                '<div class="aviso-interior">' +
                    '<div class="aviso-item aviso-icono" style="--d:0">' +
                        '<span class="aviso-circulo"></span>' +
                        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                            '<rect x="4" y="11" width="16" height="10" rx="2"></rect>' +
                            '<path class="aviso-arco" d="M8 11V7a4 4 0 0 1 8 0v4"></path>' +
                        '</svg>' +
                    '</div>' +
                    '<div class="aviso-item" style="--d:1"><span class="aviso-etiqueta"><span class="aviso-punto"></span>ACCESO RESTRINGIDO</span></div>' +
                    '<h2 id="aviso-titulo" class="aviso-item" style="--d:2">Inicia sesión para continuar</h2>' +
                    '<p class="aviso-item" style="--d:3">' + (esPagina
                        ? 'Esta sección es exclusiva para usuarios registrados. Inicia sesión o crea tu cuenta para entrar.'
                        : 'Esta información es exclusiva para usuarios registrados. Inicia sesión o crea tu cuenta para verla.') + '</p>' +
                    '<div class="aviso-item aviso-botones" style="--d:4">' +
                        '<a class="aviso-btn aviso-btn-primario" href="login.html">Iniciar sesión</a>' +
                        '<a class="aviso-btn aviso-btn-secundario" href="registrate.html">Crear cuenta</a>' +
                    '</div>' +
                    (esPagina ? '<a class="aviso-item aviso-volver" style="--d:5" href="index.html">← Volver al inicio</a>' : '') +
                '</div>' +
            '</div>';

        // Se agrega al <html> para que se vea aunque el body esté oculto
        document.documentElement.appendChild(overlay);
        if (esPagina) document.documentElement.style.overflow = 'hidden';

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                overlay.classList.add('aviso-visible');
            });
        });

        var principal = overlay.querySelector('.aviso-btn-primario');
        if (principal) setTimeout(function () { principal.focus({ preventScroll: true }); }, 400);

        if (!esPagina) {
            var alTeclear;
            var cerrar = function () {
                overlay.classList.remove('aviso-visible');
                document.removeEventListener('keydown', alTeclear);
                setTimeout(function () {
                    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                }, 350);
            };
            alTeclear = function (ev) {
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
