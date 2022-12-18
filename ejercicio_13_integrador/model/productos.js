const ProductoModelFile = require('./productosFile');
const ProductoModelMongoDB = require('./productosMongoDb')

class ProductoModel {

    static get(tipo) { // no necesita instanciarlo, porque es estatico
        switch (tipo) {
            case 'MONGODB':
                console.log('Persistencia en MongoDB(productos)');
                const mongodb = new ProductoModelMongoDB()
                mongodb.conectarDB()
                return mongodb

            case 'FILE':
                console.log('Persistencia en file(productos)');
                const file = new ProductoModelFile()
                return file

            default:
                console.log('No paso');
                break;
        }
    }
}

module.exports = ProductoModel
