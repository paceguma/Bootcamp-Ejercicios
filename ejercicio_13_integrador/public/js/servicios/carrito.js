class CarritoService{
    // URL_CARRITO ='https://6395c6db90ac47c68073403d.mockapi.io/carrito/'
    URL_CARRITO ='/api/carrito'

    async guardarCarritoServicio(carrito){
        const carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado
    }
}

const carritoService = new CarritoService()