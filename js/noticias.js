'use strict';

(function () {
    // ===== NOTICIAS =====
    // Para agregar una nueva: copia un bloque { ... }, cámbiale los datos y ponlo al inicio de la lista.
    // El "id" debe ser único, sin espacios ni tildes (ej: 'mi-noticia').
    var NOTICIAS = [
        {
            id: 'vpn-gratis',
            fecha: '2026-11-05',
            categoria: 'Privacidad',
            icono: 'fa-lock',
            color: 'linear-gradient(135deg,#0e7490,#0c4a6e)',
            titulo: 'VPN gratuito: ¿realmente es una buena opción?',
            contenido: [
                'Un VPN cifra tu conexión y oculta tu dirección IP, pero no todos los servicios gratuitos cumplen esa promesa. Mantener servidores en todo el mundo cuesta dinero, y si el servicio no te cobra, alguien más lo está pagando.',
                'Muchos VPN gratuitos se financian mostrando publicidad o recopilando datos de navegación para venderlos. En ese caso, el VPN termina viendo más información tuya que tu propio proveedor de internet.',
                'Si necesitas un VPN para tu empresa, elige un proveedor con política clara de no registro de actividad y auditorías independientes. Para el trabajo remoto, lo ideal es una VPN corporativa administrada por el área de TI.'
            ]
        },
        {
            id: 'phishing-senales',
            fecha: '2026-10-28',
            categoria: 'Phishing',
            icono: 'fa-envelope-open-text',
            color: 'linear-gradient(135deg,#7c3aed,#312e81)',
            titulo: 'Cómo reconocer un correo de phishing en 5 señales',
            contenido: [
                'El phishing sigue siendo la puerta de entrada más común de los ataques a empresas. Casi siempre deja pistas, y conocerlas evita la mayoría de los engaños.',
                'Primera señal: urgencia exagerada, como "tu cuenta será bloqueada hoy". Segunda: el remitente usa un dominio parecido pero distinto al real. Tercera: enlaces que, al pasar el cursor, llevan a una dirección que no corresponde. Cuarta: adjuntos inesperados, sobre todo comprimidos o con macros. Quinta: piden contraseñas, códigos o datos bancarios por correo.',
                'Ante la duda, no hagas clic: confirma con la persona o la empresa por otro canal y avisa al área de TI. Las simulaciones de phishing periódicas ayudan mucho a que el equipo gane el hábito.'
            ]
        },
        {
            id: 'ransomware-primeras-horas',
            fecha: '2026-10-20',
            categoria: 'Incidentes',
            icono: 'fa-skull-crossbones',
            color: 'linear-gradient(135deg,#b91c1c,#450a0a)',
            titulo: 'Ransomware: qué hacer en las primeras horas',
            contenido: [
                'Cuando un ransomware cifra tus archivos, las decisiones de las primeras horas definen cuánto daño habrá. La calma y el orden valen más que la prisa.',
                'Desconecta de inmediato el equipo afectado de la red, ya sea por cable o por Wi-Fi, pero no lo apagues ni borres nada, porque puede contener evidencia. Avisa al responsable de TI y a tu proveedor de seguridad, y cambia las contraseñas desde un equipo limpio.',
                'No pagues el rescate sin asesoría: no garantiza recuperar los datos y te marca como objetivo rentable. La mejor defensa es tener copias de seguridad recientes, cifradas y guardadas fuera de la red principal.'
            ]
        },
        {
            id: 'contrasenas-reutilizadas',
            fecha: '2026-10-12',
            categoria: 'Buenas prácticas',
            icono: 'fa-key',
            color: 'linear-gradient(135deg,#0f766e,#064e3b)',
            titulo: 'Reutilizar contraseñas: el error que más caro sale',
            contenido: [
                'Cuando se filtra una base de datos, los atacantes prueban esas mismas credenciales en correos, bancos y servicios de trabajo. Si usas la misma contraseña en varios lugares, una filtración los compromete todos.',
                'La solución práctica es un gestor de contraseñas: crea claves largas y únicas para cada cuenta y tú solo recuerdas una. Prefiere frases largas antes que palabras cortas con símbolos.',
                'En las auditorías es habitual encontrar la misma clave en decenas de cuentas de una empresa. Corregirlo es barato y reduce muchísimo el riesgo.'
            ]
        },
        {
            id: 'doble-factor',
            fecha: '2026-10-03',
            categoria: 'Buenas prácticas',
            icono: 'fa-mobile-screen-button',
            color: 'linear-gradient(135deg,#0369a1,#1e3a8a)',
            titulo: 'Verificación en dos pasos: la defensa más barata',
            contenido: [
                'Activar la verificación en dos pasos añade una segunda barrera: aunque alguien robe tu contraseña, necesita además un código o una aprobación desde tu celular.',
                'Siempre que puedas, usa una aplicación de autenticación o una llave de seguridad en lugar de mensajes SMS, que son más fáciles de interceptar.',
                'Actívala primero en el correo, la banca en línea y las cuentas de administración. Son los accesos que más daño causan si caen.'
            ]
        },
        {
            id: 'copias-3-2-1',
            fecha: '2026-09-24',
            categoria: 'Respaldo',
            icono: 'fa-hard-drive',
            color: 'linear-gradient(135deg,#a16207,#431407)',
            titulo: 'Copias de seguridad: la regla 3-2-1',
            contenido: [
                'Una copia de seguridad que nunca se probó es solo una esperanza. La regla 3-2-1 es una guía sencilla para tenerlas bien hechas.',
                'Guarda 3 copias de tus datos, en 2 tipos de medios distintos, y 1 de ellas fuera de la oficina o desconectada de la red. Así un incendio, un robo o un ransomware no te dejan sin nada.',
                'Cifra las copias y haz una prueba de restauración cada cierto tiempo. En muchas auditorías encontramos respaldos sin cifrar, y un robo de esos respaldos expone toda la información.'
            ]
        }
    ];

    function el(tag, clase, texto) {
        var e = document.createElement(tag);
        if (clase) e.className = clase;
        if (texto) e.textContent = texto;
        return e;
    }

    function fechaLarga(iso) {
        var p = iso.split('-');
        var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
        return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function ordenadas() {
        return NOTICIAS.slice().sort(function (a, b) { return a.fecha < b.fecha ? 1 : -1; });
    }

    function tarjeta(n) {
        var a = el('a', 'noti-card');
        a.href = 'noticias.html#' + n.id;
        a.style.background = n.color;
        a.appendChild(el('span', 'noti-fecha', fechaLarga(n.fecha)));
        var ic = el('i', 'fa-solid ' + n.icono + ' noti-icono');
        ic.setAttribute('aria-hidden', 'true');
        a.appendChild(ic);
        a.appendChild(el('span', 'noti-cat', n.categoria));
        a.appendChild(el('h3', 'noti-titulo', n.titulo));
        a.appendChild(el('span', 'noti-leer', 'Leer más'));
        return a;
    }

    // ----- Inicio: las 3 últimas noticias -----
    var gridInicio = document.getElementById('noticias-inicio-grid');
    if (gridInicio) {
        ordenadas().slice(0, 3).forEach(function (n) { gridInicio.appendChild(tarjeta(n)); });
    }

    // ----- Página de noticias: lista y detalle -----
    var app = document.getElementById('noticias-app');
    if (!app) return;

    var filtro = 'Todas';

    function renderLista() {
        app.innerHTML = '';
        var cab = el('div', 'noti-cabecera');
        cab.appendChild(el('span', 'noti-etiqueta', 'NOTICIAS'));
        cab.appendChild(el('h1', '', 'Noticias de ciberseguridad'));
        cab.appendChild(el('p', '', 'Consejos, alertas y buenas prácticas para proteger tu empresa.'));
        app.appendChild(cab);

        var cats = ['Todas'];
        NOTICIAS.forEach(function (n) { if (cats.indexOf(n.categoria) < 0) cats.push(n.categoria); });
        var filtros = el('div', 'noti-filtros');
        cats.forEach(function (c) {
            var b = el('button', 'noti-chip' + (c === filtro ? ' activo' : ''), c);
            b.type = 'button';
            b.addEventListener('click', function () { filtro = c; renderLista(); });
            filtros.appendChild(b);
        });
        app.appendChild(filtros);

        var grid = el('div', 'noti-grid');
        ordenadas()
            .filter(function (n) { return filtro === 'Todas' || n.categoria === filtro; })
            .forEach(function (n) { grid.appendChild(tarjeta(n)); });
        app.appendChild(grid);
    }

    function renderDetalle(n) {
        app.innerHTML = '';

        var hero = el('div', 'noti-hero');
        hero.style.background = n.color;
        var volver = el('a', 'noti-volver', '← Volver a noticias');
        volver.href = '#';
        hero.appendChild(volver);
        hero.appendChild(el('span', 'noti-cat', n.categoria));
        hero.appendChild(el('h1', 'noti-hero-titulo', n.titulo));
        hero.appendChild(el('span', 'noti-fecha', fechaLarga(n.fecha)));
        app.appendChild(hero);

        var art = el('article', 'noti-articulo');
        n.contenido.forEach(function (p) { art.appendChild(el('p', '', p)); });

        var comp = el('div', 'noti-compartir');
        comp.appendChild(el('span', '', 'Compartir:'));
        var url = encodeURIComponent(location.href);
        var txt = encodeURIComponent(n.titulo);
        [
            ['fa-whatsapp', 'https://wa.me/?text=' + txt + '%20' + url, 'WhatsApp'],
            ['fa-facebook-f', 'https://www.facebook.com/sharer/sharer.php?u=' + url, 'Facebook'],
            ['fa-twitter', 'https://twitter.com/intent/tweet?text=' + txt + '&url=' + url, 'Twitter']
        ].forEach(function (s) {
            var a = el('a');
            a.href = s[1];
            a.target = '_blank';
            a.rel = 'noopener';
            a.setAttribute('aria-label', s[2]);
            a.appendChild(el('i', 'fa-brands ' + s[0]));
            comp.appendChild(a);
        });
        art.appendChild(comp);
        app.appendChild(art);

        var mas = el('div', 'noti-relacionadas');
        mas.appendChild(el('h2', '', 'Sigue leyendo'));
        var g = el('div', 'noti-grid');
        ordenadas()
            .filter(function (x) { return x.id !== n.id; })
            .slice(0, 3)
            .forEach(function (x) { g.appendChild(tarjeta(x)); });
        mas.appendChild(g);
        app.appendChild(mas);
    }

    function ruta() {
        var id = decodeURIComponent(location.hash.replace('#', ''));
        var n = NOTICIAS.filter(function (x) { return x.id === id; })[0];
        if (n) renderDetalle(n); else renderLista();
        document.title = (n ? n.titulo : 'Noticias') + ' - Omega Ciberseguridad';
        window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', ruta);
    ruta();
})();
