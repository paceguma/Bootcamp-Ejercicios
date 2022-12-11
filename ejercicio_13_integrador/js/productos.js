let productos = []

async function obtenerProductos(){
    productos = await obtenerProductosService()
    renderProds()
}

async function guardarProducto(){
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