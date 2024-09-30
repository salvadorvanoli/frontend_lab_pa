document.addEventListener('DOMContentLoaded', function() {
    const buttonRegistrar = document.querySelector('.button-registrar');

    buttonRegistrar.onclick = function() {
        const email = document.getElementById('floatingInput').value.trim();
        const nickname = document.getElementById('floatingInputNickname').value.trim();

        if (!email || !nickname) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
        //console.log('Usuarios registrados:', usuariosRegistrados); 

        const usuarioExistente = usuariosRegistrados.find(user => user.email === email || user.nickname === nickname);
        //console.log('Usuario existente:', usuarioExistente);

        if (usuarioExistente) {
            alert('Ya existe un usuario registrado con ese email o nickname.');
        } else {
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
