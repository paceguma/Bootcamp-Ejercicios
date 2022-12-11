//Interfaz para acceder a los productos
class ProductoService {

    URL_PRODUCTOS = 'https://6395c6db90ac47c68073403d.mockapi.io/productos/' // OJO: barra
    //cuando tengo una porpiedad que le pertenecen a la clase usamos this

    async obtenerProductosService() {
        let productos = await get(this.URL_PRODUCTOS)
        // console.log(productos);
        return productos
    }

    async guardarProductoService(producto) {
        const productoGuardado = await post(this.URL_PRODUCTOS, producto) // el dato seria producto
        // console.log(productoGuardado);
        return productoGuardado
    }

    async actualizarProductoService(id, producto) {
        const productoActualizado = await put(this.URL_PRODUCTOS, id, producto)
        // console.log(productoActualizado);
        return productoActualizado
    }

    async borrarProductoService(id) {
        const productoBorrado = await del(this.URL_PRODUCTOS, id)
        // console.log(productoBorrado);
        return productoBorrado
    }
}

const productoService = new ProductoService() //instancia del objeto