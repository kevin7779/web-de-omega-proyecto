document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. EFECTO DE ESCRITURA (TYPEWRITER) PARA EL H1
    // ==========================================
    const h1Element = document.querySelector(".banner-texto h1");
    if (h1Element) {
        const textoOriginal = h1Element.textContent;
        h1Element.textContent = "";
        let i = 0;

        function escribirTexto() {
            if (i < textoOriginal.length) {
                h1Element.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(escribirTexto, 45);
            }
        }
        setTimeout(escribirTexto, 300);
    }

    // ==========================================
    // 2. NAVBAR DINÁMICO AL HACER SCROLL
    // ==========================================
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.background = "rgba(10, 15, 25, 0.95)";
            header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.5)";
        } else {
            header.style.background = "transparent";
            header.style.boxShadow = "none";
        }
    });

    // ==========================================
    // 3. CONTROL DE VENTANAS EMERGENTES (MODALES)
    // ==========================================
    const tarjetas = document.querySelectorAll(".tarjeta-card");
    const modal = document.getElementById("compromisoModal");
    const cerrarBtn = document.getElementById("closeModalNosotros");

    const tituloModal = document.getElementById("modalNosotrosTitle");
    const subModal = document.getElementById("modalNosotrosSub");
    const docKeyModal = document.getElementById("modalDocKey");
    const warrantyModal = document.getElementById("modalWarranty");
    const listaModal = document.getElementById("modalNosotrosList");

    const datosCompromiso = {
        autorizacion: {
            titulo: "Fase 1: Definición de Alcance y Planificación",
            sub: "Establecemos las Reglas de Compromiso (RoE) para asegurar que la evaluación se realice sin interrumpir la continuidad operativa de tu empresa.",
            docKey: "Acuerdo de Reglas de Compromiso",
            warranty: "Cero interrupciones de servicio",
            puntos: [
                "Identificación y lista exacta de direcciones IP, dominios y aplicaciones autorizadas.",
                "Definición de ventanas de tiempo autorizadas para las pruebas intrusivas.",
                "Firma bilateral del acuerdo de confidencialidad (NDA) y autorización formal."
            ]
        },
        informes: {
            titulo: "Informes en Lenguaje Claro",
            sub: "Traducimos hallazgos complejos en planes de acción directos para tu equipo técnico y directivo.",
            docKey: "Informe Técnico y Ejecutivo de Hallazgos",
            warranty: "Claridad absoluta sin tecnicismos innecesarios",
            puntos: [
                "Resumen ejecutivo orientado a la gerencia con el nivel de riesgo real.",
                "Evidencia técnica detallada, capturas y pasos para reproducir cada fallo.",
                "Guía de remediación paso a paso para los desarrolladores."
            ]
        },
        confidencialidad: {
            titulo: "Confidencialidad Absoluta",
            sub: "La información de tu empresa se queda estrictamente en tu empresa bajo estrictas normas de seguridad.",
            docKey: "Acuerdo de No Divulgación (NDA)",
            warranty: "Privacidad y cifrado de extremo a extremo",
            puntos: [
                "Firma previa de NDA antes de tener acceso a cualquier activo corporativo.",
                "Almacenamiento cifrado de todas las evidencias y reportes generados.",
                "Destrucción segura y definitiva de los datos una vez entregado el proyecto."
            ]
        },
        enfoque: {
            titulo: "Enfoque Práctico y Real",
            sub: "Te decimos exactamente qué arreglar primero según el riesgo real y el impacto a tu negocio.",
            docKey: "Matriz de Priorización de Riesgos",
            warranty: "Enfoque directo a la mitigación de amenazas reales",
            features: [
                "Clasificación basada en el impacto real al negocio y no solo en métricas teóricas.",
                "Identificación de vulnerabilidades críticas que requieren atención inmediata.",
                "Asesoría durante el proceso de corrección y parcheo."
            ]
        }
    };

    tarjetas.forEach(card => {
        card.addEventListener("click", () => {
            const key = card.getAttribute("data-compromiso");
            const info = datosCompromiso[key];

            if (info && modal) {
                tituloModal.textContent = info.titulo;
                subModal.textContent = info.sub;
                docKeyModal.textContent = info.docKey;
                warrantyModal.textContent = info.warranty;
                
                listaModal.innerHTML = "";
                const puntosUsar = info.puntos || info.features;
                puntosUsar.forEach(punto => {
                    const li = document.createElement("li");
                    li.textContent = punto;
                    listaModal.appendChild(li);
                });

                modal.classList.add("active");
            }
        });
    });

    if (cerrarBtn) {
        cerrarBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }
});

let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

function moveSlide(step) {
    showSlide(currentIndex + step);
}

function currentSlide(index) {
    showSlide(index - 1);
}

let autoPlay = setInterval(() => {
    moveSlide(1);
}, 4000);

const carousel = document.querySelector('.carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlay);
    });

    carousel.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            moveSlide(1);
        }, 4000);
    });
}
