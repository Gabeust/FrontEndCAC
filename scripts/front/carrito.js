//carrito de compra ------------------------------------------

const cartSection = document.getElementById('cart');
const totalElement = document.getElementById('total');

function agregarAlCarrito(codigo) {
    // Obtiene el carrito almacenado en localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Busca el producto en el carrito
    const productoExistente = carrito.find(producto => producto.codigo === codigo);

    if (productoExistente) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        productoExistente.cantidad++;
    } else {
        // Si el producto no está en el carrito, agrégalo
        const producto = data.find(producto => producto.codigo === codigo);
        if (producto) {
            carrito.push({ ...producto, cantidad: 1 });
        }
    }

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Escucha el evento "Agregar al Carrito"
document.addEventListener('click', function (event) {
    if (event.target && event.target.className === 'botones') {
        const codigo = event.target.getAttribute('data-product-id');
        agregarAlCarrito(codigo);
    }
});

function actualizarCarrito() {
    cartSection.innerHTML = '';
    let totalGeneral = 0;

    // Obtiene el carrito almacenado en localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.forEach(producto => {
        const article = document.createElement('article');
        article.className = 'product';

        const totalProducto = producto.precio * producto.cantidad;
        totalGeneral += totalProducto;

        article.innerHTML = `
            <article >
                <a class="remove" onclick="eliminarDelCarrito('${producto.codigo}')">
                    <h3>Borrar</h3>
                    <div class="cart-img">
                        <img src="${producto.imagen_url}">
                    </div>
                </a>
            </article>
            <div class="content">
                <p>${producto.nombre}</p>
            </div>
            <div >
            <div class="SumRes">
                <span class="q-menos" onclick="restarCantidad('${producto.codigo}')">-</span>
                <span class="q">${producto.cantidad}</span>
                <span class="q-mas" onclick="sumarCantidad('${producto.codigo}')">+</span>
             </div>
                <h2 class="total-precio">$${totalProducto.toFixed(2)}</h2>
            </div>
        `;

        cartSection.appendChild(article);
    });

    totalElement.textContent = totalGeneral.toFixed(2);
}

function eliminarDelCarrito(codigo) {
    // Obtiene el carrito almacenado en localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Elimina el producto del carrito
    carrito = carrito.filter(producto => producto.codigo !== codigo);

    // Actualiza el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarCarrito();
}

function restarCantidad(codigo) {
    // Obtiene el carrito almacenado en localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Encuentra el producto en el carrito
    const producto = carrito.find(p => p.codigo === codigo);

    if (producto && producto.cantidad > 1) {
        producto.cantidad--;
        // Actualiza el carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    actualizarCarrito();
}

function sumarCantidad(codigo) {
    // Obtiene el carrito almacenado en localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Encuentra el producto en el carrito
    const producto = carrito.find(p => p.codigo === codigo);

    if (producto) {
        producto.cantidad++;
        // Actualiza el carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    actualizarCarrito();
}

actualizarCarrito(); // Actualiza el carrito al cargar la página

// ---------------------------------------------------------------------