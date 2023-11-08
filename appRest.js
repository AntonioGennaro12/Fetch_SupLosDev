const myBody            = document.querySelector("body");
///
//const API_REST_V2   = "https://ejemplo-api-restv2-production.up.railway.app/mi-api/";
const API_REST_V2   = "http://localhost:5000/mi-api/";

async function generarTarjeta(amigos) {    // muestra amigos
    myBody.style.display = "flex";
    myBody.style.flexWrap = "wrap";
    const resultadoDiv = document.createElement("div");
    resultadoDiv.innerHTML = `
        <div class="card">
            <div class="card-body">
            <p class="card-text">NroOrden: ${amigos.nro_orden}</p>
            <p class="card-text">Nombre: ${amigos.amigo_nombre}</p>
            <p class="card-text">Apellido: ${amigos.amigo_apellido}</p>
            <p class="card-text">Telefono: ${amigos.amigo_telefono}</p>
            <p class="card-text">email: ${amigos.amigo_email}</p>
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
    myBody.style.display = "grid";
    const resultadoDiv = document.createElement("div");
    resultadoDiv.innerHTML = ` 
        <div class="cont-res">
            <p>Pedido: ${dato}</p>
            <p>Resultado: ${res}</p>
        </div>
    `;
    myBody.appendChild(resultadoDiv);
}

async function apiGetItem(dato) {
    let api = API_REST_V2;
    api = `${api}${dato}`;
    console.log("pido GET con URL : "+api);
    let res = await fetch(api);
    if (res.ok) {
        if (dato == "") { muestraResAccion("GET todos los elementos", "OK!");}
        else {muestraResAccion("GET Elemento Nro: "+dato, "OK!");}
        const info = await res.json();
        info.forEach(generarTarjeta); 

    } else {
        console.error("Error en GET");
    }
}

async function apiPUT(item, nom, ape, tel, mail) {     // modifica un Item
    let api = API_REST_V2;
    api = `${api}${item}`;
    console.log("Pido PUT con: " + api);
    let res = await fetch (api,{
        method:"PUT",
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
        let resData = await res.json();
        let mensaje = resData.mensaje;
        console.log(mensaje);
        muestraResAccion("PUT Elemento:"+item, mensaje);
    
    } else {
        console.error("Error en PUT");
    }
}

async function apiDELETE(item) {
    let api = API_REST_V2;
    api = `${api}${item}`;
    console.log("pido DELETE con: " + api);
    let res = await fetch (api,{
        method: 'DELETE'
    }); 
    
    if (res.ok) {
        let resData = await res.json();
        let mensaje = resData.mensaje;
        console.log(mensaje);
        muestraResAccion("DELETE Elemento: "+item, mensaje);
    
    } else {
        muestraResAccion("DELETE Elemento: "+item, "ERRRROR!!!");
        console.error("Error en DELETE");
    }
}

// Agrega elemento a base de amigos 
async function apiPOST(xxx, nom, ape, tel, mail) {
    let api = API_REST_V2;
    api = `${api}${xxx}`;
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

/// INICIO
async function main () {
    // Pruebas GET
    await apiGetItem("");   // trae todo sin parámetros
    await apiGetItem("2");  // trae un elemento de la tabla
    await apiGetItem("7");  // trae un elemento de la tabla

    // Pruebas POST
    /** 
    await apiPOST("", "Juan Pablo", 
                        "Martinez", 1149477788, 
                       "juanpimartinez@gmail.com");
    await apiGetItem("");
    */
    // Pruebas PUT
    await apiPUT("11", "Pablo Juan", 
                        "Martinez", 1149477788,
                        "juanpimartinez@gmail.com");       // modifica un elemento 
    await apiGetItem("11");
    // Pruebas DELETE
    //await apiDELETE("10");
    // Pido de nuevo 
    await apiGetItem("");
   

// FIN   
}

main();
