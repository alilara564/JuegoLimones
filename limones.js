let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTURASUELO = 50;
const ALTURA_PERSONAJE = 60;
const ANCHO_PERSONAJE = 40;
const ALTURA_LIMON = 30;
const ANCHO_LIMON = 30;

let velocity = 10;

let personajeX = canvas.width / 2;
let personajeY = canvas.height - (ALTURASUELO + ALTURA_PERSONAJE);

let limonX = 400;
let limonY = 0;

let puntaje = 0;
let vidas = 3;

let tiempoEnMilisegundos = 150;
let myInterval;


function iniciar() {
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
    aparecerLimon();
    iniciarJuego();
}

function iniciarJuego() {
    myInterval = setInterval(bajarLimon, tiempoEnMilisegundos);
    puntaje = 0;
    vidas = 3;
    mostrarEnSpan("txtPuntaje", puntaje);
    mostrarEnSpan("txtVidas", vidas);
}

function dibujarSuelo() {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, canvas.height - ALTURASUELO, canvas.width, ALTURASUELO);
}

function dibujarPersonaje() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(personajeX, canvas.height - (ALTURASUELO + ALTURA_PERSONAJE), ANCHO_PERSONAJE, ALTURA_PERSONAJE);
}

function dibujarLimon(){
    ctx.fillStyle = "green";
    ctx.fillRect(limonX, limonY, ANCHO_LIMON, ALTURA_LIMON);
}

function bajarLimon() {
    limonY += velocity;
    actualizarPantalla();
    detectarColision();
    detectarPiso();
}

function actualizarPantalla() {
    limpiarCanvas();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function detectarColision() {
    if (limonX + ANCHO_LIMON > personajeX &&
        limonX < personajeX + ANCHO_PERSONAJE &&
        limonY + ALTURA_LIMON > personajeY &&
        limonY < personajeY + ALTURA_PERSONAJE){
        
        aparecerLimon();
        puntaje += 1;
        mostrarEnSpan("txtPuntaje", puntaje);
    }
}

function moverIzquierda(){
    personajeX -= velocity;
    actualizarPantalla();
}

function moverDerecha(){
    personajeX += velocity;
    actualizarPantalla();
}

function aparecerLimon() {
    limonX = generarAleatorio(0, canvas.width - ANCHO_LIMON);
    limonY = 0;
    actualizarPantalla();
}

function detectarPiso() {
    if (limonY + ALTURA_LIMON >= canvas.height - ALTURASUELO) {
        vidas -= 1;
        mostrarEnSpan("txtVidas", vidas);
        aparecerLimon();
    }
    if (vidas <= 0) {
        clearInterval(myInterval);
        alert("¡Juego terminado! Tu puntaje final es: " + puntaje);
    }
}

function reiniciar(){
    clearInterval(myInterval);
    iniciar();
}
