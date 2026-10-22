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
})();
