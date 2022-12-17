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
      // await mongoose.connect(process.env.URI_MONGODB_REMOTA)
      await mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0')
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
      console.error(`Eror en el crearProducto ${error}`)
    }
  }

  async leerProductos() {
    const productos = await ProductoModel.find({})
    return productos
  }

  async leerProducto(id) {
    const producto = await ProductoModel.findById(id)
    return producto
  }

  async actualizarProducto(id, producto) {

  }

  async borrarProducto(id) {

  }
}

module.exports = ProductoModelMongoDB
