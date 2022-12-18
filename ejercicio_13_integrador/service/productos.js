// Service: Se encuentra entre el controlador y el modelo. Que tipo de persistencia vas a trabajar 
const ProductoValidation = require("../utils/producto.validation");
const ProductoModel = require("../model/productos");

//Modelo instanciado
const model = ProductoModel.get(process.env.PERSISTENCIA || 'MONGODB')

const obtenerProducto = async id => {
    let producto = await model.leerProducto(id)
    return producto
}

const obtenerProductos = async () => {
    console.log('entramos a la ruta')
    let productos = await model.leerProductos()
    return productos
}

const guardarProducto = async (producto) => {
    const errorValidacion = ProductoValidation.validar(producto)

    if(!errorValidacion) {
        const productoGuardado = await model.crearProducto(producto)
        return productoGuardado 
    } else {
        console.log('Error al guardar el producto', errorValidacion.details[0].message)
        return {}
    }
}

const borrarProducto = async id => {
    const productoBorrado = await model.borrarProducto(id)
    return productoBorrado
}

const actualizarProducto = async (id, producto) => {
    const errorValidacion = ProductoValidation.validar(producto)

    if(!errorValidacion) {
        const productoActualizado = await model.actualizarProducto(id, producto)
        return productoActualizado 
    } else {
        console.log('Error al actualizar el producto', errorValidacion.details[0].message)
        return {}
    }
}

module.exports = {
    obtenerProducto,
    obtenerProductos,
    guardarProducto,
    borrarProducto,
    actualizarProducto
}