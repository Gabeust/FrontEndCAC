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
