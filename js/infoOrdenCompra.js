const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

// Si el usuario actual y las órdenes existen
if (usuarioActual && usuarioActual.ordenes && usuarioActual.ordenes.length > 0) {
    const orden = usuarioActual.ordenes[1];  // Selecciono la primera orden para el ejemplo

    const container = document.querySelector('main'); // Seleccionamos el contenedor principal donde se agregará todo
    const rectangle3 = document.querySelector('.rectangle-3'); // Seleccionamos rectangle-3
    const precioSubtotal = document.querySelector('.subtotal2');
    const precioEnvio = document.querySelector('.envio2');
    const precioImpuesto = document.querySelector('.impuestos2');

    // Inicializar subtotal
    let subtotal = 0;

    // Limpiar el contenido previo
    const rectanglesPrevios = container.querySelectorAll('.rectangle-1'); // Seleccionamos todos los rectangle-1 existentes
    rectanglesPrevios.forEach(rect => rect.remove()); // Eliminamos todos los anteriores

    // Crear un rectangle-1 para la orden
    const rectangle1 = document.createElement('div');
    rectangle1.className = 'rectangle-1 mb-4'; // Agregar clase para margen inferior

    // Agregar rectangle-1 antes de rectangle-3
    container.insertBefore(rectangle1, rectangle3);

    // Mostrar cada producto de la orden
    orden.productos.forEach(producto => {
        // Crear un nuevo rectangle-2 para cada producto
        const rectangle2 = document.createElement('div');
        rectangle2.className = 'rectangle-2'; // Clase para el rectangle-2

        rectangle2.innerHTML = `
            <div class="row"> 
                <div class="col-md-2 col-12 d-flex">
                    <div class="fotosProductos"></div>   
                </div>
                <div class="col-md-4 col-12 d-flex flex-column justify-content-start p-0">
                    <h1 class="nombresProductos text-start mt-3">${producto.nombre}</h1>    
                    <h2 class="descripcionProductos text-start m-0">${producto.descripcion}</h2>
                    <h2 class="precioProductos text-start mt-3">$${producto.precio}</h2>
                </div>
                <div class="col-md-4 col-12">
                    <h1 class="numProducto text-start mt-3">Nro. Producto: ${producto.id}</h1>
                    <div class="stepper-container d-flex align-items-end">
                        <input type="number" id="quantity" class="stepper" value="${producto.cantidad}" min="0" max="100" disabled>
                        <label for="quantity" class="labelCantidad">Cantidad</label> 
                    </div>          
                </div>
                <div class="col-md-2 col-12">
                    <h1 class="textoSubtotal mt-3">Subtotal</h1>
                    <h1 class="precioProductosSubt mt-3">$${(producto.precio * producto.cantidad).toFixed(2)}</h1>
                </div>
            </div>
        `;

        // Agregar el nuevo rectangle-2 al rectangle-1
        rectangle1.appendChild(rectangle2);

        // Calcular subtotal para todos los productos
        subtotal += producto.precio * producto.cantidad;
    });

    // Actualizar el subtotal total
    precioSubtotal.textContent = `$${subtotal.toFixed(2)}`;

    // Calcular y mostrar el envío y los impuestos
    const envio = 0; // Aquí puedes definir el costo de envío
    const impuestos = subtotal * 0.1; // Ejemplo: 10% de impuestos

    precioEnvio.textContent = `Gratis`; // Puedes modificar esto según el costo real
    precioImpuesto.textContent = `$${impuestos.toFixed(2)}`; // Actualiza el texto de impuestos

    // Calcular y mostrar el total
    const total = subtotal + envio + impuestos;
    document.querySelector('.total2').textContent = `$${total.toFixed(2)}`;
} else {
    console.log("No se encontraron órdenes de compra.");
}
