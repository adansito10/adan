// login.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        // Obtén los valores del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

          // Define usuarios válidos y sus contraseñas
          const users = {
            'cesar@example.com': 'password123',
            // Agrega más usuarios aquí si es necesario
        };

        // Aquí puedes agregar la lógica de validación. Para simplificar, vamos a usar valores fijos.
        const validEmail = 'cesar@gmail.com';
        const validPassword = 'password123';

        if (email === validEmail && password === validPassword) {
            // Redirige al panel administrativo si la validación es exitosa
            window.location.href = 'panel.html'; // Cambia 'panel.html' por la URL de tu panel
        } else {
            // Muestra un mensaje de error si la validación falla
            const alertContainer = document.getElementById('alert-container');
            alertContainer.innerHTML = '<div class="alert alert-danger">Correo o contraseña incorrectos</div>';
        }
    });
});
