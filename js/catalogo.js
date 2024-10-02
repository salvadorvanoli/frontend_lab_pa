document.querySelectorAll('.dropdown-item input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener('click', function (e) {
        e.stopPropagation(); 
    });
});

//productoSeleccionado 

let producto = document.getElementById("producto1");

producto.addEventListener('click', function() {
    productoSeleccionado = producto.nombre;
    cargarProducto();
});

function cargarCatalogo() {
    const prod = JSON.parse(localStorage.getItem('productos')) || [];


    if (prod.length === 0){ /* aunque parezca raro es con tres '=' */
        return;
    }

    const contenedorPadre = document.getElementById("prods");


    prod.forEach(element => {
        const nuevoRectangulo = document.createElement("article");
        const nuevaImagen = document.createElement("img");
        const nuevoDemas = document.createElement("div");

        const padreItemEstrellas = document.createElement("div");
        const nuevoTitulo = document.createElement("div");
        const nuevoConjuntoEstrellas = document.createElement("div");

        const nuevaTienda = document.createElement("div");

        const padrePrecioCarrito = document.createElement("div");
        const nuevoPrecio = document.createElement("div");
        const nuevoCarrito = document.createElement("div");

        nuevaImagen.src = element.nuevaImagen; // inchequeable part 1: hay mas de una imagen(?

        let estrellasMarcadas = element.estrellas;

        for (let i = 1; i <= 5; i++) {
            let star = document.createElement("span");
            if (estrellasMarcadas > 0) {
                star.classList.add("fa", "fa-star", "checked");
                estrellasMarcadas--;
            } else {
                star.classList.add("fa", "fa-star");
            }

            nuevoConjuntoEstrellas.appendChild(star);
        }

        //agregar contenido al div
        nuevoTitulo.innerHTML = element.nombre;
        nuevoPrecio.innerHTML = element.precio;
        nuevaTienda.innerHTML = element.tienda; // inchequeable part 2: no existe tal atributo

        //agregar clases o atributos si es necesario
        nuevoRectangulo.classList.add("rectangle-1", "row");

        nuevaImagen.classList.add("col-3", "image-1");
        
        nuevoDemas.classList.add("col-9", "row", "todo-lodemas");

        padreItemEstrellas.classList.add("row", "col-12", "item-estrellas");
        nuevoTitulo.classList.add("col", "item-1");
        nuevoConjuntoEstrellas.classList.add("col", "conjunto_estrellas");
        
        
        nuevaTienda.classList.add("tienda-x", "col-12");

        padrePrecioCarrito.classList.add("row", "precio-carrito");
        nuevoPrecio.classList.add("col-6", "precio");
        nuevoCarrito.classList.add("col", "carrito", "fa-solid", "fa-cart-shopping");

        //meterlos contenedores en el contenedor principal
        padreItemEstrellas.appendChild(nuevoTitulo);
        padreItemEstrellas.appendChild(nuevoConjuntoEstrellas);
    
        padrePrecioCarrito.appendChild(nuevoPrecio);
        padrePrecioCarrito.appendChild(nuevoCarrito);

        nuevoDemas.appendChild(padreItemEstrellas);
        nuevoDemas.appendChild(nuevaTienda);
        nuevoDemas.appendChild(padrePrecioCarrito);

        nuevoRectangulo.appendChild(nuevaImagen);
        nuevoRectangulo.appendChild(nuevoDemas);

        contenedorPadre.appendChild(nuevoRectangulo);
    });
}

cargarCatalogo();
