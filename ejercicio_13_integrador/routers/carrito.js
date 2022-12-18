const express = require('express')
const routerCarrito = express.Router()

const controlador = require('../controller/carrito')
const { feedBack }= require('../controller/pago')

routerCarrito.post('/', controlador.guardarCarrito)
routerCarrito.get('/feedback', feedBack)

module.exports = routerCarrito