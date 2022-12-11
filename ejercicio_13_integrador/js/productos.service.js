//Interfaz para acceder a los productos

const URL_PRODUCTOS = 'https://6395c6db90ac47c68073403d.mockapi.io/productos'

async function obtenerProductosService(){
    let productos = await get(URL_PRODUCTOS)
    // console.log(productos);
    return productos
}

obtenerProductosService()