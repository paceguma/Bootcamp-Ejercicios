async function renderPlantillaListado(listado) {
    try {
        const respuesta = await fetch("plantillas/inicio.hbs")
        const plantillaHbs = await respuesta.text()
        const template = Handlebars.compile(plantillaHbs)
        const html = template({ listado })
        document.getElementsByClassName("cards-container")[0].innerHTML = html
    } catch (error) {
        console.error(error)
    }
}

function agregarCarrito(e, id, ref) {
    e.preventDefault()
    //Buscamos al objeto completo:
    const producto = productoController.productos.find(producto => producto.id == id)
    console.log(producto);
    carritoController.agregarAlCarrito(producto)
}

async function initInicio() {
    const productos = await productoController.obtenerProductos()
    console.log("productos". productos)
    await renderPlantillaListado(productos)
    document.querySelector(".section-cards__header p").innerHTML = `Se encontraron ${productos.length} productos`
}
