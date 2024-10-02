document.addEventListener('DOMContentLoaded', function() {
    const buttonRegistrar = document.querySelector('.button-registrar');
    const emailInput = document.getElementById('floatingInput');
    const nicknameInput = document.getElementById('floatingInputNickname');
    const emailWarning = document.getElementById('emailWarning');
    const nicknameWarning = document.getElementById('nicknameWarning');

    // Función para validar el formato de correo electrónico
    function esCorreoValido(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Verificar si el email ya existe en tiempo real
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

        const emailExiste = usuariosRegistrados.some(user => user.email === email);

        if (!esCorreoValido(email)) {
            emailWarning.textContent = 'Por favor, introduce un correo electrónico válido.';
            emailInput.classList.add('is-invalid');
        } else if (emailExiste) {
            emailWarning.textContent = 'Este correo ya está registrado.';
            emailInput.classList.add('is-invalid');
        } else {
            emailWarning.textContent = '';
            emailInput.classList.remove('is-invalid');
        }
    });

    // Verificar si el nickname ya existe en tiempo real
    nicknameInput.addEventListener('input', function() {
        const nickname = nicknameInput.value.trim();
        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

        const nicknameExiste = usuariosRegistrados.some(user => user.nickname === nickname);

        if (nicknameExiste) {
            nicknameWarning.textContent = 'Este nickname ya está registrado.';
            nicknameInput.classList.add('is-invalid');
        } else {
            nicknameWarning.textContent = '';
            nicknameInput.classList.remove('is-invalid');
        }
    });

    // Manejo del evento onclick para el botón de registrar
    buttonRegistrar.onclick = function() {
        const email = emailInput.value.trim();
        const nickname = nicknameInput.value.trim();

        // Verificar que ambos campos están completos
        if (!email || !nickname) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Verificar que el email tiene un formato válido
        if (!esCorreoValido(email)) {
            alert('Por favor, introduce un correo electrónico válido.');
            emailInput.classList.add('is-invalid');
            return;
        }

        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar si ya existe un usuario con el mismo email o nickname
        const usuarioExistente = usuariosRegistrados.find(user => user.email === email || user.nickname === nickname);

        if (usuarioExistente) {
            alert('Ya existe un usuario registrado con ese email o nickname.');
        } else {
            // Guardar las credenciales temporales
            const credencialesTemp = {
                email: email,
                nickname: nickname
            };
            localStorage.setItem('credencialesTemp', JSON.stringify(credencialesTemp));

            alert('Credenciales temporales guardadas. Procede al siguiente paso.');
            window.location.href = 'ingresarDatos.html';
        }
    };
});
