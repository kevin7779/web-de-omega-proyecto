document.addEventListener("DOMContentLoaded", () => {
    // 1. Animación suave inicial de las tarjetas
    const tarjetasServicios = document.querySelectorAll(".servicio-card, .tarjeta-card");
    tarjetasServicios.forEach((tarjeta, index) => {
        tarjeta.style.opacity = "0";
        tarjeta.style.transform = "translateY(25px)";
        tarjeta.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        tarjeta.style.transitionDelay = `${index * 0.12}s`;

        setTimeout(() => {
            tarjeta.style.opacity = "1";
            tarjeta.style.transform = "translateY(0)";
        }, 150);
    });

    // 2. Funcionalidad del Modal
    const modalOverlay = document.getElementById('serviceModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalDocKey = document.getElementById('modalDocKey');
    const modalWarranty = document.getElementById('modalWarranty');
    const modalList = document.getElementById('modalList');

    // Datos detallados con Documento Clave y Garantía para cada servicio
    const servicesData = {
        penetration: {
            title: "Pruebas de Penetración",
            subtitle: "Atacamos tus sistemas con autorización, igual que lo haría un delincuente, y te mostramos por dónde entramos.",
            docKey: "Informe Técnico y Ejecutivo de Vulnerabilidades",
            warranty: "Pruebas controladas sin afectar la producción",
            features: [
                "Escaneo avanzado de puertos y servicios.",
                "Explotación controlada de vulnerabilidades (Fase de Hacking Ético).",
                "Informe detallado con pruebas de concepto y soluciones.",
                "Reunión de revisión de resultados y asesoría de parcheo."
            ]
        },
        auditoria: {
            title: "Auditoría de Redes y Firewall",
            subtitle: "Revisamos routers, switches, reglas de acceso y segmentación para cerrar lo que no debería estar abierto.",
            docKey: "Matriz de Riesgos y Reglas de Firewall",
            warranty: "Optimización segura de la red corporativa",
            features: [
                "Revisión de configuraciones en equipos de red y firewalls perimetrales.",
                "Análisis de reglas de control de acceso (ACLs).",
                "Evaluación de protocolos de enrutamiento y gestión segura.",
                "Detección de puntos ciegos en la topología de red."
            ]
        },
        correo: {
            title: "Seguridad del Correo y la Nube",
            subtitle: "Configuramos la protección contra suplantación y revisamos permisos en tus cuentas y servicios en la nube.",
            docKey: "Reporte de Configuración SPF/DKIM/DMARC",
            warranty: "Blindaje contra suplantación de identidad",
            features: [
                "Implementación y verificación de registros SPF, DKIM y DMARC.",
                "Auditoría de permisos de usuarios y accesos externos en la nube.",
                "Detección de configuraciones expuestas en bandejas de correo.",
                "Protección avanzada contra campañas de Phishing masivo."
            ]
        },
        capacitacion: {
            title: "Capacitación al personal",
            subtitle: "Talleres y simulacros de phishing para que tu equipo reconozca un engaño antes de hacer clic.",
            docKey: "Certificado y Reporte de Simulacro",
            warranty: "Reducción del riesgo por error humano",
            features: [
                "Simulacros de campañas de correo de phishing medibles.",
                "Talleres interactivos sobre higiene de contraseñas y doble factor (2FA).",
                "Material de apoyo y guías rápidas de respuesta para empleados.",
                "Reporte de nivel de riesgo y resistencia humana al engaño."
            ]
        },
        incidentes: {
            title: "Respuesta a incidentes",
            subtitle: "Si ya te atacaron, contenemos el problema, recuperamos los sistemas y explicamos qué pasó.",
            docKey: "Acta de Contención y Análisis Forense",
            warranty: "Respuesta inmediata y continuidad de negocio",
            features: [
                "Contención urgente para evitar la propagación de ransomware o malware.",
                "Análisis forense digital preliminar para hallar el origen de la intrusión.",
                "Restauración segura de servicios críticos y copias de respaldo.",
                "Plan de acción correctiva para evitar incidentes futuros."
            ]
        }
    };

    // Escuchar clics en las tarjetas
    tarjetasServicios.forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.getAttribute('data-service');
            const data = servicesData[serviceKey];

            if (data && modalOverlay) {
                modalTitle.textContent = data.title;
                modalSubtitle.textContent = data.subtitle;
                modalDocKey.textContent = data.docKey;
                modalWarranty.textContent = data.warranty;
                
                // Rellenar lista
                modalList.innerHTML = '';
                data.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    modalList.appendChild(li);
                });

                modalOverlay.classList.add('active');
            }
        });
    });

    // Cerrar modal con botón "X"
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }

    // Cerrar modal haciendo clic fuera de la ventana
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.12 // Se activa cuando el 12% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Deja de observar una vez aplicado el efecto
            }
        });
    }, observerOptions);

    // Selecciona todos los elementos con la clase fade-in-element
    const fadeElements = document.querySelectorAll(".fade-in-element");
    fadeElements.forEach(el => observer.observe(el));
});