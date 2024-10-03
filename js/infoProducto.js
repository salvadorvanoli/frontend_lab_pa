let productoSeleccionado = JSON.parse(localStorage.getItem("productoSeleccionado")) || productos[0];

// Lógica para cargar el producto en la página

function cargarProducto(){
    // Nombre del producto
    document.getElementById("nombre-producto").innerHTML = productoSeleccionado.nombre;

    // Estrellas
    document.getElementById("estrellas-container").innerHTML += "";
    for(let i=0; i<productoSeleccionado.estrellas; i++){
        document.getElementById("estrellas-container").innerHTML += `<i class="fas fa-star" style="color: #7A7A7A;"></i>`;
    }
    for(let i=0; i<(5 - productoSeleccionado.estrellas); i++){
        document.getElementById("estrellas-container").innerHTML += `<i class="fas fa-star" style="color: #EBEBEB;"></i>`;
    }

    // Precio
    document.getElementById("precio-container").innerHTML = "$" + productoSeleccionado.precio;

    // Descripcion
    document.getElementById("descripcion-texto").innerHTML = productoSeleccionado.descripcion;

    // Número del producto
    document.getElementById("numero-producto").innerHTML = "Identificador del producto: " + productoSeleccionado.id;

    // Categorías
    let categoriasDelProducto = "Categorías: ";
    for(let categoria of productoSeleccionado.categorias) {
        categoriasDelProducto += categoria + ", ";
    }
    categoriasDelProducto = categoriasDelProducto.slice(0, -2);
    document.getElementById("categorias-container").innerHTML = categoriasDelProducto;

    // Especificaciones
    let htmlToInsert = `
        <ul>
    `;
    for(let especificacion of productoSeleccionado.especificaciones) {
        htmlToInsert += `
            <li>${especificacion}</li>
        `;
    }
    htmlToInsert += `
        </ul>
    `;
    document.getElementById("especificaciones-container").innerHTML = htmlToInsert;

    // Imágenes
    let contador = 0;
    for(let imagen of productoSeleccionado.imagenes) {
        if(contador == 0){
            document.getElementById("indicadores-carrusel").innerHTML += `
            <li data-bs-target="#imgCarousel" data-slide-to="${contador}" class="active"></li>
            `;
        } else {
            document.getElementById("indicadores-carrusel").innerHTML += `
            <li data-bs-target="#imgCarousel" data-slide-to="${contador}" class=""></li>
            `;
        }
        

        if(contador == 0){
            document.getElementById("item-carrusel").innerHTML += `
            <div class="carousel-item active">
                <img class="d-block w-100" src="${imagen}" alt="Slide">
            </div>
            `;
        } else {
            document.getElementById("item-carrusel").innerHTML += `
            <div class="carousel-item">
                <img class="d-block w-100" src="${imagen}" alt="Slide">
            </div>
            `;
        }
        
        contador++;
    }

    if(productoSeleccionado.imagenes.length == 0) {
        document.getElementById("imgCarousel").style.display = "none";
        document.getElementById("informacion-producto-container").classList.remove("col-md-6");
        document.getElementById("informacion-producto-container").classList.add("col-md-12");
        document.getElementById("numero-producto").style.textAlign = "left";
    }

    // Comentarios
    let comentarios = cargarComentarios() || "";
    if(comentarios == "") {
        document.getElementById("comentarios-container").innerHTML = `
        <div style="text-align:center;color:red;font-weight:bolder;"> Este producto aún no tiene comentarios </div>
        `;
    } else {
        document.getElementById("comentarios-container").innerHTML = comentarios;
    }
}

function cargarComentarios() {

    let comentarios = "";

    for(let comentario of productoSeleccionado.comentarios) {

        let respuestasComentarios = `
        `;

        for(let respuesta of comentario.respuestas) {
            respuestasComentarios += `
                <div class="carta-comentarios row">
                    <div class="informacion-usuario col-md-3 col-12">
                        <img src="${respuesta.foto}" alt="Perfil usuario" class="imagen-usuario">
                        <div>
                            <h4>${respuesta.usuario}</h4>
                            <p class="fecha">${respuesta.fecha}</p>
                        </div>
                    </div>
                    <div class="texto-comentario col-md-8 col-12">
                        ${respuesta.comentario}
                    </div>

                </div>
            `;
        }

        let estrellas = `
        `;

        for(let i=0; i<comentario.estrellas; i++) {
            estrellas += `<i class="fas fa-star" style="color: #7A7A7A;"></i>`;
        }

        for(let i=0; i<(5 - comentario.estrellas); i++){
            estrellas += `<i class="fas fa-star" style="color: #EBEBEB;"></i>`;
        }

        comentarios += `
            <div class="comentario-respuesta-container container-md container-fluid">
                    <div class="carta-comentarios row">
                        <div class="informacion-usuario col-md-3 col-12">
                            <img src="img/Flamin-Go.webp" alt="Perfil usuario" class="imagen-usuario">
                            <div>
                                <h4>${comentario.usuario}</h4>
                                <p class="fecha">${comentario.fecha}</p>
                                <div class="estrellas">
                                    ${estrellas}
                                </div>
                            </div>
                        </div>
                        <div class="texto-comentario col-md-8 col-12">
                            ${comentario.comentario}
                        </div>
    
                    </div>

                    <div class="respuestas-comentario">
                        ${respuestasComentarios}
                    </div>
            </div>
        `;
    }

    return comentarios;
}

cargarProducto();

// Lógica para agregar un producto al carrito

function itemYaExiste(item) {
    let carritoActual = JSON.parse(localStorage.getItem("carritoActual")) || "";

    for(let producto of carritoActual) {
        if(item.id == producto.id) {
            return true;
        }
    }
    return false;
}

function checkCantidad() {
    let cantidad = parseInt(document.getElementById("cantidad-input").value) || 1;
    if(cantidad < 1) {
        cantidad = 1;
    }
    return cantidad;
}

document.getElementById("agregar-al-carrito").addEventListener("click", () => {
    let carritoActual = JSON.parse(localStorage.getItem("carritoActual")) || [];
    
    if(itemYaExiste(productoSeleccionado)) {
        mostrarAlerta("El item elegido ya existe en el carrito, no se volvió a agregar");
        document.getElementById("modalTitle").innerHTML = "El item elegido ya existe en el carrito, no se volvió a agregar";
    } else {
        document.getElementById("modalTitle").innerHTML = "¡Producto agregado con éxito!";
        carritoActual.push({
            "nombre": productoSeleccionado.nombre || "",
            "precio": productoSeleccionado.precio || 0,
            "descripcion": productoSeleccionado.descripcion || "",
            "imagenes": productoSeleccionado.imagenes || [],
            "id": productoSeleccionado.id || 0,
            "cantidad": checkCantidad() || 1
        });
    }

    localStorage.setItem("carritoActual", JSON.stringify(carritoActual));
});