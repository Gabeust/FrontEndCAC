// Obtener la imagen y la ventana modal
var img = document.getElementsByClassName('imagen');
var modal = document.getElementById('myModal');
var modalImg = document.getElementById("imgModal");

// Cuando se hace clic en la imagen, abrir la ventana modal
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
}

// Cuando se hace clic en el botón de cerrar, cerrar la ventana modal
var closeButton = document.getElementsByClassName("close")[0];
/* COMENTO ESTE BLOQUE PORQUE TIRA UNA EXCEPCION. EL closeButton es undefined
closeButton.onclick = function() {
    modal.style.display = "none";
}
*/

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
    console.log("Ancho del vieport en px:", window.innerWidth);
    
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

    console.log(barraNav);
} 