
// Sobre Nosotros -----------gabriel

function mostrarOcultar() {
    var article = document.querySelector('#sobre article');
    var button = document.querySelector('#leerMas');

    if (article.style.display === 'none' || article.style.display === '') {
        article.style.display = 'block';
        button.textContent = 'Leer menos';
    } else {
        article.style.display = 'none';
        button.textContent = 'Leer más';
    }
}



/* 
Despliego o contraigo el menú teniendo en cuenta:
    - click en el botón de menú hamburguesa para pantallas chicas
    - el ancho de la ventana para pantallas grandes 
*/
var barraNavegacionVisiblePorBoton = false;
var barraNavegacionVisiblePorAncho = false;

function desplegarMenu() {
    console.log("Barra de navegación es visible?", barraNavegacionVisiblePorBoton);

    let barraNav = document.querySelector("#barra_navegacion");

    barraNav.style.display = barraNavegacionVisiblePorBoton ? "none" : "block";
    barraNavegacionVisiblePorBoton = !barraNavegacionVisiblePorBoton;

    console.log(barraNav);
}

window.onresize = desplegarMenuSegunViewport;
function desplegarMenuSegunViewport() {
    // console.log("Ancho del vieport en px:", window.innerWidth);

    let barraNav = document.querySelector("#barra_navegacion");
    let anchoVentana = window.innerWidth;

    if (anchoVentana >= 450) {
        barraNav.style.display = "block";
        barraNavegacionVisiblePorAncho = true;
        barraNavegacionVisiblePorBoton = false;
    } else {
        if (barraNavegacionVisiblePorAncho) {
            barraNav.style.display = "none";
            barraNavegacionVisiblePorAncho = false;
        }
    }

    // console.log(barraNav);
}

// scroll ---------------- gabriel
var lastScrollTop = 0;

window.addEventListener("scroll", function () {
    var header = document.getElementById("scrollHeader");
    var scrollTop = window.pageYYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Si estás desplazándote hacia abajo, oculta el encabezado
        header.style.transform = "translateY(-100%)";
    } else {
        // Si estás desplazándote hacia arriba, muestra el encabezado
        header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
});



// Productos ------------- gabriel
// const productCardsContainer = document.querySelector("#productos-cards");
// let data; // Variable global para almacenar los datos del JSON

// fetch('https://my-json-server.typicode.com/Gabeust/db.json/productos')
//     .then(datos => datos.json())
//     .then(responseData => {
//         data = responseData; // Asigna los datos a la variable "data"
//         mostrarProductos(data); // Muestra todos los productos al cargar la página
//     })
//     .catch(error => {
//         console.error("Error al obtener los datos de la API:", error);
//     });

// function mostrarProductos(productos) {
//     // Limpia el contenedor antes de mostrar los nuevos resultados
//     productCardsContainer.innerHTML = "";

//     productos.forEach(producto => {
//         const card = document.createElement("li");

//         card.innerHTML = `
//         <div class="card-container">
//             <div class="card">
//                 <div class="card-img">
//                     <img src="${producto.imagen_url}" class="img-prod" >
//                 </div>
//                 <div class="detalle-prod">
//                 <h4>${producto.nombre}</h4>
//                 <p>Cod. ${producto.codigo}</p>
//                 </div>
//                 <div class="card-detalle">
//                     <div class="precio">
//                         <p>Precio <strong> $${producto.precio}</strong></p>
//                     </div>
//                 </div>
//                 <button class="botones"> Agregar al Carrito</button>

//             </div>
//         </div>
//     `;
//         productCardsContainer.appendChild(card);
//     });
// }


// const categoriasLinks = document.querySelectorAll("ul li a");

// categoriasLinks.forEach(link => {
//     link.addEventListener("click", (e) => {
//         e.preventDefault();
//         const categoriaSeleccionada = link.getAttribute("data-categoria");
//         mostrarProductosPorCategoria(categoriaSeleccionada);
//     });
// });

// ---------------------------------------------------------------
const productCardsContainer = document.querySelector("#productos-cards");
let data; // Variable global para almacenar los datos del JSON

