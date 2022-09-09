const destino = document.getElementById("destino");
const textareaInput = document.querySelector("#origen");
const btnReemplazar = document.querySelector("#btn-reemplazar");
const btnAgregar = document.getElementsByClassName("btn-agregar");
const btnVaciar = document.getElementsByClassName("btn-vaciar");
const btnMayus = document.getElementsByClassName("btn-convertir-a-mayusculas");
const btnMinus = document.getElementsByTagName("button")[0];

// Punto 2
window.addEventListener("DOMContentLoaded", () => {
  console.log("Contenido del DOM cargado");
});

// Punto 3
textareaInput.value =
  "<p>Este contenido <strong>está listo</strong><br>para ser editado y pasarlo abajo.</p>";

// Punto 4
textareaInput.addEventListener("input", () => {
  const input = document.getElementsByTagName("input");
  const button = document.getElementsByTagName("button");

  for (let index = 0; index < input.length; index++) {
    const element = input[index];
    element.disabled = false;
  }
  button[0].disabled = false;
});

// Punto 5

btnReemplazar.addEventListener("click", () => {
  destino.innerText = textareaInput.value;
});

btnAgregar[0].addEventListener("click", () => {
  destino.innerText = textareaInput.value + destino.innerText;
});

btnAgregar[1].addEventListener("click", () => {
  destino.innerText = textareaInput.value.repeat(5);
});

btnAgregar[2].addEventListener("click", () => {
  destino.innerText = textareaInput.value.repeat(10);
});

btnAgregar[3].addEventListener("click", () => {
  let pregunta = parseInt(prompt("cuantas veces queres repetirlo?"));

  while (isNaN(pregunta)) {
    pregunta = parseInt(prompt("cuantas veces queres repetirlo?"));
  }
  destino.innerText = textareaInput.value.repeat(pregunta);
});

// Punto 6
btnVaciar[0].addEventListener("click", () => {
    destino.innerText = ''
});

btnMayus[0].addEventListener("click", () => {
   destino.innerText = textareaInput.value.toUpperCase();
});

btnMinus.addEventListener("click", () => {
   destino.innerText = textareaInput.value.toLowerCase();
});

// Punto 7
const textoOk = document.querySelectorAll('li');
textoOk.forEach(li => {
    li.textContent = '[Ok]'+ li.textContent;   
});