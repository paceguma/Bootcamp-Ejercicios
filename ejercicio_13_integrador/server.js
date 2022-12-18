const express = require("express")
const routerProductos = require("./routers/productos")
const app = express()
require("dotenv").config() //variables de entorno

// Middleware (use oda mi app es afectada)
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//Middleware de routeo de mi app
app.use('/api/productos', routerProductos) //otro nivel porque sino este middle no afecta a estas rutas

app.use("/", (req, res) => {
  res.send("probando")
})

const PORT = process.env.PORT
app.listen(PORT, (error) => {
  if (error) throw new Error(`Tuvimos un inconveniente, ${error}`)
  console.log(`Funcionando ok, en el ${PORT}`)
})
