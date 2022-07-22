let nombre
nombre = prompt("Ingrese su nombre")

let sexo
sexo = prompt("Ingrese su sexo: Hombre ~ Mujer ~ No binario")

if (sexo == "hombre" || sexo == "Hombre") {
    console.log("Hola, Bienvenida! " + nombre)
    alert("Hola, Bienvenido! " + nombre)
} 

else if (sexo == "mujer" || sexo == "Mujer") {
    console.log("Hola, Bienvenida " + nombre)
    alert("Hola, Bienvenida " + nombre)
}

else {
    console.log("Hola, Bienvenid@ " + nombre)
    alert("Hola, Bienvenid@ " + nombre)
}