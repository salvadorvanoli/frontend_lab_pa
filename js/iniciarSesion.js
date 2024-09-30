document.addEventListener('DOMContentLoaded', function() {
    const buttonIniciarSesion = document.querySelector('.button-iniciarSesion');
    
    buttonIniciarSesion.onclick = function() {
        const emailOrNickname = document.getElementById('floatingInput').value.trim();
        const password = document.getElementById('floatingRepeatPassword').value.trim();
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

        if (usuarioActual) {
            const existe = (usuarioActual.email === emailOrNickname || usuarioActual.nickname === emailOrNickname) && usuarioActual.contraseña === password;

            if (existe) {
                alert('Inicio de sesión exitoso!');
            } else {
                alert('Correo electrónico/nickname o contraseña incorrectos.');
            }
        } else {
            alert('No se encontró ningún usuario registrado.');
        }
    };
});
