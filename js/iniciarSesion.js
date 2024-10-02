document.addEventListener('DOMContentLoaded', function() {
    const buttonIniciarSesion = document.querySelector('.button-iniciarSesion');
    const errorMensajeDiv = document.getElementById('error-mensaje'); 

    buttonIniciarSesion.onclick = function() {
        const emailOrNickname = document.getElementById('floatingInput').value.trim();
        const password = document.getElementById('floatingRepeatPassword').value.trim();
        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        errorMensajeDiv.style.display = 'none'; 
        errorMensajeDiv.textContent = '';

        
        const usuarioActual = usuariosRegistrados.find(usuario => 
            (usuario.email === emailOrNickname || usuario.nickname === emailOrNickname) && usuario.contraseña === password
        );

        if (usuarioActual) {
            alert('Inicio de sesión exitoso!');
            window.location.href = 'menuPrincipal.html';
        } else {
            errorMensajeDiv.textContent = 'Correo electrónico/nickname o contraseña incorrectos.';
            errorMensajeDiv.style.display = 'block';
        }
    };
});
