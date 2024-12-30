const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precios");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");


function crearTarjetasProductosInicio(){
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("joyas"));
    console.log(productos);
    if(productos && productos.length > 0) {
    productos.forEach((producto) => {
        const nuevaJoya = document.createElement("div");
        nuevaJoya.classList = "tarjeta-producto";
        nuevaJoya.innerHTML = `
        <img src=${producto.img}>
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}</p>
        <div>
        <button>-</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button>+</button>
        </div>
        `;

        contenedorTarjetas.appendChild(nuevaJoya);

        nuevaJoya
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
            agregarAlCarrito(producto);
            const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
            cuentaElement.innerText = agregarAlCarrito(producto);
            actualizarTotales();

       });

        nuevaJoya
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
            restarAlCarrito(producto) 
            crearTarjetasProductosInicio();
            actualizarTotales();
        });   
    });
}
}

crearTarjetasProductosInicio();
actualizarTotales();

function actualizarTotales(){
    const productos = JSON.parse(localStorage.getItem("joyas"));
    let unidades = 0;
    let precio = 0;
    if(productos && productos.length>0){
        productos.forEach(producto =>{
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        })
        unidadesElement.innerText = unidades;
        precioElement.innerText = precio;
    }

}
function revisarMensajeVacio (){
    const productos = JSON.parse(localStorage.getItem("joyas"));
    console.log (productos, productos == true)
carritoVacioElement.classList.toggle("escondido",productos && productos.length>0);
totalesElement.classList.toggle("escondido",!(productos && productos.length>0));

}
revisarMensajeVacio();

reiniciarCarritoElement.addEventListener("click",reiniciarCarrito);
function reiniciarCarrito(){
localStorage.removeItem("joyas");
actualizarTotales();
crearTarjetasProductosInicio();
}