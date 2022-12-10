console.log('Vista alta')

const productos = []
const camposValidos = [false, false, false, false, false, false, false]

const inputs = document.querySelectorAll('input')
// console.log(inputs);

const form = document.querySelector('form')
// console.log(form);

const button = document.querySelector('button')
// console.log(button);
button.disabled = true


//Mostrar u ocultar mensaje
const setCustomValidityJS = (mensaje, index) => {
    let divs = document.querySelectorAll('form div')
    divs[index].innerHTML = mensaje
    divs[index].style.display = mensaje ? 'block' : 'none'
}

//Para comprobar la validez de los campos
const algunCampoValido = () => {
    // en el caso de que todos sean true quiere decir que los campos son validos entonces retorna false para que el button pase a activo
    let valido = // ver la tabla de verdad
        camposValidos[0] && // false
        camposValidos[1] && // false
        camposValidos[2] && // false
        camposValidos[3] && // false
        camposValidos[4] && // false
        camposValidos[5] && // false
        camposValidos[6]  // false

    return !valido // false
}


//Validar campos
const validar = (valor, validador, index) => {
    if (!validador.test(valor)){
        setCustomValidityJS('Este campo no es válido', index) //arrayMensajes[index] se puede crear en la matriz un array mas para customizar el mensaje por el campo
        camposValidos[index] = false // va a ser un array con la misma cantidad de elementos que tiene nuestro formulario
        button.disabled = true // hasta que la persona no agregue, no se puede presionar el button 
        return null
    }

    camposValidos[index] = true
    button.disabled = algunCampoValido() //boolean

    setCustomValidityJS('', index)// se va a ocultar
    return valor
}

//Todas las expresiones regulares de los campos
const regExpValidar = [
    /^.+$/,         //nombre
    /^.+$/,         //precio
    /^[0-9]+$/,     //stock
    /^.+$/,         //marca
    /^.+$/,         //categoria
    /^.+$/,         //detalles
    /^.+$/         //foto
]

inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        validar(input.value, regExpValidar[index], index) // por cada elemento interactua y sabe cuantos elementos hay - vinculo el input.value de nombre con la regExp de nombre. 
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const producto = {
        nombre: inputs[0].value,
        precio: inputs[1].value,
        stock: inputs[2].value,
        marca: inputs[3].value,
        categoria: inputs[4].value,
        detalles: inputs[5].value,
        foto: inputs[6].value,
        envio: inputs[7].checked
    }
    //tenemos pronto para incorporar a nuestra array de productos

    //borrar todos los inputs para que el usuario no tenga que borrar 
    inputs.forEach(input => input.value = '')
    console.log(producto);

    // agregar productos
    productos.push(producto)

    //desactivar button
    button.disabled = true

    renderProdsObjetos()
})


//Render de cada producto
const renderProdsObjetos = () => {
    let html = ''
    for (let i = 0; i < productos.length; i++) {
        html += `<p>${JSON.stringify(productos[i])}</p>`
        
    }

    document.getElementById('listadoProductos').innerHTML = html

}


//Render de las filas de la tabla
const renderProdsTemplateString = () => {

}

