document.querySelectorAll('.dropdown-item input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener('click', function (e) {
        e.stopPropagation(); 
    });
});

//productoSeleccionado 

let prod = document.getElementById("producto1");

prod.addEventListener('click', function() {
    productoSeleccionado = prod;
    cargarProducto();
    window.open("'../infoProducto.html'", "_blank"); 
});