document.addEventListener("DOMContentLoaded", () => {
  // Selecciona cualquier tarjeta dentro de la página de método de forma segura
  const cards = document.querySelectorAll(".servicio-card, .metodo-card, article, .card");
  
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    card.style.transitionDelay = `${index * 0.1}s`;

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100);
  });
});

  function abrirModal(id) {
            const modal = document.getElementById(id);
            if (modal) {
                modal.style.display = "flex";
                setTimeout(() => {
                    modal.classList.add("active");
                }, 10);
            }
        }

        function cerrarModal(id) {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.remove("active");
                setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            }
        }

        // Cierra el modal con la tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.active').forEach(m => cerrarModal(m.id));
            }
        });

        // ===== Ejemplo interactivo de hallazgo (datos anonimizados) =====
        const hallazgos = {
            critica: {
                titulo: "Inyección SQL en formulario de inicio de sesión",
                badge: "Crítica",
                cvss: "CVSS 9.8",
                activo: "Activo: app.cliente-ejemplo.com",
                evidencia: "El campo de usuario acepta comandos de base de datos sin filtrar. Con una entrada especialmente construida se obtuvo acceso a registros de la tabla de usuarios.",
                impacto: "Un atacante externo podría leer, modificar o borrar datos de clientes sin necesidad de credenciales.",
                recomendacion: "Usar consultas parametrizadas, validar toda entrada del usuario y limitar los privilegios de la cuenta de base de datos."
            },
            alta: {
                titulo: "Panel de administración expuesto a Internet",
                badge: "Alta",
                cvss: "CVSS 8.1",
                activo: "Activo: admin.cliente-ejemplo.com",
                evidencia: "El panel es accesible desde cualquier IP y no exige doble factor de autenticación. Se detectó además ausencia de bloqueo ante intentos fallidos.",
                impacto: "Facilita ataques de fuerza bruta y el control total del sistema si se obtienen las credenciales.",
                recomendacion: "Restringir el acceso por VPN o lista de IPs, activar doble factor y bloquear cuentas tras varios intentos fallidos."
            },
            media: {
                titulo: "Cabeceras de seguridad HTTP ausentes",
                badge: "Media",
                cvss: "CVSS 5.3",
                activo: "Activo: www.cliente-ejemplo.com",
                evidencia: "Las respuestas del servidor no incluyen Content-Security-Policy ni X-Frame-Options, lo que deja la página abierta a ciertos ataques del lado del navegador.",
                impacto: "Aumenta la probabilidad de éxito de ataques como clickjacking o inyección de scripts.",
                recomendacion: "Configurar las cabeceras de seguridad recomendadas en el servidor web o balanceador."
            },
            baja: {
                titulo: "Versión del servidor visible en las respuestas",
                badge: "Baja",
                cvss: "CVSS 3.1",
                activo: "Activo: www.cliente-ejemplo.com",
                evidencia: "El servidor revela su nombre y versión exacta en las cabeceras de respuesta.",
                impacto: "Ayuda a un atacante a identificar vulnerabilidades conocidas para esa versión específica.",
                recomendacion: "Ocultar la información de versión en la configuración del servidor y mantener el software actualizado."
            }
        };

        function mostrarHallazgo(sev) {
            const h = hallazgos[sev];
            const card = document.getElementById('hallazgo-card');
            if (!h || !card) return;
            card.dataset.sev = sev;
            document.getElementById('h-titulo').textContent = h.titulo;
            document.getElementById('h-badge').textContent = h.badge;
            document.getElementById('h-cvss').textContent = h.cvss;
            document.getElementById('h-activo').textContent = h.activo;
            document.getElementById('h-evidencia').textContent = h.evidencia;
            document.getElementById('h-impacto').textContent = h.impacto;
            document.getElementById('h-recomendacion').textContent = h.recomendacion;
            document.querySelectorAll('.sev-tab').forEach(t => {
                t.classList.toggle('active', t.dataset.sev === sev);
            });
            const colores = { critica: '#ef4444', alta: '#f97316', media: '#eab308', baja: '#22c55e' };
            document.querySelectorAll('.sev-tab.active').forEach(t => t.style.setProperty('--sev', colores[sev]));
        }

        document.querySelectorAll('.sev-tab').forEach(tab => {
            tab.addEventListener('click', () => mostrarHallazgo(tab.dataset.sev));
        });
        mostrarHallazgo('critica');

        // Cierra el modal al hacer clic en el fondo oscuro
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    cerrarModal(this.id);
                }
            });
        });
            // 6. Botón de emergencia
    const sosBtn = document.getElementById("sosBtn");
    const sosPanel = document.getElementById("sosPanel");
    const sosClose = document.getElementById("sosClose");

    if (sosBtn && sosPanel) {
        const toggleSos = (abrir) => {
            sosPanel.classList.toggle("open", abrir);
            sosBtn.setAttribute("aria-expanded", abrir);
        };

        sosBtn.addEventListener("click", () => toggleSos(!sosPanel.classList.contains("open")));
        if (sosClose) sosClose.addEventListener("click", () => toggleSos(false));

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") toggleSos(false);
        });
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".sos-wrap")) toggleSos(false);
        });
    }

