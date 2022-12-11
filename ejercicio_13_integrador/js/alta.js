function initAlta() {
    console.warn('initAlta');

    const productos = [
        { nombre: 'reloj', precio: '12234', stock: '35', marca: 'Seico', categoria: 'Despertador', envio: true, foto: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80', detalles: 'Analogico' },
        { nombre: 'cartera', precio: '46545 ', stock: '3', marca: 'Gudc', categoria: 'Moda', envio: true, foto: 'https://plus.unsplash.com/premium_photo-1664381364966-150fecf38cf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', detalles: 'Tela' },
        { nombre: 'Enchufe', precio: '12', stock: '350', marca: 'Chin', categoria: 'Tech', envio: true, foto: 'https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', detalles: 'Plastico' }
    ]
    const camposValidos = [false, false, false, false, false, false, false]
    const inputs = document.querySelectorAll('input')
    const form = document.querySelector('form')
    const button = document.querySelector('button')

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
        if (!validador.test(valor)) {
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

        // agregar productos
        productos.push(producto)

        //desactivar button
        button.disabled = true

        // renderProdsObjetos()
        // renderProdsTemplateString()
        renderProds()
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
        let html = ''
        html += `<table>`

        html += `
    <tr>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Marca</th>
        <th>Categoría</th>
        <th>Detalles</th>
        <th>Foto</th>
        <th>Envío</th>
    </tr>
    `
        for (let i = 0; i < productos.length; i++) {
            let producto = productos[i]

            html += `
        <tr>
            <th>${producto.nombre}</th>
            <th>${producto.precio}</th>
            <th>${producto.stock}</th>
            <th>${producto.marca}</th>
            <th>${producto.categoria}</th>
            <th>${producto.detalles}</th>
            <th>${producto.foto}</th>
            <th>${producto.envio}</th>
        </tr>
        `
        }
        html += '</table>'

        document.getElementById('listadoProductos').innerHTML = html
    }

    const renderProds = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('get', 'plantillas/listado.hbs')
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                let plantillaHbs = xhr.response
                // console.log(plantillaHbs)

                let template = Handlebars.compile(plantillaHbs)
                // console.log(template);

                let html = template({ productos: productos })

                document.getElementById('listadoProductos').innerHTML = html
            }
        })
        xhr.send()
    }

    renderProds()
}

