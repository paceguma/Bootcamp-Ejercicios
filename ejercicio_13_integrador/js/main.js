var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0] //*TODO: Revisar

class Main {
    //De forma async va a cargar todas las plantillas dinamicamente
    //Funcion helper:    //AJAX 

    ajax(url, metodo = 'get') {
        const xhr = new XMLHttpRequest()
        xhr.open(metodo, url)
        xhr.send()
        return xhr
    }

    getNombreArchivo(id) { // id => alta
        return 'vistas/' + id + '.html'
    }

    marcarLink(id) {
        const links = document.querySelectorAll('header nav a')
        links.forEach(link => {
            if (link.id === id) link.classList.add('active')
            else link.classList.remove('active')
        })
    }

    initJS(id) {
        if (id === 'alta') {
            initAlta()
        } else if (id === 'inicio') {
            initInicio()
        } else if (id === 'nosotros') {
            initNosotros()
        } else if (id === 'contacto') {
            initContacto()
        }
    }


    
}


function start() {





    function cargarPlantilla(id) {
        let archivo = getNombreArchivo(id)
        let xhr = ajax(archivo)
        // console.log('llegue');
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                let plantilla = xhr.response

                //Carga del codigo de la vista (HTML) de la plantilla

                let main = document.querySelector('main')
                main.innerHTML = plantilla

                //Carga del codigo script JS de la plantilla
                initJS(id)
            }
        })
    }

    const cargarPlantillas = () => {
        // Carga inicial de la vista determinada por la url visitada
        let id = location.hash.slice(1) || 'inicio' // hash: cortas el numeral #inicio => slice(1) => inicio // si no hay nada por default carga la de inicio - slice descarta el primer elemento
        marcarLink(id)
        cargarPlantilla(id)

        //Carga de cada uno de los contenidos segun la navegacion local
        const links = document.querySelectorAll('header nav a') // vamos a seleccionar los 'a' de los headers
        // console.log(links);
        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault()

                let id = link.id
                // console.log(id);
                location.hash = id
            })
        })
        window.addEventListener('hashchange', () => {
            //Detecta cuando el hash cambia, cambia su url
            // console.log('cambia su url');

            let id = location.hash.slice(1) || 'inicio'
            marcarLink(id)
            cargarPlantilla(id)
        })
    }
    cargarPlantillas()
}

start()