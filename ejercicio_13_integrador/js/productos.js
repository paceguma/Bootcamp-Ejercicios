let productos = []

async function obtenerProductos() {
    productos = await obtenerProductosService()
    renderProds()
}

async function guardarProducto() {
    //leo el formulario
    const producto = leerProductoIngresado()
    //limpio el formulario porque ya no lo necesito porque ya lo guarde
    limpiarFormulario()
    // hago la peticion
    const productoGuardado = await guardarProductoService(producto)
    // console.log(productoGuardado);

    productos.push(productoGuardado)

    renderProds()

}

async function actualizarProducto(id) {
    console.log('Actualizar producto', id);

    const producto = leerProductoIngresado()
    //ya tengo la info entonces borro el form:
    limpiarFormulario()

    const productoActualizado = await actualizarProductoService(id, producto)
    // console.log(productoActualizado);

    //Buscar dentro de la base de datos el producto que quiero editar
    const index = productos.findIndex(producto => producto.id == productoActualizado.id)
    productos.splice(index, 1, productoActualizado)

    renderProds()
}

//Button para borrar producto
async function borrarProducto(id){
    // console.log('Borrar el producto')

    let productoBorrado = await borrarProductoService(id)

    const index = productos.findIndex(producto => producto.id == productoBorrado.id)
    productos.splice(index, 1)

    renderProds()
}

