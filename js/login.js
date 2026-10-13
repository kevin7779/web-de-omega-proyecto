 document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que se recargue la página vacía
            alert('¡Inicio de sesión exitoso!');
            window.location.href = 'index.html'; // Redirige al inicio
        });

         function togglePasswordVisibility(fieldId, iconId) {
            const passwordInput = document.getElementById(fieldId);
            const eyeIcon = document.getElementById(iconId);

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        }