fetch('https://my-json-server.typicode.com/Gabeust/db.json/productos')
    .then(datos => datos.json())
    .then(responseData => {
        data = responseData; // Asigna los datos a la variable "data"
        mostrarProductos(data); // Muestra todos los productos al cargar la página
    })
    .catch(error => {
        console.error("Error al obtener los datos de la API:", error);
    });

function mostrarProductos(productos) {
    // Limpia el contenedor antes de mostrar los nuevos resultados
    productCardsContainer.innerHTML = "";

    productos.forEach(producto => {
        const card = document.createElement("li");

        card.innerHTML = `
                <div class="card-container">
                    <div class="card">
                        <div class="card-img">
                            <img src="${producto.imagen_url}" class="img-prod" >
                        </div>
                        <div class="detalle-prod">
                            <h4>${producto.nombre}</h4>
                            <p>Cod. ${producto.codigo}</p>
                        </div>
                        <div class="card-detalle">
                            <div class="precio">
                                <p>Precio <strong> $${producto.precio}</strong></p>
                            </div>
                        </div>
                        <button class="botones" onclick="agregarAlCarrito('${producto.codigo}', '${producto.nombre}')"> Agregar al Carrito</button>
                    </div>
                </div>
                `;
        productCardsContainer.appendChild(card);
    });
}
const categoriasLinks = document.querySelectorAll("ul li a");

categoriasLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const categoriaSeleccionada = link.getAttribute("data-categoria");
        mostrarProductosPorCategoria(categoriaSeleccionada);
    });
});

function agregarAlCarrito(codigo, nombre) {
    // Obtener el carrito actual desde localStorage o crear uno nuevo
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Buscar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(producto => producto.codigo === codigo);

    if (productoEnCarrito) {
        // Si el producto ya está en el carrito, aumenta la cantidad
        productoEnCarrito.cantidad++;
    } else {
        // Si el producto no está en el carrito, agrégalo
        const producto = data.find(producto => producto.codigo === codigo);
        if (producto) {
            carrito.push({ ...producto, cantidad: 1 });
        }
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


// formulario -------------------------------------gabriel 


document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();


    var nombre = document.getElementById("nombre");
    var email = document.getElementById("email");
    var mensaje = document.getElementById("mensaje");

    var nombreError = document.getElementById("nombre-error");
    var emailError = document.getElementById("email-error");
    var mensajeError = document.getElementById("mensaje-error");

    var valido = true;


    if (nombre.value.length < 3 || nombre.value.length > 23 || !/^[A-Za-z]+$/.test(nombre.value)) {
        nombreError.textContent = "El nombre debe tener entre 3 y 23 letras";
        nombre.classList.remove("input-correcto");
        nombre.classList.add("input-incorrecto");
        valido = false;
    } else {
        nombreError.textContent = "";
        nombre.classList.remove("input-incorrecto");
        nombre.classList.add("input-correcto");
    }

    if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.textContent = "El email debe ser válido";
        email.classList.remove("input-correcto");
        email.classList.add("input-incorrecto");
        valido = false;
    } else {
        emailError.textContent = "";
        email.classList.remove("input-incorrecto");
        email.classList.add("input-correcto");
    }

    if (mensaje.value.length >= 250 || mensaje.value != null) {
        mensajeError.textContent = "El mensaje debe tener menos de 250 caracteres";
        mensaje.classList.remove("input-correct");
        mensaje.classList.add("input-incorrect");
        valido = false;
    } else {
        mensajeError.textContent = "";
        mensaje.classList.remove("input-incorrect");
        mensaje.classList.add("input-correct");
    }

    if (valido) {
        enviarFormulario();
    }
});

function enviarFormulario() {
    const endpoint = 'https://formspree.io/f/xzbqolpd';
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    const data = {
        nombre: nombre,
        email: email,
        mensaje: mensaje
    };

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('enviadoExitoso').style.display = 'block';
            document.getElementById('nombre').value = '';
            document.getElementById('email').value = '';
            document.getElementById('mensaje').value = '';

        })
        .catch(error => {
            console.error('Error:', error);
        });
}
