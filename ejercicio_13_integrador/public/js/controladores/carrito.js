


class CarritoController extends CarritoModel {

    constructor() {
        super()

        try {
            //Buscar que hay en el LStorage
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || []
            // console.log(this.carrito);
        } catch (error) {
            this.carrito = []
            localStorage.setItem('carrito', this.carrito)
        }

    }

    elProductoEstaEnElCarrito(producto) {
        // console.log(this.carrito);
        return this.carrito.filter(prod => prod.id == producto.id).length 
    }

    obtenerProductoDeCarrito(producto) {
        return this.carrito.find(prod => prod.id == producto.id)
    }

    agregarAlCarrito(producto) {
        // console.log(producto);
        if (!this.elProductoEstaEnElCarrito(producto)) {
            producto.cantidad = 1
            this.carrito.push(producto)
        } else {
            const productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            productoDeCarrito.cantidad++
        }
        localStorage.setItem('carrito', JSON.stringify(this.carrito))
    }

    async borrarProductoCarrito(id) {
        try {
            const index = this.carrito.findIndex(prod => prod.id == id)
            this.carrito.splice(index, 1)
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
            await renderTablaCarrito(this.carrito)
        } catch (error) {
            console.error(error);
        }
    }

    async enviarCarrito() {
        try {
            const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
            elemSectionCarrito.innerHTML = `<h2>Enviando Carrito</h2>`
            const preference = await carritoService.guardarCarritoServicio(this.carrito)
            // await carritoService.guardarCarritoServicio(this.carrito)
            //una vez que enviamos los productos limpiamos el carrito
            this.carrito = []
            //el localStorage solo guarda strings:
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
            elemSectionCarrito.innerHTML = `<h2>Enviando Carrito OKKK!</h2>`

            setTimeout( async () => {
                elemSectionCarrito.classList.remove('section-carrito--visible')

                console.log('PAGANDO', preference)
                await renderPago(preference)
            }, 0)
            
        } catch (error) {
            console.error(error);
        }
    }

    cerrarContainerCarrito(){
        const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
        const cerrarContainerCarrito = document.getElementsByClassName('btnCerrarContainerCarrito')[0]
        cerrarContainerCarrito.addEventListener('click', () => {
            elemSectionCarrito.classList.remove('section-carrito--visible')
        })
        // console.log(cerrarContainerCarrito);
    }
}

const carritoController = new CarritoController()


