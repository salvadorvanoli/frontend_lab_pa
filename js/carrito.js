const subtotales = document.querySelectorAll(".precio-subtotal");
const envios = document.querySelectorAll(".precio-envio");
const impuestos = document.querySelectorAll(".precio-impuestos");
const totales = document.querySelectorAll(".precio-total");

const envioGratis = document.querySelector("#envioGratis");
const envioVip = document.querySelector("#envioVip");


function modificarTextos(array, text){
    array.forEach(item => {
        item.textContent = text;
    });
}


const carrito = document.querySelector("#carrito");
const contenedoresSecundarios = document.querySelectorAll(".contenedor-secundario");

function cargarElementosCarrito(array){
    if (array.length === 0){
        return;
    } else {
        let subtotal = 0;
        array.forEach(element => {
            let itemCarrito = document.createElement("div");
            itemCarrito.innerHTML = 
                `<div class="row my-3 d-flex align-items-center" id="producto${element.id}">
                    <div class="col-sm-3 col-4 d-flex align-items-center justify-content-center">
                        <img class="w-75" src="${element.imagenes[0]}" alt="${element.nombre}">
                    </div>
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
                            <input type="number" name="cantidad" class="cantidad-producto" min="1" required value="${element.cantidad}" onchange="manejarCantidad(this, ${element.id})">
                            <div class="invalid-feedback">
                                <i class="fa-solid fa-triangle-exclamation"></i> Valor inválido.
                            </div>
                        </div>
                        <br>
                        <div class="col-12">    
                            <button type="button" class="btn btn-danger text-nowrap" onclick="eliminarItem(${element.id})"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                </div>`;

            carrito.appendChild(itemCarrito);

            contenedoresSecundarios.forEach(contenedor => {

                let itemContenedor = document.createElement("div");
                itemContenedor.innerHTML =
                    `<div class="row my-3 d-flex align-items-center producto-secundario${element.id}">
                        <div class="col-4 d-flex align-items-center justify-content-center">
                            <img class="w-75" src="${element.imagenes[0]}" alt="Zucaritas">
                        </div>
                        <div class="col-4">
                            <div class="row titulo-producto">
                                <p>${element.nombre}</p>
                            </div>
                            <div class="row precio-producto">
                                <p>$${element.precio}</p>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="col-12">
                                <label for="cantidad">Cant.</label>
                                <input type="number" name="cantidad" class="cantidad-producto" disabled value="${element.cantidad}">
                            </div>
                        </div>
                    </div>`;

                contenedor.appendChild(itemContenedor);
            });

            subtotal += element.precio * element.cantidad;

        });

        modificarTextos(subtotales, "$" + subtotal);
        modificarTextos(envios, "GRATIS");
        modificarTextos(impuestos, "$" + subtotal * 0.02);
        modificarTextos(totales, "$" + subtotal * 1.02);

    }
}


function modificarAllTextos(array){
    let subtotal = 0;

    array.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });

    modificarTextos(subtotales, "$" + subtotal);
    if (envioGratis.checked){
        modificarTextos(envios, "GRATIS");
    } else {
        modificarTextos(envios, "$20");
        subtotal += 20;
    }
    modificarTextos(impuestos, "$" + subtotal * 0.02);
    modificarTextos(totales, "$" + subtotal * 1.02);
}


function manejarCantidad(input, id){
    cantidad = Number.parseInt(input.value);
    if ( !(Number.isInteger(cantidad)) || cantidad < 1){
        input.value = 1;
    }

    const carritoActual = JSON.parse(localStorage.getItem('carritoActual'));

    for (let i = 0; i < carritoActual.length; i++){
        if (carritoActual[i].id == id){
            carritoActual[i].cantidad = Number.parseInt(input.value);
            break;
        }
    }

    const itemsSecundarios = document.querySelectorAll(".producto-secundario" + id);

    itemsSecundarios.forEach(itemSecundario => {
        itemSecundario.querySelector(".cantidad-producto").value = input.value;
    });

    localStorage.setItem("carritoActual", JSON.stringify(carritoActual));

    modificarAllTextos(carritoActual);

}


function eliminarItem(id){

    const carritoActual = JSON.parse(localStorage.getItem("carritoActual"));
    
    for (let i = 0; i < carritoActual.length; i++){
        if (carritoActual[i].id == id){
            carritoActual.splice(i, 1);
            break;
        }
    }

    localStorage.setItem("carritoActual", JSON.stringify(carritoActual));

    modificarAllTextos(carritoActual);

    const item = document.querySelector("#producto" + id);
    item.remove();

    const itemsSecundarios = document.querySelectorAll(".producto-secundario" + id);

    itemsSecundarios.forEach(itemSecundario => {
        itemSecundario.remove();
    });

}


