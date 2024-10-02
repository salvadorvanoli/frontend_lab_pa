//categorias

// Manejar el cambio de estado de los checkboxes
document.querySelectorAll('.dropdown-item > input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function(event) {
        const subOptions = this.nextElementSibling; // Obtener el siguiente elemento (sub-opciones)
        if (subOptions) {
            subOptions.style.display = this.checked ? 'block' : 'none'; // Mostrar u ocultar subopciones
        }
    });
});

// Mantener el dropdown abierto al hacer clic en el toggle
document.querySelector('.dropdown-toggle').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que se cierre al hacer clic
});

//productoSeleccionado 

let producto = document.getElementById("producto1");

producto.addEventListener('click', function() {
    productoSeleccionado = producto.nombre;
    cargarProducto();
});

const prod = JSON.parse(localStorage.getItem('productos')) || [];

// Función para reordenar el arreglo de productos
function reOrdenar(selectedOption, productos) {
    switch (selectedOption) {
        case "1":
            // Ordenar alfabéticamente ascendente por 'nombre'
            productos.sort(function(a, b) {
                return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase());
            });
            console.log('Ordenado alfabéticamente (ascendente)');
            break;

        case "2":
            // Ordenar por precio descendente
            productos.sort(function(a, b) {
                return b.precio - a.precio;
            });
            console.log('Ordenado por precio (descendente)');
            break;

        case "3":
            // Ordenar por cantidad de compras ascendente
            if (typeof productos[0].cantidadCompras === 'undefined') {
                console.log('La propiedad cantidadCompras no existe en los productos.');
                break;
            }
            productos.sort(function(a, b) {
                return a.cantidadCompras - b.cantidadCompras;
            });
            console.log('Ordenado por cantidad de compras (ascendente)');
            break;

        case "4":
            // Implementa más opciones de ordenación si es necesario
            break;

        default:
            console.log('Opción no válida');
            break;
    }
    return productos;
}

// Función para cargar el catálogo
function cargarCatalogo(prod) {
    const contenedorPadre = document.getElementById("prods");
    contenedorPadre.innerHTML = ''; // Limpiar el contenedor antes de agregar los productos

    if (prod.length === 0) {
        return;
    }

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

        nuevaImagen.src = element.imagenes[0]; // Cambiado para usar el primer elemento de la lista de imágenes

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

        // Agregar contenido al div
        nuevoTitulo.innerHTML = element.nombre;
        nuevoPrecio.innerHTML = element.precio;
        nuevaTienda.innerHTML = element.tienda || "Tienda no disponible"; // Asegúrate de que este atributo esté en tu objeto

        // Agregar clases o atributos si es necesario
        nuevoRectangulo.classList.add("rectangle-1", "row");

        nuevaImagen.classList.add("col-3", "image-1");
        
        nuevoDemas.classList.add("col-9", "row", "todo-lodemas");

        padreItemEstrellas.classList.add("row", "col-12", "item-estrellas");
        nuevoTitulo.classList.add("col", "item-1");
        nuevoConjuntoEstrellas.classList.add("col", "conjunto_estrellas");
        
        nuevaTienda.classList.add("tienda-x", "col-12");

        padrePrecioCarrito.classList.add("row", "col-12", "precio-carrito");
        nuevoPrecio.classList.add("col-6", "precio");
        nuevoCarrito.classList.add("col", "carrito", "fa-solid", "fa-cart-shopping");

        // Meter los contenedores en el contenedor principal
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

// Escucha el evento de cambio del select
document.querySelector('.select-1').addEventListener('change', function() {
    let selectedOption = this.value; // Obtener el valor seleccionado
    const ordenado = reOrdenar(selectedOption, [...prod]); // Crear una copia del arreglo para no modificarlo directamente
    cargarCatalogo(ordenado); // Cargar el catálogo después de ordenar
});

// Cargar el catálogo al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    cargarCatalogo(prod);
});
