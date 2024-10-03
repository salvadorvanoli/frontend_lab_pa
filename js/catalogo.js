// Manejar el cambio de estado de los checkboxes
const checkboxes = document.querySelectorAll('.dropdown-item > input[type="checkbox"]');
if (checkboxes.length > 0) {
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function(event) {
            const subOptions = this.nextElementSibling; // Obtener el siguiente elemento (sub-opciones)
            if (subOptions) {
                subOptions.style.display = this.checked ? 'block' : 'none'; // Mostrar u ocultar subopciones
            }
        });
    });
}

// Mantener el dropdown abierto al hacer clic en el toggle
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que se cierre al hacer clic
    });
});

// Producto seleccionado
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

const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
let categoriasSeleccionadas = [];

// Función para manejar la selección de una categoría
function agregarCategoria(categoria, boton) {
    if (!categoriasSeleccionadas.includes(categoria)) {
        categoriasSeleccionadas.push(categoria);
        boton.classList.add('categoria-seleccionada'); // Marcar como seleccionada
    } else {
        categoriasSeleccionadas = categoriasSeleccionadas.filter(cat => cat !== categoria);
        boton.classList.remove('categoria-seleccionada'); // Quitar la marca de seleccionada
    }
    filtrarProductosPorCategoria(); // Filtrar productos según las categorías seleccionadas
}

// Función para filtrar productos por categorías seleccionadas
function filtrarProductosPorCategoria() {
    if (categoriasSeleccionadas.length === 0) {
        cargarCatalogo(prod); // Mostrar todos los productos si no hay categorías seleccionadas
        return;
    }

    const productosFiltrados = prod.filter(producto =>
        categoriasSeleccionadas.includes(producto.categoria)
    );
    cargarCatalogo(productosFiltrados);
}

// Función para cargar las categorías desde localStorage
function cargarCategorias(categorias) {
    const contenedorPadre = document.getElementById("aside");

    // Limpiar el contenedor de categorías antes de agregar nuevas
    contenedorPadre.innerHTML = '';

    categorias.forEach(categoriaObj => {
        Object.keys(categoriaObj).forEach(categoria => {
            const subcategorias = categoriaObj[categoria];

            const dropdownDiv = document.createElement('div');
            dropdownDiv.classList.add('dropdown');

            const button = document.createElement('button');
            button.classList.add('dropbtn');
            button.innerHTML = `&#9654; ${categoria}`;
            
            dropdownDiv.appendChild(button);

            if (subcategorias && Object.keys(subcategorias).length > 0) {
                const dropdownContent = document.createElement('div');
                dropdownContent.classList.add('dropdown-content');

                Object.keys(subcategorias).forEach(subcategoria => {
                    const subcategoriaLink = document.createElement('a');
                    subcategoriaLink.href = "#";
                    subcategoriaLink.innerHTML = `&#9654; ${subcategoria}`;

                    dropdownContent.appendChild(subcategoriaLink);
                });

                dropdownDiv.appendChild(dropdownContent);
            }

            contenedorPadre.appendChild(dropdownDiv);
        });
    });
}

// Llamar a cargarCategorias cuando sea necesario, por ejemplo al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    cargarCategorias(categorias);
});


// Función para cargar el catálogo
function cargarCatalogo(prod) {
    const contenedorPadre = document.getElementById("prods");
    contenedorPadre.innerHTML = ''; // Limpiar el contenedor antes de agregar los productos

    if (prod.length === 0) {
        return;
    }

    prod.forEach(element => {
        const Rectangulo = document.createElement("article");
        const nuevaImagen = document.createElement("img");
        const Demas = document.createElement("div");

        const padreItemEstrellas = document.createElement("div");
        const Titulo = document.createElement("div");
        const ConjuntoEstrellas = document.createElement("div");

        const nuevaTienda = document.createElement("div");

        const padrePrecioCarrito = document.createElement("div");
        const Precio = document.createElement("div");
        const PadreCarrito = document.createElement("div");
        const Carrito = document.createElement("div");

        nuevaImagen.src = element.imagenes[0]; // Usar la primera imagen

        let estrellasMarcadas = element.estrellas;

        for (let i = 1; i <= 5; i++) {
            let star = document.createElement("span");
            if (estrellasMarcadas > 0) {
                star.classList.add("fa", "fa-star", "checked");
                estrellasMarcadas--;
            } else {
                star.classList.add("fa", "fa-star");
            }
            ConjuntoEstrellas.appendChild(star);
        }

        // Verificar y agregar contenido
        if (element.nombre) Titulo.innerHTML = element.nombre;
        if (element.precio) Precio.innerHTML = "$UYU " + element.precio;
        nuevaTienda.innerHTML = element.tienda || "Tienda no disponible"; 

        // Agregar clases o atributos si es necesario
        Rectangulo.classList.add("rectangle-1", "row");

        nuevaImagen.classList.add("col-3", "image-1");
        Demas.classList.add("col-9", "row", "todo-lodemas");

        padreItemEstrellas.classList.add("row", "col-12", "item-estrellas");
        Titulo.classList.add("col", "item-1");
        ConjuntoEstrellas.classList.add("col", "conjunto_estrellas");
        nuevaTienda.classList.add("tienda-x", "col-12");

        padrePrecioCarrito.classList.add("row", "col-12", "precio-carrito");
        Precio.classList.add("col", "precio");

        PadreCarrito.classList.add("col-2", "row");
        Carrito.classList.add("col", "carrito", "fa-solid", "fa-cart-shopping");

        Carrito.addEventListener('click', function() {
            let array = [element];
            cargarElementosCarrito(array);
            console.log("se añadio rey");
        });

        // Meter los contenedores en el contenedor principal
        padreItemEstrellas.appendChild(Titulo);
        padreItemEstrellas.appendChild(ConjuntoEstrellas);

        PadreCarrito.appendChild(Carrito);
        padrePrecioCarrito.appendChild(Precio);
        padrePrecioCarrito.appendChild(PadreCarrito);

        Demas.appendChild(padreItemEstrellas);
        Demas.appendChild(nuevaTienda);
        Demas.appendChild(padrePrecioCarrito);

        Rectangulo.appendChild(nuevaImagen);
        Rectangulo.appendChild(Demas);

        contenedorPadre.appendChild(Rectangulo);
    });
    cargarCategorias(categorias);
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
