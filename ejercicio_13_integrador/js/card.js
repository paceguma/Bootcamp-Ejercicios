function Card(heading, description, image) {
    this.heading = heading;
    this.description = description;
    this.image = image;

    this.appendTo = function (destinationElement) {
        let card = document.createElement('a')
        card.classList.add('card')
        card.href = 'https://sony.com'

        let that = this
        card.addEventListener('click', (e) => {
            e.preventDefault()

            let nuevoItemCarrito = document.createElement('div')
            nuevoItemCarrito.classList.add('carrito__item')
            nuevoItemCarrito.innerHTML = that.heading
            console.log(nuevoItemCarrito);

            elemSectionCarrito.append(nuevoItemCarrito)
        })

        card.innerHTML = `        
        <article class="card__article">
        <div class="card__image-container">
            <img class="card__image" src=${image} alt=${heading}/>
        </div>
        <div class="card__content">
            <h2 class="card__heading">${heading}</h2>
            <div class="card__description">
            <p>${description}</p>
            </div>
        </div>
        </article>
        `
        destinationElement.appendChild(card)
    }

}

const elemCardContainer = document.getElementsByClassName('cards-container')[0]

const card1 = new Card('Tv', 'Lorem ijja amtntn', 'img/productos/conjunto.JPG')
const card2 = new Card('Celular', 'Lorem ijja amtntn', 'img/productos/Artesania (18).png')
const card3 = new Card('Heladera', 'Lorem ijja amtntn', 'img/productos/Artesania (16).png')
const card4 = new Card('Tablet', 'Lorem ijja amtntn', 'img/productos/Artesania (14).png')
const card5 = new Card('Camara', 'Lorem ijja amtntn', 'img/productos/Artesania (10).png')

const cards = [
    card1,
    card2,
    card3,
    card4,
    card5
]

console.log(cards);


// card1.appendTo(elemCardContainer) 
// card2.appendTo(elemCardContainer) 
// card3.appendTo(elemCardContainer) 
// card4.appendTo(elemCardContainer) 
// card5.appendTo(elemCardContainer) 

console.log(cards[0].heading);
console.log(cards[0].image);

// cards[0].appendTo(elemCardContainer)
// cards[1].appendTo(elemCardContainer)
// cards[2].appendTo(elemCardContainer)

for(const unaCard of cards){
    unaCard.appendTo(elemCardContainer)
}