function modificarEnvio(){
    const carritoActual = JSON.parse(localStorage.getItem("carritoActual"));
    let subtotal = 0;
    carritoActual.forEach(element => {
        subtotal += element.precio * element.cantidad;
    });

    console.log(envioGratis.checked);

    if (envioGratis.checked){
        modificarTextos(envios, "GRATIS");
        modificarTextos(impuestos, "$" + (subtotal) * 0.02)
        modificarTextos(totales, "$" + ((subtotal) + (subtotal) * 0.02));
    } else {
        modificarTextos(envios, "$20");
        modificarTextos(impuestos, "$" + (subtotal + 20) * 0.02)
        modificarTextos(totales, "$" + ((subtotal + 20) + (subtotal + 20) * 0.02));
    }
}

let alertaEnPantalla = false;

function mostrarAlerta(message){
    if (!alertaEnPantalla){
        const div = document.createElement("div");
        div.innerHTML = 
            `<div class="alert alert-warning alert-dismissible fade show alerta-carrito fs-5 d-flex justify-items-center align-items-center" role="alert" id="alertaFormulario">
                <strong><i class="fa-solid fa-triangle-exclamation me-3"></i></strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="alertaEnPantalla=false;"></button>
            </div>`;
        document.body.appendChild(div);
        alertaEnPantalla = true;
    }
}


// Codigo que saque del document.addEventListener:


const encabezado1 = document.querySelector("#encabezado1");
const seccion1 = document.querySelector("#seccion1");

const encabezado2 = document.querySelector("#encabezado2");
const seccion2 = document.querySelector("#seccion2");

const encabezado3 = document.querySelector("#encabezado3");
const seccion3 = document.querySelector("#seccion3");

const form1 = document.querySelector("#formCarrito");
const form2 = document.querySelector("#formEnvio");
const form3 = document.querySelector("#formPago");
const formFinal = document.querySelector("#formFinal");

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
    } else {
        if (document.querySelector("#alertaFormulario") == null){
            mostrarAlerta("Aún hay campos incompletos o con valores inválidos.");
        }
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
    } else {
        if (document.querySelector("#alertaFormulario") == null){
            mostrarAlerta("Aún hay campos incompletos o con valores inválidos.");
        }
    }

    form2.classList.add('was-validated');
}, false);

form3.addEventListener("submit", function(e) {
    e.preventDefault();
    e.stopPropagation();
    let formulariosValidos = true;
    let mensajeError = "";
    if (form3.checkValidity()) {
        if (form2.checkValidity()) {
            if (form1.checkValidity()) {

            } else {
                mensajeError = "<i class='fa-solid fa-triangle-exclamation me-3'></i>Se encontraron errores de validación en el Carrito de Compra."
                formulariosValidos = false;
            }
        } else {
            formulariosValidos = false;
            if (mensajeError == ""){
                mensajeError = mensajeError.slice(0, -1);
                mensajeError += " y en los Detalles del envío.";
            } else {
                mensajeError = "<i class='fa-solid fa-triangle-exclamation me-3'></i>Se encontraron errores de validación en los Detalles del envío."
            }
        }
        // Chequear los otros 2, agregarlos al cuarto formulario, mensaje de exito, y submit
    } else {
        if (document.querySelector("#alertaFormulario") == null){
            mostrarAlerta("Aún hay campos incompletos o con valores inválidos.");
        }
    }

    form3.classList.add('was-validated');
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

async function cargarCiudades() {
    const regiones = await getRegiones();
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




// localStorage.setItem("carritoActual", '[{"nombre":"Zucaritas","precio":300,"descripcion":"Muy ricas, sisi muy muy ricas","imagenes":["/img/test.jpg","/img/test.jpg"],"id":"777","cantidad":7},{"nombre":"Laptop","precio":7000,"descripcion":"Super potente master","imagenes":["img/Zucaritas.webp"],"id":"69","cantidad":4}]')

let carritoActual = JSON.parse(localStorage.getItem('carritoActual'));

console.log(carritoActual);

cargarElementosCarrito(carritoActual);

departamentos.addEventListener("change", async function(e){
    if (departamentos.value != ""){
        ciudades.removeAttribute('disabled');
        await cargarCiudades();
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


/* DUDOSO
document.addEventListener("DOMContentLoaded", async function(e) {

    





});

*/