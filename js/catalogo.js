document.querySelectorAll('.dropdown-item input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener('click', function (e) {
        e.stopPropagation(); 
    });
});

//productoSeleccionado 

let producto = document.getElementById("producto1");

prod.addEventListener('click', function() {
    productoSeleccionado = producto;
    cargarProducto();
    window.open("'../infoProducto.html'", "_blank"); //ni idea si esto esta bien
});

function cargarCatalogo() {
    const prod = JSON.parse(localStorage.getItem('productos')) || [];

    if (prod.length === 0){ /* aunque parezca raro es con tres '=' */
        return;
    }

    const contenedorPadre = document.getElementById("prods");

    document.getElementById("crearDiv").addEventListener("click", function() {
        prod.forEach(element => {
            const nuevoRectangulo = document.createElement("article");

            const nuevaImagen = document.createElement("img");

            const padreEstrellasTitulo = document.createElement("div");
            const nuevoTitulo = document.createElement("div");
            const nuevoConjuntoEstrellas = document.createElement("div");

            const nuevaTienda = document.createElement("div");

            const padrePrecioCarrito = document.createElement("div");
            const nuevoPrecio = document.createElement("div");
            const nuevoCarrito = document.createElement("div");

            nuevaImagen.src = element.nuevaImagen; // inchequeable part 1: hay mas de una imagen(?

            let estrellasMarcadas = element.estrellas;

            for (let i = 1; i <= 5; i++) {
                let star = document.createElement("li");
                
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
            nuevoRectangulo.classList.add("rectangle-1");

            nuevaImagen.classList.add("image-1"); 

            padreEstrellasTitulo.classList.add("row");
            nuevoConjuntoEstrellas.classList.add("col-md", "col-sm-12", "conjunto_estrellas");
            nuevoTitulo.classList.add("col-md-6", "col-sm-12", "item-1");

            nuevaTienda.classList.add("tienda-x");

            padrePrecioCarrito.classList.add("row", "precio-carrito");
            nuevoPrecio.classList.add("col-6", "precio");
            nuevoCarrito.classList.add("col", "carrito", "fa-solid", "fa-cart-shopping");

            //meterlos contenedores en el contenedor principal
            padreEstrellasTitulo.appendChild(nuevoTitulo);
            padreEstrellasTitulo.appendChild(nuevoConjuntoEstrellas);
    
            padrePrecioCarrito.appendChild(nuevoPrecio);
            padrePrecioCarrito.appendChild(nuevoCarrito);

            nuevoRectangulo.appendChild(nuevaImagen);
            nuevoRectangulo.appendChild(padreEstrellasTitulo);
            nuevoRectangulo.appendChild(nuevaTienda);
            nuevoRectangulo.appendChild(padrePrecioCarrito);

            contenedorPadre.appendChild(nuevoRectangulo);
        });
    });
}
