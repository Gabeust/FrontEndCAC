document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  var nombre = document.getElementById("nombre");
  var email = document.getElementById("email");
  var mensaje = document.getElementById("mensaje");

  var nombreError = document.getElementById("nombre-error");
  var emailError = document.getElementById("email-error");
  var mensajeError = document.getElementById("mensaje-error");

  var valido = true;


  if (!/^[A-Za-z]+$/.test(nombre.value) || nombre.value.length < 3 || nombre.value.length > 23) {
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

  if (mensaje.value.length === 0) {
    mensajeError.textContent = "Debe ingresar un mensaje";
    mensaje.classList.remove("input-correcto");
    mensaje.classList.add("input-incorrecto");
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
