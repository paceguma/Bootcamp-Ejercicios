// var elemSectionCarrito = document.getElementsByClassName("section-carrito")[0] //*TODO: Revisar

class Main {
  //De forma async va a cargar todas las plantillas dinamicamente
  //Funcion helper:    //AJAX

  async ajax(url, metodo = "get") {
    try {
      const respuesta = await fetch(url, { method: metodo })
      const resultado = await respuesta.text()
      return resultado
    } catch (error) {
      console.error("ERROR", error)
    }
  }

  getNombreArchivo(id) {
    // id => alta
    return "vistas/" + id + ".html"
  }

  marcarLink(id) {
    const links = document.querySelectorAll("header nav a")
    links.forEach((link) => {
      if (link.id === id) link.classList.add("active")
      else link.classList.remove("active")
    })
  }

  initJS(id) {
    if (id === "alta") {
      initAlta()
    } else if (id === "inicio") {
      initInicio()
    } else if (id === "nosotros") {
      initNosotros()
    } else if (id === "contacto") {
      initContacto()
    }
  }

  async cargarPlantilla(id) {
    let archivo = this.getNombreArchivo(id)
    let plantilla = await this.ajax(archivo)
    let main = document.querySelector("main")
    main.innerHTML = plantilla
    this.initJS(id)
  }

  async cargarPlantillas() {
    // Carga inicial de la vista determinada por la url visitada
    let id = location.hash.slice(1) || "inicio" // hash: cortas el numeral #inicio => slice(1) => inicio // si no hay nada por default carga la de inicio - slice descarta el primer elemento
    this.marcarLink(id)
    await this.cargarPlantilla(id)

    //Carga de cada uno de los contenidos segun la navegacion local
    const links = document.querySelectorAll("header nav a") // vamos a seleccionar los 'a' de los headers
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        let id = link.id
        location.hash = id
      })
    })

    window.addEventListener("hashchange", async () => {
      //Detecta cuando el hash cambia, cambia su url
      let id = location.hash.slice(1) || "inicio"
      this.marcarLink(id)
      await this.cargarPlantilla(id)
    })
  }

  async start() {
    await this.cargarPlantillas()
  }
}

const main = new Main()
main.start()
