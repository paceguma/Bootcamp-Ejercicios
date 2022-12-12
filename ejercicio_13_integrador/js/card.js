function initInicio() {

  function Card(heading, description, image) {
    this.heading = heading
    this.description = description
    this.image = image

    this.appendTo = function (destinationElement) {
      let card = document.createElement("a")
      card.classList.add("card")
      card.href = "https://sony.com"

      let that = this
      card.addEventListener("click", (e) => {
        e.preventDefault()

        let nuevoItemCarrito = document.createElement("div")
        nuevoItemCarrito.classList.add("carrito__item")
        nuevoItemCarrito.innerHTML = that.heading


        elemSectionCarrito.append(nuevoItemCarrito)
      })

      card.innerHTML = `        
       
        `
      destinationElement.appendChild(card)
    }
  }

  const elemCardContainer =
    document.getElementsByClassName("cards-container")[0]

  const card1 = new Card(
    "Tv",
    "Lorem ijja amtntn",
    "img/productos/conjunto.JPG"
  )
  const card2 = new Card(
    "Celular",
    "Lorem ijja amtntn",
    "img/productos/Artesania (18).png"
  )
  const card3 = new Card(
    "Heladera",
    "Lorem ijja amtntn",
    "img/productos/Artesania (16).png"
  )
  const card4 = new Card(
    "Tablet",
    "Lorem ijja amtntn",
    "img/productos/Artesania (14).png"
  )
  const card5 = new Card(
    "Camara",
    "Lorem ijja amtntn",
    "img/productos/Artesania (10).png"
  )

  const cards = [card1, card2, card3, card4, card5]



  for (const unaCard of cards) {
    unaCard.appendTo(elemCardContainer)
  }
}
