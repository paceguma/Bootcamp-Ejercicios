const express = require('express')
const routerUpload = express.Router()

routerUpload.post('/', (req, res) =>{
    res.send('Recibiendo imagen')
})

module.exports = routerUpload