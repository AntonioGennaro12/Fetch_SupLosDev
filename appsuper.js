const myBody            = document.querySelector("body");
///
const API_PRODUCTOS     = "https://api-tienda-losdevs.up.railway.app/api/productos/";
const API_PRODUCTO_N    = "https://api-tienda-losdevs.up.railway.app/api/productos/1";
const API_AGREGAR_PROD  = "https://api-tienda-losdevs.up.railway.app/api/productos";
const API_ACTUALIZ_PROD = "https://api-tienda-losdevs.up.railway.app/api/productos/";
const API_ELIMINAR_PROD = "https://api-tienda-losdevs.up.railway.app/api/productos/";

const IMG_PROD29        = "https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/2551245_f.jpg";
const IMG_PROD31        = "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/400/953/products/02-05-12-001-49a850031a93516aab16400227637476-240-0.jpg";
const IMG_PRODxx        = "https://cotillonfantasia.com.ar/wp-content/uploads/2021/04/chocolinas-x250gr.jpeg";
const IMG_PRODyy        = "https://groceryandco.com/cdn/shop/products/CAJA_2_PRODUCTO_14_FOTO_A_1200x1200.jpg?v=1614295436";

let nombreProd          = "xxx";
let precioProd          = 1000;
let imgProd             = "";
let resActualizar       = "";
let lastId              = 0;

async function generarTarjeta(productos) {    // muestra los productos
    myBody.innerHTML += `
        <div class="card" style="width: 8rem;">
        <img src="${productos.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Nombre: ${productos.nombre}</h5>
            <p class="card-text">Nro Id: ${productos.id}</p>
            <p class="card-text">Precio: ${productos.precio}</p>
            <a href="#" class="btn btn-primary">Modificar</a>
            </div>
        </div>
    `;
    lastId = productos.id; // guarda el Id como si fuera el ultimo...
}

async function obtenerInfoApi(api) {
    const resultado = await fetch(api);
    const info = await resultado.json();
    info.forEach(generarTarjeta); 
}

async function agregarPoducto() {
    let api = API_AGREGAR_PROD;
    console.log("entré a agregar: "+api);
    res = await fetch (api,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
                nombre: nombreProd,
                precio: precioProd,
                imagen: imgProd
            }
        )
    });
    res = await res.json();
    console.log(res);
    // Muestro el resultdo en la página
    muestraResAccion(9999, res);
}

async function eliminaProducto (id) {
    let api = API_ELIMINAR_PROD;
    api = `${api}${id}`;
    console.log("entré a borrar: "+api);
    res = await fetch (api,{
        method: 'DELETE'
        });
        res = await res.json();
        console.log(res);
    // Muestro el resultdo en la página
    muestraResAccion(id, res);
}

async function modificarProducto(prod) {
    let api = API_ACTUALIZ_PROD;
    api = `${api}${prod}`;
    console.log("entré a modificar: "+api);
    res = await fetch (api,{
        method:"PUT",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                id: prod,
                nombre: nombreProd,
                precio: precioProd,
                imagen: imgProd
            }
        )
    });
    res = await res.json();
    console.log(res);
    // Muestro el resultdo en la página
    muestraResAccion(prod, res);
}

async function muestraResAccion(prod, res) {
    const resultadoDiv = document.createElement("div");
    resultadoDiv.innerHTML = ` 
        <p>Resultado Prod ${prod}: ${JSON.stringify(res)}</p>
        <p></p>
    `;
    myBody.appendChild(resultadoDiv);
}

/// INICIO
async function main () {
    /// Pide lista de productos inicial
    obtenerInfoApi(API_PRODUCTOS);

    // Modifica producto 28
    nombreProd = "Papas fritas Lays 330gr"
    precioProd = 2357;
    imgProd = IMG_PROD29;
    await modificarProducto(28);
    
    /// Pide lista de productos
    obtenerInfoApi(API_PRODUCTOS);

    // Modifica producto 40
    nombreProd = "Dv Catena Cabernet Malbec 750ml"
    precioProd = 4941;
    imgProd = IMG_PROD31;
    await modificarProducto(40);
    
    /// Pide lista de productos nuevamente
    obtenerInfoApi(API_PRODUCTOS);

    // Agrega un producto (será el 4xx?)
    nombreProd = "Chocolinas 250gr"
    precioProd = 750;
    imgProd = IMG_PRODxx;
//    await agregarPoducto();
    /// Pide lista de productos nuevamente
    // obtenerInfoApi(API_PRODUCTOS);

// Modifica producto 41
nombreProd = "Yerba Unión Suave Liviana 500gr"
precioProd = 1499;
imgProd = IMG_PRODyy;
await modificarProducto(41);
/// Pide lista de productos nuevamente
obtenerInfoApi(API_PRODUCTOS);
console.log(lastId);
    // Elimina el ultimo producto generado (lastId)
   // await eliminaProducto (lastId);
    /// Pide lista de productos nuevamente y ultima
    obtenerInfoApi(API_PRODUCTOS);
console.log(lastId);

// FIN *********    
}

main();
