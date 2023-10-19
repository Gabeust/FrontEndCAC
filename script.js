
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
    let barraNav = document.querySelector("#barra_navegacion");

    barraNav.style.display = barraNavegacionVisiblePorBoton ? "none" : "block";
    barraNavegacionVisiblePorBoton = !barraNavegacionVisiblePorBoton;

}

window.onresize = desplegarMenuSegunViewport;
function desplegarMenuSegunViewport() {
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

} 

function validarMailSuscripcion() {
    let campoMail = document.querySelector("#email_suscripcion");
    let mailIngresado = campoMail.value;

    let expreg = /^[A-Za-z][\w.-]+\@[A-Za-z]+[.][A-Za-z]{2,}/i; // Inicie con letra, puede contener ., -, _ y luego del @ admite sólo letras

    if (expreg.test(mailIngresado)) {
        campoMail.classList.remove("campo_invalido")
        campoMail.classList.add("campo_valido");
        return true;
    } else {
        campoMail.classList.remove("campo_valido")
        mailIngresado == "" ? campoMail.classList.remove("campo_invalido") : campoMail.classList.add("campo_invalido");
        return false;
    }

}

function validarFormularioSuscripcion() {

    if (!validarMailSuscripcion()) {
        alert("Ingrese un mail válido.\n\nNo está permitido que comience con números, no incluir ñ ni acentos, ni caracteres especiales.");
        document.querySelector("#email_suscripcion").focus();
    } else if (!document.querySelector("#aceptar_tyc").checked) {
        alert("No olvide aceptar términos y condiciones de suscripción.");
        document.querySelector("#aceptar_tyc").focus();
    } else {
        alert("Suscripción realizada con éxito!");
        document.querySelector("#formulario_suscripcion").submit();
    }

}

// Productos ------------- gabriel
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
                <button class="botones" >Agregar al Carrito</button>
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

// formulario -------------------------------------gabriel 
function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    const mensajeError = document.getElementById('mensajeError');

    // Verificar si los campos están vacíos
    if (!nombre || !email || !mensaje) {
        mensajeError.textContent = 'Todos los campos son obligatorios';
        return false;
    }

    // Verificar la validez del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mensajeError.textContent = 'Ingrese una dirección de correo electrónico válida';
        return false;
    }

    return true;
}



