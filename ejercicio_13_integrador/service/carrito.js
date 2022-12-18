const CarritoModel = require("../model/carrito");

const model = CarritoModel.get(process.env.PERSISTENCIA || 'MONGODB')

const guardarCarrito = async carrito => {
    const carritoGuardado = await model.crearCarrito(carrito)
    return carritoGuardado
}

module.exports = {
    guardarCarrito
}