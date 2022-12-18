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
  envio: Boolean,
})

//Modelo del doc almacenado en una coleccion
const ProductoModel = mongoose.model("productos", productoSchema)

//Conexion a la base de datos
class ProductoModelMongoDB {
  
  async conectarDB() {
    try {
      mongoose.set("strictQuery", false)
      await mongoose.connect("mongodb://127.0.0.1:27017/bcecommerce")
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
    try {
      const productos = await ProductoModel.find({})
      return productos
    } catch (error) {
      console.error(`Error al leer los productos, ${error}`);
    }
  }

  async leerProducto(id) {
    try {
      const producto = await ProductoModel.findOne({ _id: id })
      return producto
    } catch (error) {
      console.error(`Error al leer el producto ${error}`);
    }
  }

  async actualizarProducto(id, producto) {
    try {
      const resultado = await ProductoModel.updateOne({ _id: id }, { $set: producto })

      const productoActualizado = await ProductoModel.findById(id)

      return { resultado, productoActualizado }
    } catch (error) {
      console.error(`Error al actualizar un producto, ${error}`);
    }
  }

  async borrarProducto(id) {
    try {
      await ProductoModel.findByIdAndDelete(id)
      return "Ok delete producto"
    } catch (error) {
      console.error(`Error al borrar un producto ${error}`)
    }
  }
}

module.exports = ProductoModelMongoDB
