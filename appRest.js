const myBody            = document.querySelector("body");
///
const API_REST      = "https://ejemplo-api-rest-production.up.railway.app/mi-api";



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
}

async function obtenerInfoApi(api) {
    const resultado = await fetch(api);
    const info = await resultado.json();
    info.forEach(generarTarjeta); 
}


async function muestraResAccion(dato, res) {
    const resultadoDiv = document.createElement("div");
    resultadoDiv.innerHTML = ` 
        <p>Pedido: ${dato}, Resultado: ${JSON.stringify(res)}</p>
    `;
    myBody.appendChild(resultadoDiv);
}

async function apiGet(dato) {
    let api = API_REST;
    api = `${api}${dato}`;
    console.log("pido GET con: " + dato, api);
    let res = await fetch(api);
    if (res.ok) {
        const htmlResponse = await res.text();
        muestraResAccion(dato, htmlResponse);
    } else {
        console.error("Error en GET");
    }
}

async function apiPUT() {
    let api = API_REST;
    console.log("pido PUT con: " + api);
    //let res = await fetch(api);
    let res = await fetch (api,{
        method: 'PUT'
    }); 
    
    if (res.ok) {
        let resData = await res.json();
        let mensaje = resData.mensaje;
        console.log(mensaje);
        // const htmlResponse = await res.text();
        // muestraResAccion("PUT", htmlResponse);
        muestraResAccion("PUT", mensaje);
    
    } else {
        console.error("Error en PUT");
    }
}


async function apiDELETE() {
    let api = API_REST;
    console.log("pido DELETE con: " + api);
    let res = await fetch (api,{
        method: 'DELETE'
    }); 
    
    if (res.ok) {
        let resData = await res.json();
        let mensaje = resData.mensaje;
        console.log(mensaje);
        muestraResAccion("DELETE", mensaje);
    
    } else {
        console.error("Error en DELETE");
    }
}

async function apiPOST(texto) {
    let api = API_REST;
    console.log("Pido un POST: " + api);

    const postData = {
        info2: "Datos de prueba para POST" 
    };
    
    let res = await fetch(api, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(postData) 
    });

    if (res.ok) {
        const resData = await res.json();
        const mensaje = resData.mensaje;
        console.log(mensaje);
        muestraResAccion("POST", mensaje);
    } else {
        console.error("Error en POST");
    }
}


async function apiPOST2(texto) {
    let api = API_REST;
    api = `${api}/${texto}`;
    console.log("Pido un POST: "+api);
    res = await fetch (api,{
        method:"POST"       
        });
    if (res.ok) {
        let htmlResponse = await res.text();
        muestraResAccion("POST", htmlResponse);
        console.log(htmlResponse);
    } else {
        console.error("Error en POST");
    }
}

/// INICIO
async function main () {
    // Pruebas GET
    await apiGet("");
    await apiGet("/1");
    await apiGet("?param=false&param2='otrovalor'");

    // Pruebas PUT
    await apiPUT();

    // Pruebas DELETE
    await apiDELETE();
    
    // Pruebas POST
    await apiPOST("");
    await apiPOST2("Antonio");
    

// FIN   
}

main();
