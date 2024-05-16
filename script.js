// Función para manejar el evento de clic en el botón "Agregar al carrito"
function agregarAlCarrito(event) {
    const btn = event.currentTarget;
    const card = btn.closest('.product-wap'); // Cambiado de '.card' a '.product-wap' según tu HTML
    if (card) {
        const productName = card.querySelector('.card-body .text-decoration-none').textContent;
        const productPrice = parseFloat(card.querySelector('.text-center.mb-0').textContent.replace('$', '')); // Actualizado para reflejar la estructura de tu HTML
        const product = { nombre: productName, precio: productPrice };
        agregarProductoACarrito(product);
        actualizarContadorCarrito();
    } else {
        console.error('No se encontró el elemento .product-wap.');
    }
}

// Función para agregar un producto al carrito
function agregarProductoACarrito(producto) {
    let carrito = obtenerCarritoDesdeCookies();
    carrito.push(producto);
    guardarCarritoEnCookies(carrito);
}

// Función para obtener el carrito desde las cookies
function obtenerCarritoDesdeCookies() {
    console.log("Función obtenerCarritoDesdeCookies() llamada");
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('carrito='))?.split('=')[1];
    return cookieValue ? JSON.parse(cookieValue) : [];
}

// Función para guardar el carrito en las cookies
function guardarCarritoEnCookies(carrito) {
    const carritoJSON = JSON.stringify(carrito);
    document.cookie = `carrito=${carritoJSON}; path=/`;
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('contador-carrito');
    const carrito = obtenerCarritoDesdeCookies();
    contadorCarrito.textContent = carrito.length;
}

// Agregar un event listener a todos los botones "Agregar al carrito"
const botonesAgregarCarrito = document.querySelectorAll('.btn-add-to-cart');
botonesAgregarCarrito.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
});

// Función para manejar el evento de clic en el icono del carrito
function verCarrito() {
    window.location.href = "compra.html";
}

// Agregar un event listener al icono del carrito
const iconoCarrito = document.getElementById('carrito-icono');
iconoCarrito.addEventListener('click', verCarrito);

// Función para ver el contenido del carrito en la consola
function verContenidoCarrito() {
    console.log("Contenido del carrito:");
    const carrito = obtenerCarritoDesdeCookies();
    carrito.forEach(producto => {
        console.log(producto);
    });
}

// Llamar a la función para ver el contenido del carrito
verContenidoCarrito();

// Log de ejecución exitosaconsole.log("El script se está ejecutando correctamente.");



// Función para manejar el evento de clic en el botón de descarga de la nota de compra
function descargarNotaDeCompra() {
    console.log("Función descargarNotaDeCompra() llamada");
    
    // Obtener el nombre ingresado por el usuario
    const nombre = document.getElementById('nombre').value;
    
    // Obtener el carrito desde las cookies
    const carrito = obtenerCarritoDesdeCookies();

    // Generar el contenido de la nota de compra
    let notaCompra = `Cliente: ${nombre}\n\n`;
    carrito.forEach(item => {
        notaCompra += `${item.nombre} - Precio: ${item.precio}\n`;
    });

    // Crear un objeto Blob que contiene el texto de la nota de compra
    const blob = new Blob([notaCompra], { type: 'text/plain' });

    // Crear un objeto URL para el Blob
    const url = URL.createObjectURL(blob);

    // Crear un enlace <a> para la descarga
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = url;
    enlaceDescarga.download = 'nota_de_compra.txt';

    // Simular el clic en el enlace para iniciar la descarga
    enlaceDescarga.click();

    // Limpiar el objeto URL después de la descarga
    URL.revokeObjectURL(url);
}
// Obtener el botón de descarga
const botonDescargar = document.getElementById('boton-descargar');

// Agregar un event listener al botón de descarga
botonDescargar.addEventListener('click', descargarNotaDeCompra)




// Función para vaciar el carrito
function vaciarCarrito() {
    guardarCarritoEnCookies([]); // Guardar un carrito vacío en las cookies
    actualizarContadorCarrito(); // Actualizar el contador del carrito
    actualizarListaCarrito([]); // Actualizar la lista del carrito en la página
}

// Función para agregar un nuevo producto al carrito
function agregarProducto() {
    // Por ejemplo, podrías abrir un cuadro de diálogo o redirigir a una página donde el usuario pueda seleccionar un nuevo producto
    alert("Función agregarProducto() llamada. Esta es una función de ejemplo y puedes modificarla según tus necesidades.");
}

// Función para actualizar la lista del carrito en la página
function actualizarListaCarrito(carrito) {
    const carritoLista = document.getElementById('carrito-lista');
    carritoLista.innerHTML = ''; // Limpiar la lista actual del carrito

    if (carrito.length > 0) {
        carrito.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.nombre} - Precio: ${item.precio}`;
            carritoLista.appendChild(listItem);
        });
    } else {
        // Si el carrito está vacío, mostrar un mensaje indicando que está vacío
        const listItem = document.createElement('li');
        listItem.textContent = 'Tu carrito está vacío';
        carritoLista.appendChild(listItem);
    }
}
