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

  

    

  
