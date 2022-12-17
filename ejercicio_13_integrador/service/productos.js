const ProductoModel = require("../model/productos");

//Modelo instanciado
const model = ProductoModel.get('MONGODB')

const obtenerProducto = async id => {
    let producto = await model.leerProducto(id)
    return producto
}

const obtenerProductos = async () => {
    let productos = await model.leerProductos()
    return productos
}

const guardarProducto = async (producto) => {
    const productoGuardado = await model.guardarProducto(producto)
    return productoGuardado
}

module.exports = {
    obtenerProducto,
    obtenerProductos,
    guardarProducto
}