Proyecto integrador -Educación IT

Paula Gutierrez

mongosh "mongodb+srv://cluster0.maijrtg.mongodb.net/PrimerProyectoEducacionIt" --apiVersion 1 --username paulagutierrezmar

db.productos.insertOne(
{
nombre: 'TV',
precio: 123
}
)

db.productos.insertOne({
nombre: 'Prod1',
precio: 222,
stock: 333,
marca: 'Prueba',
categoria: 'Cat1',
detalles: 'Det1',
foto: 'foto.jpg',
envio: true

}
)

db.productos.insertMany(
[{
nombre:'compu',
precio: 1243
},
{
nombre:'tablet',
precio:13251
},
{
nombre:'mouse',
precio: 511515
}]
)
