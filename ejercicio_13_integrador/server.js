const express = require('express')
const app = express()
require('dotenv').config() //variables de entorno

app.use('/', (req, res) => {
    res.send('probando')

})

const PORT = process.env.PORT
app.listen(PORT, (error) => {
    if(error) throw new Error(`Tuvimos un inconveniente, ${error}`)
    console.log(`Funcionando ok, en el ${PORT}`);
})
