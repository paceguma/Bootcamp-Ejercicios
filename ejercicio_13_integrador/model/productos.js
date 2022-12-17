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