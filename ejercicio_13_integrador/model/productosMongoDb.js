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
  
  pk = '_id'

  
  async conectarDB() {
    try {
      mongoose.set("strictQuery", false)
      // await mongoose.connect("mongodb://127.0.0.1:27017/bcecommerce")
      await mongoose.connect("mongodb+srv://paulagutierrezmar:Qx2ZYrV92XGehsWk@cluster0.maijrtg.mongodb.net/bcecommerce")
      console.log(`Base de datos conectada`)
    } catch (error) {
      console.error(`MongoDB error al conectar ${error}`)
    }
  }


  genIdKey(obj) { // array o un obj
    //console.log(obj)
    if(Array.isArray(obj)) { // true o false
        // Sacarle el guión al ID de los documentos.
        for(let i=0; i<obj.length; i++) {
            obj[i].id = obj[i][this.pk] // this._id => this.id
        }
    }
    else {
        obj.id = obj[this.pk] // this._id => this.id
    }

    return obj
}

  async crearProducto(producto) {
    try {
      const productoGuardado = new ProductoModel(producto)
      await productoGuardado.save()


      const productos = await ProductoModel.find({}).lean() // lean() => convertir el obj mongoose en un obj de vanilla js
      const productoGuardados = productos[productos.length-1] 
      return this.genIdKey(productoGuardados) // {_id: ,..., } => { id: ,..., }

    } catch (error) {
      console.error(`Error en el crearProducto ${error}`)
    }
  }

  async leerProductos() {
    try {
      const productos = await ProductoModel.find({}).lean()
      return this.genIdKey(productos)
    } catch (error) {
      console.error(`Error al leer los productos, ${error}`);
      return []
    }
  }

  async leerProducto(id) {
    try {
      const producto = await ProductoModel.findOne({ _id: id }).lean()
      return this.genIdKey(producto)
    } catch (error) {
      console.error(`Error al leer el producto ${error}`);
      return {}
    }
  }

  async actualizarProducto(id, producto) {
    try {
      const resultado = await ProductoModel.updateOne({ _id: id }, { $set: producto })

      const productoActualizado = await ProductoModel.findById(id).lean()

      return this.genIdKey(productoActualizado)
    } catch (error) {
      console.error(`Error al actualizar un producto, ${error}`);
      return {}
    }
  }

  async borrarProducto(id) {
    try {
        const productoBorrado = await ProductoModel.findByIdAndDelete(id)
        return this.genIdKey(productoBorrado)
    } catch (error) {
      console.error(`Error al borrar un producto ${error}`)
      return {}
    }
  }
}

module.exports = ProductoModelMongoDB
