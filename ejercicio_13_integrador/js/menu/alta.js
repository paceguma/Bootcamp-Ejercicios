class FormularioAlta {
    inputs = null
    form = null
    button = null
    camposValidos = [false, false, false, false, false, false, false]

    //Todas las expresiones regulares de los campos
    regExpValidar = [
        /^.+$/,         //nombre
        /^.+$/,         //precio
        /^[0-9]+$/,     //stock
        /^.+$/,         //marca
        /^.+$/,         //categoria
        /^.+$/,         //detalles
        /^.+$/         //foto
    ]

    constructor(renderTablaAlta, guardarProducto) {
        //Llamo a las propiedades
        this.inputs = document.querySelectorAll('main form input')
        this.form = document.querySelector('main form')
        this.button = document.querySelector('main form button')

        //Button deshabilitado
        this.button.disabled = true

        this.inputs.forEach((input, index) => {
            if (input.type != 'checkbox') {
                input.addEventListener('input', () => {
                    this.validar(input.value, this.regExpValidar[index], index)
                    if (renderTablaAlta) renderTablaAlta(!this.algunCampoValido(), productoController.productos)
                })
            }
        })

        this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            const producto = this.leerProductoIngresado()
            this.limpiarFormulario()
            if(guardarProducto)guardarProducto(producto)
        })
    }

    //Para comprobar la validez de los campos
    algunCampoValido() {
        // en el caso de que todos sean true quiere decir que los campos son validos entonces retorna false para que el button pase a activo
        let valido = // ver la tabla de verdad
            camposValidos[0] &&
            camposValidos[1] &&
            camposValidos[2] &&
            camposValidos[3] &&
            camposValidos[4] &&
            camposValidos[5] &&
            camposValidos[6]
        return !valido
    }

    //Validar campos - recibia la ExpReg y el orden 
    validar(valor, validador, index) {
        if (!validador.test(valor)) {
            this.setCustomValidityJS('Este campo no es válido', index) //arrayMensajes[index] se puede crear en la matriz un array mas para customizar el mensaje por el campo
            this.camposValidos[index] = false // va a ser un array con la misma cantidad de elementos que tiene nuestro formulario
            this.button.disabled = true // hasta que la persona no agregue, no se puede presionar el button 
            return null // break
        }

        this.camposValidos[index] = true
        this.button.disabled = this.algunCampoValido() //boolean

        this.setCustomValidityJS('', index)// se va a ocultar
        return valor
    }
    //Mostrar u ocultar mensaje
    setCustomValidityJS(mensaje, index) {
        let divs = document.querySelectorAll('form div')
        divs[index].innerHTML = mensaje
        divs[index].style.display = mensaje ? 'block' : 'none'
    }

    //Producto ingresado en el formulario
    leerProductoIngresado() {
        //tenemos pronto para incorporar a nuestra array de productos
        return {
            nombre: this.inputs[0].value,
            precio: this.inputs[1].value,
            stock: this.inputs[2].value,
            marca: this.inputs[3].value,
            categoria: this.inputs[4].value,
            detalles: this.inputs[5].value,
            foto: this.inputs[6].value,
            envio: this.inputs[7].checked
        }
    }

    //Limpiamos los inputs del formulario
    limpiarFormulario() {
        //Borro todos los inputs
        this.inputs.forEach(input => {
            if (input.type != 'checkbox') input.value = ''
            else if (input.type == 'checkbox') input.checked = false
        })
        //Button deshabilitado
        this.button.disabled = true

        this.camposValidos = [false, false, false, false, false, false, false]
    }

}

//Render de plantilla
const renderTablaAlta = (validos, productos) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'plantillas/listado.hbs') //*TODO Revisar hbs
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            let plantillaHbs = xhr.response
            let template = Handlebars.compile(plantillaHbs)
            let html = template({ productos, validos })
            document.getElementById('listadoProductos').innerHTML = html
        }
    })
    xhr.send()
}

let formularioAlta = null

async function initAlta() {
    console.warn('initAlta');

    formularioAlta = new FormularioAlta(renderTablaAlta, productoController.guardarProducto)

    //Se estan cargando los productos que teniamos en el backend
    const productos = await productoController.obtenerProductos()
    renderTablaAlta(null, productos)

}

