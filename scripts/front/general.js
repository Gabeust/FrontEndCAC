
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

