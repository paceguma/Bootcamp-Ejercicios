const express = require("express")
const bodyParser = require("body-parser");
const routerProductos = require("./routers/productos")
const routerCarrito = require("./routers/carrito")
const routerUpload = require("./routers/upload")

const app = express()
require("dotenv").config() //variables de entorno
app.use(bodyParser.json())

// Middleware (use oda mi app es afectada)
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//Middleware de routeo de mi app
app.use('/api/productos', routerProductos) //otro nivel porque sino este middle no afecta a estas rutas
app.use('/api/carrito', routerCarrito) //otro nivel porque sino este middle no afecta a estas rutas
app.use('/api/upload', routerUpload) //otro nivel porque sino este middle no afecta a estas rutas

app.use("/", (req, res) => {
  res.send("Ruta invalida")
})

const PORT = process.env.PORT
app.listen(PORT, (error) => {
  if (error) throw new Error(`Tuvimos un inconveniente, ${error}`)
  console.log(`Funcionando ok, en el ${PORT}`)
})
