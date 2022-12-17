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
const ProductoModel = mongoose.model('productos', productoSchema)

//Conexion a la base de datos
class ProductoModelMongoDB {
   async conectarDB(){
    try {
      await mongoose.connect(process.env.URI_MONGODB_LOCAL)
      console.log(`Base de datos conectada`)
    } catch (error) {
      console.error(`MongoDB error al conectar ${error}`);
    }
  }

  async crearProducto(producto){

  }

  async leerProductos(){

  }

  async leerProducto(){

  }

  async actualizarProducto(id, producto){

  }

  async borrarProducto(id){

  }
}

module.exports = ProductoModelMongoDB