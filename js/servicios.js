document.addEventListener("DOMContentLoaded", () => {
  // Animación suave de las tarjetas de servicios
  const tarjetasServicios = document.querySelectorAll(".servicio-card");
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
});
document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('serviceModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalScope = document.getElementById('modalScope');
    const modalDuration = document.getElementById('modalDuration');
    const modalList = document.getElementById('modalList');

    // Datos detallados para cada servicio
    const servicesData = {
        penetration: {
            title: "Pruebas de Penetración (Pentest)",
            subtitle: "Simulamos ataques reales controlados para identificar vulnerabilidades críticas antes de que sean explotadas por ciberdelincuentes.",
            scope: "Redes internas, externas y aplicaciones web.",
            duration: "2 a 3 semanas",
            features: [
                "Escaneo avanzado de puertos y servicios.",
                "Explotación controlada de vulnerabilidades (Fase de Hacking Ético).",
                "Informe ejecutivo y técnico detallado con pruebas de concepto.",
                "Reunión de revisión de resultados y asesoría de parcheo."
            ]
        },
        auditoria: {
            title: "Auditoría de Redes y Firewall",
            subtitle: "Revisamos routers, switches, reglas de acceso y segmentación para cerrar brechas y asegurar el tráfico de tu red.",
            scope: "Firewalls, equipos de red y segmentación de VLANs.",
            duration: "1 a 2 semanas",
            features: [
                "Revisión de configuraciones en equipos Cisco y firewalls perimetrales.",
                "Análisis de reglas de control de acceso (ACLs).",
                "Evaluación de protocolos de enrutamiento y gestión segura.",
                "Detección de puntos ciegos en la topología de red."
            ]
        },
        correo: {
            title: "Seguridad del Correo y la Nube",
            subtitle: "Configuramos la protección contra suplantación y revisamos permisos críticos en tus cuentas y plataformas cloud.",
            scope: "Microsoft 365, Google Workspace y servidores SMTP.",
            duration: "3 a 5 días",
            features: [
                "Implementación y verificación de registros SPF, DKIM y DMARC.",
                "Auditoría de permisos de usuarios y accesos externos en la nube.",
                "Detección de configuraciones expuestas en bandejas de correo.",
                "Protección avanzada contra campañas de Phishing masivo."
            ]
        },
        capacitacion: {
            title: "Capacitación al Personal",
            subtitle: "Talleres prácticos y simulacros controlados de phishing para concienciar a tu equipo frente a amenazas humanas.",
            scope: "Todo el personal de la empresa o áreas críticas.",
            duration: "Flexible (según programa)",
            features: [
                "Simulacros de campañas de correo de phishing medibles.",
                "Talleres interactivos sobre higiene de contraseñas y doble factor (2FA).",
                "Material de apoyo y guías rápidas de respuesta para empleados.",
                "Reporte de nivel de riesgo y resistencia humana al engaño."
            ]
        },
        incidentes: {
            title: "Respuesta a Incidentes",
            subtitle: "Contenemos la brecha de seguridad de forma inmediata, analizamos el vector de ataque y recuperamos los sistemas.",
            scope: "Sistemas afectados, equipos forenses y servidores.",
            duration: "Intervención inmediata 24/7",
            features: [
                "Contención urgente para evitar la propagación de ransomware o malware.",
                "Análisis forense digital preliminar para hallar el origen de la intrusión.",
                "Restauración segura de servicios críticos y copias de respaldo.",
                "Plan de acción correctiva para evitar incidentes futuros."
            ]
        }
    };

    // Agregar evento de clic a cada tarjeta
    document.querySelectorAll('.tarjeta-card').forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.getAttribute('data-service');
            const data = servicesData[serviceKey];

            if (data) {
                modalTitle.textContent = data.title;
                modalSubtitle.textContent = data.subtitle;
                modalScope.textContent = data.scope;
                modalDuration.textContent = data.duration;
                
                // Limpiar y rellenar la lista
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

    // Cerrar modal al hacer clic en la "X"
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    // Cerrar modal al hacer clic fuera del contenido
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
});
