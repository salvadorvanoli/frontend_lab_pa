document.addEventListener('DOMContentLoaded', function() {
    const buttonRegistrar = document.getElementById('button-registrar');
    const buttonCancelar = document.getElementById('button-cancelar');
    const sitioWebInput = document.getElementById('floatingInputSitioWeb');
    const companiaInput = document.getElementById('floatingInputCompania');

    // Habilitar/deshabilitar los campos
    function toggleInputs() {
        const tipoUsuarioElement = document.querySelector('input[name="tipoUsuario"]:checked');
        const tipoUsuario = tipoUsuarioElement ? tipoUsuarioElement.value : undefined;

        if (tipoUsuario === 'Cliente') {
            sitioWebInput.disabled = true; 
            companiaInput.disabled = true;   
        } else {
            sitioWebInput.disabled = false;
            companiaInput.disabled = false; 
        }
    }

    const buttonElegirImagen = document.getElementById('buttonElegirImagen');
    const inputImagen = document.getElementById('inputImagen');
    const iconoUsuario = document.getElementById('icono-usuario2');

    buttonElegirImagen.onclick = function() {
        inputImagen.click(); // abrir el selectr de archivos
    };

    // Para reemplazar el icono con la imagen (queda raro)
    inputImagen.onchange = function(event) {
        const archivo = event.target.files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result; 
                img.style.width = '100%'; 
                img.style.height = '100%'; 
                img.style.borderRadius = '100%'; 
                img.style.objectFit = 'cover'; 
                img.style.display = 'block'; 
                img.style.margin = 'auto'; 
                img.style.maxWidth = '150px'; 
                img.style.maxHeight = '150px'; 

                iconoUsuario.replaceWith(img); 
            };
            reader.readAsDataURL(archivo);
        }
    };

    // radios de tipo de usuario
    const radios = document.querySelectorAll('input[name="tipoUsuario"]');
    radios.forEach(radio => {
        radio.addEventListener('change', toggleInputs);
    });

    toggleInputs();

    if (buttonRegistrar) {
        buttonRegistrar.onclick = function() {
            const nombre = document.getElementById('floatingInputNombre').value.trim();
            const apellido = document.getElementById('floatingInputApellido').value.trim();
            const contraseña = document.getElementById('floatingPassword').value;
            const repetirContraseña = document.getElementById('floatingRepeatPassword').value;
            const fecha = document.getElementById('floatingDate').value;
            const sitioWeb = sitioWebInput.value.trim();
            const compania = companiaInput.value.trim();
            const credencialesTemp = JSON.parse(localStorage.getItem('credencialesTemp'));
            const email = credencialesTemp.email;
            const nickname = credencialesTemp.nickname;

            const tipoUsuarioElement = document.querySelector('input[name="tipoUsuario"]:checked');
            const tipoUsuario = tipoUsuarioElement ? tipoUsuarioElement.value : undefined;

            if (!nombre || !apellido || !contraseña || !repetirContraseña || !fecha || !tipoUsuario) {
                alert('Por favor, complete todos los campos requeridos.');
                return;
            }
            if (nombre.length < 3) {
                alert('El nombre no puede ser menor a 3 caracteres.');
                return;
            }
            if (apellido.length < 3) {
                alert('El apellido no puede ser menor a 3 caracteres.');
                return;
            }
            if (contraseña.length < 8 || repetirContraseña.length < 8) {
                alert('La contraseña debe tener como mínimo 8 caracteres.');
                return;
            }
            if (contraseña !== repetirContraseña) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            if (tipoUsuario !== 'Cliente' && sitioWeb && !validarUrl(sitioWeb)) {
                alert('La URL del sitio web no es válida. Debe tener exactamente 2 puntos.');
                return;
            }
            if (tipoUsuario !== 'Cliente' && !sitioWeb || !compania) {
                alert('Por favor, complete todos los campos requeridos.');
                return;
            }

            const usuario = {
                nombre: nombre,
                apellido: apellido,
                nickname: nickname,
                email: email,
                contraseña: contraseña,
                fecha: fecha,
                sitioWeb: sitioWeb,
                compania: compania,
                tipo: tipoUsuario
            };

            let usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
            
            usuariosRegistrados.push(usuario); 

            localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

            alert('Registro exitoso.');
        };
    } else {
        console.error('El botón de registrar no se encontró.');
    }

    // Cancelar
    if (buttonCancelar) {
        buttonCancelar.onclick = function() {
            // Reiniciar los campos
            document.getElementById('floatingInputNombre').value = '';
            document.getElementById('floatingInputApellido').value = '';
            document.getElementById('floatingPassword').value = '';
            document.getElementById('floatingRepeatPassword').value = '';
            document.getElementById('floatingDate').value = '';
            sitioWebInput.value = '';
            companiaInput.value = '';

            // Desmarcar los radio
            radios.forEach(radio => {
                radio.checked = false;
            });

            alert('Registro cancelado.');
        };
    } else {
        console.error('El botón de cancelar no se encontró.');
    }
});

// Validar la URL
function validarUrl(url) {
    const regex = /^(https?:\/\/)?[a-zA-Z0-9.-]+(\.[a-zA-Z0-9.-]+){2}([\/\w .-]*)*\/?$/;
    const puntos = (url.match(/\./g) || []).length; 
    return regex.test(url) && puntos === 2; 
}
