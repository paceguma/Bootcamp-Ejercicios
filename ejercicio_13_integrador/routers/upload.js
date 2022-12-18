const express = require('express')
const routerUpload = express.Router()
const upload = require('../config/multer')
const controlador = require('../controller/upload')

routerUpload.post('/', upload.single('foto'), controlador.uploadImagen)

module.exports = routerUpload