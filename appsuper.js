//const API_PRODUCTOS     = "https://cors-anywhere.herokuapp.com/https://api-tienda-losdevs.up.railway.app/api/productos";
const API_PRODUCTOS     = "https://api-tienda-losdevs.up.railway.app/api/productos/";
const API_PRODUCTO_N    = "https://api-tienda-losdevs.up.railway.app/api/productos/1";
const API_AGREGAR_PROD  = "https://api-tienda-losdevs.up.railway.app/api/productos";
const API_ACTUALIZ_PROD = "https://api-tienda-losdevs.up.railway.app/api/productos/:id";
const API_ELIMINAR_PROD = "https://api-tienda-losdevs.up.railway.app/api/productos/:id";

async function generarTarjeta(productos) {    // muestra los productos
    document.querySelector("body").innerHTML += `
        <div class="card" style="width: 12rem;">
        <img src="${productos.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Nombre: ${productos.nombre}</h5>
            <p class="card-text">Nro Id: ${productos.id}</p>
            <p class="card-text">Precio: ${productos.precio}</p>
            <a href="#" class="btn btn-primary">Modificar</a>
            </div>
        </div>
    `;
}

async function obtenerInfoApi(api) {
    const resultado = await fetch(api);
    const info = await resultado.json();
    info.forEach(generarTarjeta); 
}

obtenerInfoApi(API_PRODUCTOS);