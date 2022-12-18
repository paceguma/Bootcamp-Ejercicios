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

const borrarProducto = async id => {
    const productoBorrado = await model.borrarProducto(id)
    return productoBorrado
}

const actualizarProducto = async (id, producto) => {
    const productoActualizado = await model.actualizarProducto(id, producto)
    return productoActualizado
}

module.exports = {
    obtenerProducto,
    obtenerProductos,
    guardarProducto,
    borrarProducto,
    actualizarProducto
}