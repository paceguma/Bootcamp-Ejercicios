let nombre = prompt("¿cómo es tu nombre?");
console.log("tu nombre es: " + nombre);

let edad = parseInt(prompt("¿cúantos años tenés?"));
if (edad !== isNaN){
    alert("ingrese una edad válida")
} if (edad >= 18){
    alert("bienvenido " + nombre)
} else {
    alert("usted no puede ingresar, usted tiene " + edad + " años.")
}
