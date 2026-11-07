'use strict';

(function () {
    // ===== NOTICIAS =====
    // Para agregar una nueva: copia un bloque { ... }, cambia los datos y ponlo al inicio de la lista.
    // "imagen": ruta de la foto en tu proyecto (si no existe, se usa el color de fondo).
    var NOTICIAS = [
        {
            id: 'bcr-ciberseguridad-bancos',
            fecha: '2026-11-04',
            categoria: 'Perú',
            icono: 'fa-building-columns',
            color: 'linear-gradient(135deg,#0369a1,#1e3a8a)',
            imagen: 'img6/bcr-bancos.jpg',
            titulo: 'El BCR planea endurecer los requisitos de ciberseguridad para los bancos',
            contenido: [
                'El presidente del Banco Central de Reserva, Julio Velarde, apuntó a la necesidad de reforzar la seguridad de las transacciones bancarias digitales. Según RPP, el BCR planea endurecer los requisitos de ciberseguridad que deben cumplir los bancos.',
                'Velarde advirtió que los ciberataques podrían limitar la competencia en el sistema financiero. Por su parte, la SBS sostiene que el Perú está preparado para recibir bancos 100% digitales.'
            ],
            analisis: 'Cuando el regulador sube el nivel de exigencia, los controles de seguridad dejan de ser opcionales para quienes manejan pagos o datos financieros. Hacer un diagnóstico a tiempo permite cumplir sin corregir todo a último momento.',
            fuente: {
                nombre: 'RPP',
                url: 'https://rpp.pe/economia/economia/julio-velarde-apunta-a-mayor-seguridad-de-transacciones-bancarias-digitales-bcr-planea-endurecer-requisitos-en-ciberseguridad-de-bancos-noticia-1715938'
            }
        },
        {
            id: 'ley-ciberseguridad-guatemala',
            fecha: '2026-11-04',
            categoria: 'Normativa',
            icono: 'fa-scale-balanced',
            color: 'linear-gradient(135deg,#7c3aed,#312e81)',
            imagen: 'img6/ley-guatemala.jpg',
            titulo: 'Guatemala aprueba su Ley Marco de Ciberseguridad',
            contenido: [
                'El Congreso de la República de Guatemala aprobó el Decreto 26-2026, la Ley Marco de Ciberseguridad, con 121 votos a favor en la sesión del martes 3 de noviembre, según informó Publinews.',
                'La noticia se suma al interés de la región por contar con marcos legales que ordenen la protección de los sistemas y de la información.'
            ],
            analisis: 'Las leyes de ciberseguridad suelen traer obligaciones para las empresas, como proteger datos y reportar incidentes. Conocer el estado real de tu seguridad es el primer paso para estar preparado.',
            fuente: {
                nombre: 'Publinews',
                url: 'https://www.publinews.gt/noticias/2026/11/04/que-debes-saber-de-la-ley-marco-de-ciberseguridad-aprobada-en-el-congreso/'
            }
        },
        {
            id: 'malware-peru-2026',
            fecha: '2026-10-29',
            categoria: 'Amenazas',
            icono: 'fa-bug',
            color: 'linear-gradient(135deg,#b91c1c,#450a0a)',
            imagen: 'img6/malware-peru.jpg',
            titulo: 'Más de 1,700 familias de malware detectadas en el Perú durante 2026',
            contenido: [
                'Según datos de la empresa de ciberseguridad ESET, citados por el diario Gestión, en los primeros nueve meses de 2026 se detectaron más de 1,700 familias de malware solo en el Perú.',
                'La nota analiza cuáles son los ataques más comunes y si las mypes son las víctimas preferidas, en un contexto donde la inteligencia artificial impulsa tanto el gasto en ciberseguridad como los ataques.'
            ],
            analisis: 'Con tantas amenazas circulando, las defensas básicas marcan la diferencia: sistemas actualizados, copias de seguridad, contraseñas únicas y un equipo que sepa reconocer un engaño.',
            fuente: {
                nombre: 'Gestión',
                url: 'https://gestion.pe/economia/ciberataques-en-peru-1700-softwares-maliciosos-rondan-en-2026-mypes-son-victimas-preferidas-noticia/'
            }
        },
        {
            id: 'pymes-pagos-digitales',
            fecha: '2026-10-20',
            categoria: 'Pymes',
            icono: 'fa-store',
            color: 'linear-gradient(135deg,#0f766e,#064e3b)',
            imagen: 'img6/pymes-pagos.jpg',
            titulo: 'Seis de cada diez pymes frenan sus pagos digitales por miedo a los ciberataques',
            contenido: [
                'De acuerdo con el Mastercard 2026 SME Cybersecurity Outlook, un estudio regional sobre la ciberseguridad de las pymes, seis de cada diez pymes frenan su avance en pagos digitales por temor a sufrir ciberataques.',
                'En el Perú, el 90% de las pymes afirma estar familiarizado con la ciberseguridad, pero solo el 23% se siente muy preparado para proteger su negocio.'
            ],
            analisis: 'Conocer el tema no es lo mismo que estar protegido. Una auditoría revela qué está expuesto y qué corregir primero, para que tu negocio pueda vender en línea con tranquilidad.',
            fuente: {
                nombre: 'Infobae Perú',
                url: 'https://www.infobae.com/peru/2026/10/20/seis-de-cada-diez-pymes-frena-su-avance-en-pagos-digitales-por-temor-a-ciberataques/'
            }
        },
        {
            id: 'seguros-ciberseguridad-peru',
            fecha: '2026-08-10',
            categoria: 'Perú',
            icono: 'fa-shield-halved',
            color: 'linear-gradient(135deg,#a16207,#431407)',
            imagen: 'img6/seguros-ciber.jpg',
            titulo: 'Más de 350 mil ciberataques elevan la demanda de seguros informáticos en el Perú',
            contenido: [
                'Según Infobae Perú, una ola de más de 350 mil ciberataques está aumentando la demanda de seguros informáticos entre las empresas del país.',
                'Los especialistas citados en la nota recomiendan evaluar los ciberataques con la misma rigurosidad que cualquier otra amenaza crítica para la continuidad del negocio.'
            ],
            analisis: 'Un seguro ayuda a cubrir pérdidas, pero no evita el ataque. Las aseguradoras suelen valorar que la empresa demuestre controles de seguridad, y para eso sirve un informe de auditoría.',
            fuente: {
                nombre: 'Infobae Perú',
                url: 'https://www.infobae.com/peru/2026/08/10/ola-de-mas-de-350-mil-ciberataques-eleva-la-demanda-de-seguros-informaticos-en-peru/'
            }
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

    // Foto de fondo; si la imagen no existe, se ve el color de atrás
    function fondo(n) {
        return (n.imagen ? 'url("' + n.imagen + '") center/cover no-repeat, ' : '') + n.color;
    }

    function tarjeta(n) {
        var a = el('a', 'noti-card');
        a.href = 'noticias.html#' + n.id;
        a.style.background = fondo(n);
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
        cab.appendChild(el('p', '', 'Lo último en seguridad informática, con enfoque en el Perú y la región.'));
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
        hero.style.background = fondo(n);
        var volver = el('a', 'noti-volver', '← Volver a noticias');
        volver.href = '#';
        hero.appendChild(volver);
        hero.appendChild(el('span', 'noti-cat', n.categoria));
        hero.appendChild(el('h1', 'noti-hero-titulo', n.titulo));
        hero.appendChild(el('span', 'noti-fecha', fechaLarga(n.fecha)));
        app.appendChild(hero);

        var art = el('article', 'noti-articulo');
        n.contenido.forEach(function (p) { art.appendChild(el('p', '', p)); });

        if (n.analisis) {
            var box = el('div', 'noti-analisis');
            box.appendChild(el('strong', '', 'Qué significa para tu empresa'));
            box.appendChild(el('p', '', n.analisis));
            var cta = el('a', '', 'Solicitar un diagnóstico →');
            cta.href = 'contacto.html';
            box.appendChild(cta);
            art.appendChild(box);
        }

        if (n.fuente) {
            var f = el('p', 'noti-fuente', 'Fuente: ');
            var fa = el('a', '', n.fuente.nombre + ' ↗');
            fa.href = n.fuente.url;
            fa.target = '_blank';
            fa.rel = 'noopener noreferrer';
            f.appendChild(fa);
            art.appendChild(f);
        }

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
