//Interfaz para acceder a los productos
class ProductoService {

    // URL_PRODUCTOS = 'https://6395c6db90ac47c68073403d.mockapi.io/productos/' // OJO: barra
    //cuando tengo una porpiedad que le pertenecen a la clase usamos this
    URL_PRODUCTOS = '/api/productos/'

    async obtenerProductosService() {
        let productos = await http.get(this.URL_PRODUCTOS) 
        return productos
    }

    async guardarProductoService(producto) {
        const productoGuardado = await http.post(this.URL_PRODUCTOS, producto) // el dato seria producto
        return productoGuardado
    }

    async actualizarProductoService(id, producto) {
        const productoActualizado = await http.put(this.URL_PRODUCTOS, id, producto)
        return productoActualizado
    }

    async borrarProductoService(id) {
        const productoBorrado = await http.del(this.URL_PRODUCTOS, id)
        return productoBorrado
    }
}

const productoService = new ProductoService() //instancia del objeto