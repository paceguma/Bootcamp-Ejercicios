const mongoose = require("mongoose")

//Esquema del doc producto

const productoSchema = mongoose.Schema({
  nombre: String,
  precio: Number,
  stock: Number,
  marca: String,
  categoria: String,
  detalles: String,
  foto: String,
  envio: Boolean
})

//Modelo del doc almacenado en una coleccion
const ProductoModel = mongoose.model("productos", productoSchema)

//Conexion a la base de datos
class ProductoModelMongoDB {
    
    async conectarDB() {

    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect('mongodb://127.0.0.1:27017/bcecommerce')
      console.log(`Base de datos conectada`)

    } catch (error) {
      console.error(`MongoDB error al conectar ${error}`)
    }
  }

  async crearProducto(producto) {
    try {
      const productoGuardado = new ProductoModel(producto)
      await productoGuardado.save()
      return productoGuardado
    } catch (error) {
      console.error(`Error en el crearProducto ${error}`)
    }
  }

  async leerProductos() {
    const productos = await ProductoModel.find({})
    return productos
  }

  async leerProducto(id) {
    const producto = await ProductoModel.findOne({_id:id})
    console.log(producto);
    return producto
  }

  async actualizarProducto(id, producto) {

  }

  async borrarProducto(id) {

  }
}

module.exports = ProductoModelMongoDB
