document.querySelectorAll('.dropdown-menu').forEach(function (dropdown) {
    dropdown.addEventListener('click', function (e) {
        e.stopPropagation(); 
    });
});

//productoSeleccionado 

let prod = document.getElementById("producto1");

prod.addEventListener('click', function() {
    productoSeleccionado = prod;
    cargarProducto();
});