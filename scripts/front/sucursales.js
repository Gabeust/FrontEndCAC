function visualizarMapaSucursal(idSucursal){
    let sucursalOV = document.querySelector("#mapa_sucursal_ov");
    let sucursalTigre = document.querySelector("#mapa_sucursal_tigre");

    switch (idSucursal) {
        case 1:
            sucursalTigre.style.display = "none";
            sucursalOV.style.display = "block";
            break;
        case 2:
            sucursalOV.style.display = "none";
            sucursalTigre.style.display = "block";
            break;        
        default:
            break;
    }
}

