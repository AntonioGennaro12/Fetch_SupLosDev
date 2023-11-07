const myBody            = document.querySelector("body");
///
const API_REST      = "https://ejemplo-api-rest-production.up.railway.app/mi-api";
const API_REST_V2   = "https://ejemplo-api-restv2-production.up.railway.app";


async function generarTarjeta(amigos) {    // muestra amigos
    const resultadoDiv = document.createElement("div");
    resultadoDiv.innerHTML = `
        <div class="card" style="width: 8rem;">
            <div class="card-body">
            <p class="card-text">NroOrd: ${amigos.nro_orden}</p>
            <p class="card-text">Nombre: ${amigos.amigo_nombre}</p>
            <p class="card-text">Apelli: ${amigos.amigo_apellido}</p>
            <p class="card-text">Telefo: ${amigos.amigo_telefono}</p>
            <p class="card-text">Telefo: ${amigos.amigo_email}</p>
            </div>
        </div>
    `;
    myBody.appendChild(resultadoDiv);
}

async function obtenerInfoApi(api) {
    const resultado = await fetch(api);
    const info = await resultado.json();
    info.forEach(generarTarjeta); 
}

async function muestraResAccion(dato, res) {
    const resultadoDiv = document.createElement("div");
    resultadoDiv.innerHTML = ` 
        <p>Pedido: ${dato}, Resultado: ${res}</p>
    `;
    myBody.appendChild(resultadoDiv);
}

async function apiGet(dato) {
    let api = API_REST_V2;
    api = `${api}${dato}`;
    console.log("pido GET con: " + dato, api);
    let res = await fetch(api);
    if (res.ok) {
        //const htmlResponse = await res.text();
        //muestraResAccion(dato, htmlResponse);
        const info = await res.json();
        info.forEach(generarTarjeta); 

    } else {
        console.error("Error en GET");
    }
}

async function apiPUT(dato) {
    let api = API_REST_V2;
    api = `${api}${dato}`;
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


async function apiDELETE(dato) {
    let api = API_REST_V2;
    api = `${api}${dato}`;
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

/***
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
 */

// Agrega elemento a base de amigos 
async function apiPOST(deltaUrl, nom, ape, tel, mail) {
    let api = API_REST_V2;
    api = `${api}${deltaUrl}`;
    console.log("Pido un POST: " + api);
    let res = await fetch(api, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(
            {
                nombre: nom,
                apellido: ape,
                telefono: tel,
                email: mail
            }
        ) 
    });
    if (res.ok) {
        const resData = await res.json();
        const mensaje = resData.dato;
        console.log(mensaje);
        muestraResAccion("POST", mensaje);
    } else {
        console.error("Error en POST");
    }
}


async function apiPOST2(texto) {
    let api = API_REST_V2;
    api = `${api}${texto}`;
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
    await apiGet("/mi-api/");
    await apiGet("/mi-api/1");
    await apiGet("?param=false&param2='otrovalor'");

    // Pruebas PUT
    await apiPUT("/mi-api/");

    // Pruebas DELETE
    await apiDELETE("/mi-api/");
    
    // Pruebas POST
    // await apiPOST("/mi-api", "Juan Pablo", 
    //                    "Martinez", 1149477788, 
    //                    "juanpimartinez@gmail.com");

    await apiPOST2("/mi-api/Antonio");
    // Pido de nuevo 
    await apiGet("");
    

// FIN   
}

main();
