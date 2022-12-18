const mongoose = require('mongoose')

//Esquema
const carritoSchema = mongoose.Schema({
    carrito:Array
})

//Modelo

const CarritoModel = mongoose.model('carritos', carritoSchema)

class CarritoModelMongoDB {

    async crearCarrito(carrito){
        try {
            const carritoSave = new CarritoModel({carrito})
            await carritoSave.save()
            return carrito
        } catch (error) {
            console.error(`Error en crear el carrito, ${error}`);
            return {}
        }
    }

    
    
}

module.exports = CarritoModelMongoDB