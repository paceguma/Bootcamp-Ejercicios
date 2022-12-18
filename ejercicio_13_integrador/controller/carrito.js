const service = require('../service/carrito')

const guardarCarrito = async (req, res) => {
    const carrito = req.body
    const carritoGuardado = await service.guardarCarrito(carrito)
    
    let items = []
    for(let item of carritoGuardado) {
        items.push(
            {
                title: item.nombre,
                unit_price: Number(item.precio),
                quantity: Number(item.cantidad),
            }
        )
    }

}

module.exports = {
    guardarCarrito
}
