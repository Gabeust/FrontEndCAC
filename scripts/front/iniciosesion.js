let URL = "http://127.0.0.1:5000/"; // Funciona localmente
//let URL = "https://matanus.pythonanywhere.com/";

/* --------------------------------Validar Formulario Inicio Sesión -------------------------------- */
function validarEmailUsuario(email) {
    let expreg = /^[A-Za-z][\w.-]+\@[A-Za-z]+[.][A-Za-z]{2,}/i; // Inicie con letra, puede contener ., -, _ y luego del @ admite sólo letras
    return expreg.test(email);
}

function validarPasswordUsuario(clave) {
    let expregMayuscula = /[A-Z]+/; // Debe contener al menos 1 mayúscula
    let expregDigito = /[0-9]+/; // Debe contener al menos 1 número
    let expregEspecial = /\W/; // Debe contener al menos 1 caracter especial
    // Debe contener al menos 8 caracteres
    
    let passwordValido = expregMayuscula.test(clave) && expregDigito.test(clave) && expregEspecial.test(clave) && (clave.length >= 8);
    return passwordValido;
}

function limpiarFormularioIniciarSesion() {
    document.querySelector('#form-iniciar-sesion #email-usuario').value = "";
    document.querySelector('#form-iniciar-sesion #password-usuario').value = "";
}

let formularioIniciarSesion = document.querySelector('#form-iniciar-sesion');
formularioIniciarSesion.addEventListener('submit', evento => {
    evento.preventDefault();

    /* Validar el formulario para iniciar sesión */
    let email = document.querySelector('#form-iniciar-sesion #email-usuario').value;
    let clave = document.querySelector('#form-iniciar-sesion #password-usuario').value;

    let datosValidos = true;

    if (!validarPasswordUsuario(clave)) {
        document.querySelector("#form-iniciar-sesion #password-usuario").focus();
        datosValidos = false;
    }

    if (!validarEmailUsuario(email)) {
        document.querySelector("#form-iniciar-sesion #email-usuario").focus();
        datosValidos = false;
    }

    if (datosValidos) {
        fetch(URL + 'iniciarSesion/' + email)
        .then(respuesta => respuesta.json())
        .then(usuario => {
                if (usuario !== null){

                    fetch(URL + 'iniciarSesion/' + email + "/" + clave)
                    .then(respuesta => respuesta.json())
                    .then(usuario_valido => {
                        
                        if (usuario_valido !== null){
                            window.location.href = "./sucursales.html"; // Cambiar por el panel de administración
                        }
                        else {throw "Datos inválidos";}    
                        })
                    .catch(error => {
                        document.querySelector('#form-iniciar-sesion #email-usuario').focus();
                        limpiarFormularioIniciarSesion();                        
                    }) 
                }
                else {throw "Email inválido";}    
        })
        .catch(error => {
            document.querySelector('#form-iniciar-sesion #email-usuario').focus();
            limpiarFormularioIniciarSesion();})
    }

}
)
