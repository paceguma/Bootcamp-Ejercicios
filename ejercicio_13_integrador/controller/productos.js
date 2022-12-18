//Controladores: gestionan la info - quien lo muestra y a quien mostrarsela

const service = require('../service/productos')

const obtenerProductos = async (req, res) => {
  let id = req.params.id
  // console.log(id)
  if (id) {
    const producto = await service.obtenerProducto(id)
    return res.status(200).json(producto)
  } else {
    const productos = await service.obtenerProductos()
    return res.status(200).json(productos)
  }
}

const guardarProducto = async (req, res) => {
  const producto = req.body
  const productoGuardado = await service.guardarProducto(producto)
  res.status(201).json(productoGuardado)
}

const actualizarProducto = async (req, res) => {
  const { id } = req.params
  const producto = req.body
  const productoActualizado = await service.actualizarProducto(id, producto)
  res.status(200).json(productoActualizado)
}

const borrarProducto = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(
      {
        borrado: false,
        msg: `No ingreso el id`
      }
    )
  }

  const productoBorrado = await service.borrarProducto(id)

  res.status(200).json(
    {
      borrado: true,
      msg: `Producto borrado correctamente`,
      productoBorrado
    })
      }

module.exports = {
  obtenerProductos,
  guardarProducto,
  actualizarProducto,
  borrarProducto,
}
