const express = require('express')
const routerProductos = express.Router()

const controlador = require('../controller/productos')

//GET ALL(NO ID//ONE(ID) -(READ)
routerProductos.get('/:id?', controlador.obtenerProductos)

//POST (CREATE)
routerProductos.post('/', controlador.guardarProducto)

//PUT (UPDATE)
routerProductos.put('/:id', controlador.actualizarProducto)

//DELETE
routerProductos.delete('/:id', controlador.borrarProducto)


module.exports = routerProductos