class ProductoController extends ProductoModel{
    
    constructor() {
        super()
        this.guardarProducto = this.guardarProducto.bind(this)
    }
    
    async obtenerProductos() {
        this.productos = await productoService.obtenerProductosService()
        return this.productos
    }

    async guardarProducto(producto) {
        const productoGuardado = await productoService.guardarProductoService(producto)
        this.productos.push(productoGuardado)
        renderTablaAlta(null, this.productos)
    }

    async actualizarProducto(id) {
        const producto = formularioAlta.leerProductoIngresado()
        formularioAlta.limpiarFormulario()

        const productoActualizado = await productoService.actualizarProductoService(id, producto)

        //Buscar dentro de la base de datos el producto que quiero editar
        const index = this.productos.findIndex(producto => producto.id == productoActualizado.id)
        this.productos.splice(index, 1, productoActualizado)

        renderTablaAlta(null, this.productos)
    }

    //Button para borrar producto
    async borrarProducto(id) { 
        let productoBorrado = await productoService.borrarProductoService(id)
        const index = this.productos.findIndex(producto => producto.id == productoBorrado.id)
        this.productos.splice(index, 1)

        renderTablaAlta(null, this.productos)
    }


}

const productoController = new ProductoController()