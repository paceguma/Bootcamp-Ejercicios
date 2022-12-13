class CarritoController extends CarritoModel{

    constructor(){
        super()
        try {
            //Buscar que hay en el LStorage
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || []
        } catch (error) {
            this.carrito =[]
            localStorage.setItem('carrito', this.carrito)
        }

    }
    
    elProductoEstaEnElCarrito(){

    }

    obtenerProductoDeCarrito(){

    }

    agregarAlCarrito(){

    }

    borrarProductoCarrito(){

    }

    enviarCarrito(){

    }
}

const carritoController = new CarritoController()