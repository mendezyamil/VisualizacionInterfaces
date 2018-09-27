let jugador1 = new Jugador(1, "");
let jugador2 = new Jugador(2, "");
let juego = new Juego(jugador1,jugador2);
let c = document.getElementById('canvas');
let ctx = c.getContext('2d');
juego.prepararJuego();

let btn1 = document.getElementById('confirm1');
btn1.addEventListener('click', function(e){
    let nombre1 = document.getElementById('input1').value;
    jugador1.nombre = nombre1;
});

let btn2 = document.getElementById('confirm2');
btn2.addEventListener('click', function(e){
    let nombre2 = document.getElementById('input2').value;
    jugador2.nombre = nombre2;
});

c.addEventListener("mousedown",function(event){
    let x = event.layerX - event.currentTarget.offsetLeft;
    let y = event.layerY - event.currentTarget.offsetTop;
    juego.jugar(x,y);
});

canvas.addEventListener('mousemove',function(event){
    let x = event.layerX - event.currentTarget.offsetLeft;
    let y = event.layerY - event.currentTarget.offsetTop;
    if(juego.turnoJugador.ficha != false){
        juego.turnoJugador.ficha.mueveMouse(x,y,juego);
    }
});

canvas.addEventListener('mouseup', function(event){
    let x = event.layerX - event.currentTarget.offsetLeft;
    let y = event.layerY - event.currentTarget.offsetTop;
    if(juego.turnoJugador.ficha != false){
        juego.jugarFicha(x,y);
    }
});
