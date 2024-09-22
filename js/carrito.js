document.addEventListener("DOMContentLoaded", async function(e) {

    const encabezado1 = document.querySelector("#encabezado1");
    const seccion1 = document.querySelector("#seccion1");
    
    const encabezado2 = document.querySelector("#encabezado2");
    const seccion2 = document.querySelector("#seccion2");
    
    const encabezado3 = document.querySelector("#encabezado3");
    const seccion3 = document.querySelector("#seccion3");
    
    const form1 = document.querySelector("#formCarrito");
    const form2 = document.querySelector("#formEnvio");

    const departamentos = document.querySelector("#departamento");
    const ciudades = document.querySelector("#ciudad");

    form1.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (form1.checkValidity()) {
            encabezado1.classList.add("d-none");
            seccion1.classList.add("d-none");
            encabezado2.classList.remove("d-none");
            seccion2.classList.remove("d-none");
        }

        form1.classList.add('was-validated');
    }, false);

    form2.addEventListener("submit", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (form2.checkValidity()) {
            encabezado2.classList.add("d-none");
            seccion2.classList.add("d-none");
            encabezado3.classList.remove("d-none");
            seccion3.classList.remove("d-none");
        }

        form2.classList.add('was-validated');
    }, false);

    volver = document.querySelector("#botonVolver");

    volver.addEventListener("click", function(e) {
        // Te redirige a inicio
    });

    atras1 = document.querySelector("#botonAtras1");

    atras1.addEventListener("click", function(e) {
        encabezado2.classList.add("d-none");
        seccion2.classList.add("d-none");
        encabezado1.classList.remove("d-none");
        seccion1.classList.remove("d-none");
    });

    atras2 = document.querySelector("#botonAtras2");

    atras2.addEventListener("click", function(e) {
        encabezado3.classList.add("d-none");
        seccion3.classList.add("d-none");
        encabezado2.classList.remove("d-none");
        seccion2.classList.remove("d-none");
    });

    async function getRegiones() {
        const urlRegionesUruguay = "https://gist.githubusercontent.com/fedebabrauskas/b708c2a1b7a29af94927ad0e8d6d6a27/raw/b0c544d53c82de298ccedb824f8dd5e5ef5477e7/localidades.json"
        try {
            const response = await fetch(urlRegionesUruguay);
            if (!response.ok){
                throw new Error("Response status: " + response.status);
            }
            const json = await response.json();
            console.log(json);
            return json;
        } catch (error) {
            console.log(error.message);
        }
    }

    const regiones = await getRegiones();


    function cargarCiudades() {
        regiones.forEach(region => {
            if (region.name == departamentos.value){   
                if (region.towns.length != 0){
                    ciudades.textContent = "";
                    region.towns.forEach(town => {
                        const option = document.createElement("option");
                        const text = document.createTextNode(town.name);
                        option.setAttribute("value", town.name);
                        option.appendChild(text);
                        ciudades.appendChild(option);
                    });
                    return;
                }
            }
        });
    }




    const carrito = document.querySelector("#carrito");

    function cargarElementosCarrito(array){
        if (array.length === 0){
            return;
        } else {
            let subtotal = 0;
            array.forEach(element => {
                let itemCarrito = document.createElement("div");
                itemCarrito.innerHTML = 
                    `<div class="row my-3 d-flex align-items-center">
                        <img class="col-sm-3 col-4" src="${element.imagenes[0]}" alt="${element.nombre}">
                        <div class="col-sm-6 col-4">
                            <div class="row titulo-producto">
                                <p class="col-sm-6 col-12">${element.nombre}</p>
                                <p class="col-sm-6 col-12">Nro. ${element.id}</p>
                            </div>
                            <div class="row descripcion-producto d-none d-sm-block">
                                <p>${element.descripcion}</p>
                            </div>
                            <div class="row precio-producto">
                                <p>$${element.precio}</p>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="col-12">
                                <label for="cantidad">Cantidad</label>
                                <input type="number" name="cantidad" class="cantidad-producto" min="1" required value="${element.cantidad}">
                                <div class="invalid-feedback">
                                    <i class="fa-solid fa-triangle-exclamation"></i> Valor inválido.
                                </div>
                            </div>
                            <br>
                            <div class="col-12">    
                                <button type="button" class="btn btn-danger text-nowrap"><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>
                    </div>`;

                carrito.appendChild(itemCarrito);

                subtotal += element.precio * element.cantidad;

            });

            const subtotales = document.querySelectorAll(".precio-subtotal");
            const envios = document.querySelectorAll(".precio-envio");
            const impuestos = document.querySelectorAll(".precio-impuestos");
            const totales = document.querySelectorAll(".precio-total");

            modificarTextos(subtotales, "$" + subtotal);
            modificarTextos(envios, "GRATIS");
            modificarTextos(impuestos, "$" + subtotal * 0.02);
            modificarTextos(totales, "$" + subtotal * 1.02);

        }
    }

    function modificarTextos(array, text){
        array.forEach(item => {
            item.textContent = text;
        });
    }

    let carritoActual = JSON.parse(localStorage.getItem('carritoActual'));

    console.log(carritoActual);

    cargarElementosCarrito(carritoActual);

    departamentos.addEventListener("change", function(e){
        if (departamentos.value != ""){
            ciudades.removeAttribute('disabled');
            cargarCiudades();
        } else {
            ciudades.setAttribute('disabled', true);
            ciudades.textContent = "";
            const option = document.createElement("option");
            const text = document.createTextNode("Elige una ciudad");
            option.setAttribute("value", "");
            option.appendChild(text);
            ciudades.appendChild(option);
        }
    });
    
    departamentos.value = "";











    /*
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
        'use strict'
    
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
    
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
        
                form.classList.add('was-validated');
            }, false)
        })
    })()

    */

});