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
