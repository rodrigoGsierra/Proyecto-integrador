function agregarAlCarrito(producto){
 const memoria = JSON.parse(localStorage.getItem("joyas"));
    console.log(memoria);
    let cuenta = 0;
    if(!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("joyas",JSON.stringify([nuevoProducto]));
        cuenta = 1;
    } else{
        const indiceProducto = memoria.findIndex(joya => joya.id === producto.id);
        console.log(indiceProducto)
        const nuevaMemoria = memoria;
        if(indiceProducto === -1){
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            cuenta = 1;
        } else{
            nuevaMemoria[indiceProducto].cantidad ++;
            cuenta = nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem("joyas",JSON.stringify(nuevaMemoria));
        
    }
    actualizarNumeroCarrito();
    return cuenta;
}

function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("joyas"));
    const indiceProducto = memoria.findIndex(joya => joya.id === producto.id);
    if(memoria[indiceProducto].cantidad === 1){
        memoria.splice(indiceProducto,1);
        localStorage.setItem("joyas",JSON.stringify(memoria));
    } else{
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("joyas",JSON.stringify(memoria));
    actualizarNumeroCarrito()



}

function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}
const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito(){
    const memoria = JSON.parse(localStorage.getItem("joyas"));
    if(memoria && memoria.length >0){
    const cuenta = memoria.reduce((acum, current) => acum+current.cantidad,0 );
    cuentaCarritoElement.innerText= cuenta;
    console.log(cuenta)
    } else{
        cuentaCarritoElement.innerText = 0;
    }
}
actualizarNumeroCarrito();
