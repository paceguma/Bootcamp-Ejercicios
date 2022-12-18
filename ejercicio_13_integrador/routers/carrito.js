const express = require('express')
const routerCarrito = express.Router()

const controlador = require('../controller/carrito')

routerCarrito.post('/', controlador.guardarCarrito)

module.exports = routerCarrito