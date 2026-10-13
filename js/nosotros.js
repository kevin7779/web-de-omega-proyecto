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
                setTimeout(escribirTexto, 45); // Velocidad de escritura en milisegundos
            }
        }
        
        // Retraso inicial antes de empezar a escribir
        setTimeout(escribirTexto, 300);
    }

    // ==========================================
    // 2. ANIMACIÓN DE APARICIÓN AL HACER SCROLL (INTERSECTION OBSERVER)
    // ==========================================
    // Seleccionamos las tarjetas y secciones que queremos animar
    const elementosAnimar = document.querySelectorAll(".tarjeta-card, .titulo-compromisos, .banner-texto");

    // Estilos iniciales para la animación
    elementosAnimar.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // Deja de observar una vez animado
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    elementosAnimar.forEach(el => observer.observe(el));

    

    // ==========================================
    // 4. NAVBAR DINÁMICO AL HACER SCROLL
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
});
