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
closeButton.onclick = function() {
    modal.style.display = "none";
}

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