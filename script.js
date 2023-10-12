
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


// const productCardsContainer = document.querySelector("#productos-cards");


// fetch('https://my-json-server.typicode.com/Gabeust/db.json/productos')
//     .then(datos => datos.json())

//     .then(data => {
//         if (Array.isArray(data)) {
//             // Procesar los datos de la API
//             data.forEach(productos => {
//                 // Crear una tarjeta para cada producto
//                 const card = document.createElement("li");


//                 // Crear el contenido de la tarjeta
//                 card.innerHTML = `
//         <div class="card-container">
//             <div class="card">
//                 <div class="card-img">
//                     <img src="${productos.imagen_url}" >
//                 </div>
//                 <h4> ${productos.nombre} </h4>
//                 <p> Cod. ${productos.codigo}</p>
//             <div class="card-detalle">
//                     <div class="precio">
//                         <p>Precio <strong> $${productos.precio} </strong></p>
//                     </div>
//                 </div>
//                 <button class="agregar">Agregar al Carrito</button>
//             </div>
//         </div>
//         `;
//                 // Agregar la tarjeta al contenedor
//                 productCardsContainer.appendChild(card);

//             })
//         }
//     })
//     .catch(error => {
//         console.error("Error al obtener los datos de la API:", error);
//     });

const productCardsContainer = document.querySelector("#productos-cards");
let data; // Variable global para almacenar los datos del JSON

fetch('https://my-json-server.typicode.com/Gabeust/db.json/productos')
    .then(datos => datos.json())
    .then(responseData => {
        data = responseData; // Asignar los datos a la variable "data"
        mostrarProductos(data); // Mostrar todos los productos al cargar la página
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
                    <img src="${producto.imagen_url}" >
                </div>
                <h4>${producto.nombre}</h4>
                <p>Cod. ${producto.codigo}</p>
                <div class="card-detalle">
                    <div class="precio">
                        <p>Precio <strong> $${producto.precio}</strong></p>
                    </div>
                </div>
                <button class="agregar">Agregar al Carrito</button>
            </div>
        </div>
    `;
        productCardsContainer.appendChild(card);
    });
}

function mostrarProductosPorCategoria(categoria) {

    const productosFiltrados = data.filter(producto => producto.categoria === categoria);
    mostrarProductos(productosFiltrados);
}


const categoriasLinks = document.querySelectorAll("ul li a");

categoriasLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const categoriaSeleccionada = link.getAttribute("data-categoria");
        mostrarProductosPorCategoria(categoriaSeleccionada);
    });
});

