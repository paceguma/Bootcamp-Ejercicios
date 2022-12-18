class FormularioAlta {
    inputs = null
    form = null
    button = null
    camposValidos = [false, false, false, false, false, false]

    //Todas las expresiones regulares de los campos
    regExpValidar = [
        /^.+$/,         //nombre
        /^.+$/,         //precio
        /^[0-9]+$/,     //stock
        /^.+$/,         //marca
        /^.+$/,         //categoria
        /^.+$/,         //detalles
    ]


    /* --------------------------- drag and drop --------------------------- */
    imagenSubida = ''
    dropArea = null
    progressBar = null
    /* --------------------------- drag and drop --------------------------- */

    constructor(renderTablaAlta, guardarProducto) {
        //Llamo a las propiedades
        this.inputs = document.querySelectorAll('.container-alta form .data-validation')
        // console.log(this.inputs);
        this.form = document.querySelector('.container-alta form')
        this.button = document.querySelector('#btnAgregarAlCarrito')
        // console.log(this.button);

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
            if (guardarProducto) guardarProducto(producto)
        })



        /* --------------------------- drag and drop --------------------------- */
        this.dropArea = document.getElementById('drop-area')
        this.progressBar = document.getElementById('progress-bar')

            // Para cancelar el evento automático del drag and drop
            ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                this.dropArea.addEventListener(eventName, e => e.preventDefault())
                document.body.addEventListener(eventName, e => e.preventDefault())
            })

            // Para remarcar la zona de drop al arrastrar una imagen dentro de ella
            ;['dragenter', 'dragover'].forEach(eventName => {
                this.dropArea.addEventListener(eventName, () => {
                    this.dropArea.classList.add('highlight')
                })
            })

            ;['dragleave', 'drop'].forEach(eventName => {
                this.dropArea.addEventListener(eventName, () => {
                    this.dropArea.classList.remove('highlight')
                })
            })

        this.dropArea.addEventListener('drop', e => {
            console.log(e)
            const dataTransf = e.dataTransfer
            const files = dataTransf.files

            this.handleFiles(files)
        })


        const inputFoto = document.querySelector('#foto')

        inputFoto.addEventListener('change', () => {
            console.log('Cambió el input')

            const files = inputFoto.files

            this.handleFiles(files)
        })

    }

    //Para comprobar la validez de los campos
    algunCampoValido() {
        // en el caso de que todos sean true quiere decir que los campos son validos entonces retorna false para que el button pase a activo
        let valido = // ver la tabla de verdad
            this.camposValidos[0] &&
            this.camposValidos[1] &&
            this.camposValidos[2] &&
            this.camposValidos[3] &&
            this.camposValidos[4] &&
            this.camposValidos[5]
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
        let divs = document.querySelectorAll('.container-alta-form__container .mensaje-validacion')
        // console.log(divs)
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
            foto: this.imagenSubida ? `/uploads/${this.imagenSubida}`: '/uploads/sinimagen.jpg',
            envio: this.inputs[6].checked
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

        this.camposValidos = [false, false, false, false, false, false]

        const img = document.querySelector('#gallery img')
        img.src = ''

        this.initializeProgress()
        this.imagenSubida = ''
    }


    /* -------------- drag and drop ------------------ */
    initializeProgress() {
        this.progressBar.value = 0
    }

    updateProgress(porcentaje) {
        this.progressBar.value = porcentaje
    }

    previewFile(file) {
        const reader = new FileReader() 
        reader.readAsDataURL(file)
        reader.onloadend = function () {
            const img = document.querySelector('#gallery img')
            img.src = reader.result
        }
    }

    handleFiles = files => {
        const file = files[0]
        this.initializeProgress()
        this.uploadFile(file)
        this.previewFile(file)
    }

    uploadFile = file => {
        const url = '/api/upload'

        const xhr = new XMLHttpRequest()
        const formData = new FormData()

        xhr.open('POST', url)

        xhr.upload.addEventListener('progress', e => {
            let porcentaje = (((e.loaded * 100.0) / e.total) || 100)
            this.updateProgress(porcentaje)
        })

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const objImagen = JSON.parse(xhr.response)
                this.imagenSubida = objImagen.nombre
            }
        })

        formData.append('foto', file)
        xhr.send(formData)

    }

}

//Render de plantilla
const renderTablaAlta = (validos, productos) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'plantillas/alta.hbs')
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            let plantillaHbs = xhr.response
            let template = Handlebars.compile(plantillaHbs)
            let html = template({ productos, validos })
            document.getElementById('listadoProductos').innerHTML = html
            // console.log(html);
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

