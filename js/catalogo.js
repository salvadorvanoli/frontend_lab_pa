// const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
const prod = JSON.parse(localStorage.getItem('productos')) || [];

// Manejar el cambio de estado de las categorías
const categoriaLinks = document.querySelectorAll('.dropdown-item');

if (categoriaLinks.length > 0) {
    categoriaLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar el comportamiento por defecto del enlace
            const categoriaSeleccionada = this.innerHTML; // Obtener el nombre de la categoría

            // Cambiar el estado de selección
            agregarCategoria(categoriaSeleccionada, this);
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

// Función para reordenar el arreglo de productos
function reOrdenar(selectedOption, productos) {
    switch (selectedOption) {
        case "1":
            // Ordenar alfabéticamente ascendente por 'nombre'
            productos.sort(function(a, b) {
                return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase());
            });
            break;

        case "2":
            // Ordenar por precio descendente
            productos.sort(function(a, b) {
                return b.precio - a.precio;
            });
            break;

        case "3":
            // Ordenar por cantidad de compras ascendente
            if (typeof productos[0].cantidadCompras === 'undefined') {
                break;
            }
            productos.sort(function(a, b) {
                return a.cantidadCompras - b.cantidadCompras;
            });
            break;

        case "4":
            // Implementa más opciones de ordenación si es necesario
            break;

        default:
            break;
    }
    return productos;
}

let categoriasSeleccionadas = [];

// Función para manejar la selección de una categoría
function agregarCategoria(categoria, boton) {
    if (!categoriasSeleccionadas.includes(categoria)) {
        categoriasSeleccionadas.push(categoria);
        boton.classList.add('categoria-seleccionada'); // Añadir la clase CSS
    } else {
        categoriasSeleccionadas = categoriasSeleccionadas.filter(cat => cat !== categoria);
        boton.classList.remove('categoria-seleccionada'); // Quitar la clase CSS
    }
    
    // Reiniciar la opción de ordenamiento a "99"
    document.querySelector('.select-1').value = "99"; 

    filtrarProductosPorCategoria(); // Filtrar productos
}

// Función para filtrar productos por categorías seleccionadas
function filtrarProductosPorCategoria() {

    // Si no hay categorías seleccionadas, carga todos los productos
    if (categoriasSeleccionadas.length === 0) {
        cargarCatalogo(prod);
        return;
    }

    const productosFiltrados = prod.filter(producto => {
        // Verifica que 'producto.categorias' exista
        if (!producto.categorias || !producto.categorias.Comida) {
            console.warn(`El producto ${producto.nombre} no tiene categorías válidas.`);
            return false; // Excluye productos sin categorías válidas
        }

        // Extraer las categorías del producto
        const categoriasProducto = Object.keys(producto.categorias.Comida);
        
        // Compara las categorías del producto con las seleccionadas
        return categoriasSeleccionadas.some(categoriaSeleccionada =>
            categoriasProducto.includes(categoriaSeleccionada)
        );
    });

    cargarCatalogo(productosFiltrados); // Cargar los productos filtrados
}

// Función para cargar las categorías desde localStorage
function cargarCategorias(categorias) {
    const contenedorPadre = document.getElementById("aside");

    // Limpiar el contenedor de categorías antes de agregar nuevas
    contenedorPadre.innerHTML = '';

    Object.keys(categorias).forEach(categoria => {
        const subcategorias = categorias[categoria];
        
        const dropdownDiv = document.createElement('div');
        dropdownDiv.classList.add('dropdown');

        const button = document.createElement('button');
        button.classList.add('dropbtn');
        button.innerHTML = `&#9654; ${categoria}`;

        dropdownDiv.appendChild(button);

        const dropdownContent = document.createElement('div');
        dropdownContent.classList.add('dropdown-content');

        Object.keys(subcategorias).forEach(subcategoria => {
            const subcategoriaLink = document.createElement('a');
            subcategoriaLink.href = "#";
            subcategoriaLink.innerHTML = `&#9654; ${subcategoria}`;
            subcategoriaLink.addEventListener('click', function() {
                agregarCategoria(subcategoria, subcategoriaLink);
            });

            dropdownContent.appendChild(subcategoriaLink);
        });

        dropdownDiv.appendChild(dropdownContent);
        contenedorPadre.appendChild(dropdownDiv);
    });
}

// Llamar a cargarCategorias cuando sea necesario, por ejemplo al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    cargarCategorias(categorias);
});

function verInfoProducto(id) {
    for(let item of prod) {
        if(item.id == id){
            localStorage.setItem("productoSeleccionado", JSON.stringify(item));
            window.location.href = "infoProducto.html";
        }
    }
}

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
        Rectangulo.onclick = function() {
            verInfoProducto(element.id);
        };

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
}

// Escucha el evento de cambio del select
document.querySelector('.select-1').addEventListener('change', function() {
    let selectedOption = this.value; // Obtener el valor seleccionado
    // Filtrar productos primero
    const productosFiltrados = prod.filter(producto => {
        // Verifica que 'producto.categorias' exista
        if (!producto.categorias || !producto.categorias.Comida) {
            console.warn(`El producto ${producto.nombre} no tiene categorías válidas.`);
            return false; // Excluye productos sin categorías válidas
        }

        // Extraer las categorías del producto
        const categoriasProducto = Object.keys(producto.categorias.Comida);
        
        // Compara las categorías del producto con las seleccionadas
        return categoriasSeleccionadas.some(categoriaSeleccionada =>
            categoriasProducto.includes(categoriaSeleccionada)
        );
    });

    const ordenado = reOrdenar(selectedOption, [...productosFiltrados]); // Ordenar solo los productos filtrados
    cargarCatalogo(ordenado); // Cargar el catálogo después de ordenar
});

// Cargar el catálogo al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    cargarCategorias(categorias);
    cargarCatalogo(prod); // Carga el catálogo inicialmente
});
