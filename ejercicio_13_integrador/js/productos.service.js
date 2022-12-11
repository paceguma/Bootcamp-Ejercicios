//Interfaz para acceder a los productos

const URL_PRODUCTOS = 'https://6395c6db90ac47c68073403d.mockapi.io/productos/' // OJO: barra

async function obtenerProductosService(){
    let productos = await get(URL_PRODUCTOS)
    // console.log(productos);
    return productos
}

obtenerProductosService()

//
async function guardarProductoService(producto){
    const productoGuardado = await post(URL_PRODUCTOS, producto) // el dato seria producto
    // console.log(productoGuardado);
    return productoGuardado
}

async function actualizarProductoService(id, producto){
    const productoActualizado = await put(URL_PRODUCTOS, id, producto)
    // console.log(productoActualizado);
    return productoActualizado
}

async function borrarProductoService(id){
    const productoBorrado = await del(URL_PRODUCTOS, id)
    // console.log(productoBorrado);
    return productoBorrado
}








//test:

// const campoEditado = {
//     ...producto, //spread operator -> saca el objeto y lo vuelve a poner adentro y como el precio esta aca, lo pisa.
//     precio: 456,

// }

// const producto = {
//     nombre: 'Heladera',
//     descripcion: 'Enfria',
//     precio: 134,
//     stock:2,
// }

// guardarProductoService(producto)
// borrarProductoService(5)
// actualizarProductoService(3, producto)