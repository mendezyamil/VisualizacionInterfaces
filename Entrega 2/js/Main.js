let tablero = new Tablero();
let jugador1;
let jugador2;
let ganadorHorizontal = false;
let ganadorVertical = false;
let turnoJugador1;
let turnoJugador2;
let comienzajuego = false;

tablero.iniciarTablero();
tablero.dibujarGrilla();
//tablero.cargarFichasJugador();

//bloquear 42 fichas hasta que se carguen los dos jugadores y le toque el turno al jug1
let btn1 = document.getElementById('confirm1');
btn1.addEventListener('click', function(e){
  let nombre1 = document.getElementById('input1').value;
  jugador1 = new Jugador(21, 1, nombre1);
  turnoJugador1 = false;
});

let btn2 = document.getElementById('confirm2');
btn2.addEventListener('click', function(e){
  let nombre2 = document.getElementById('input2').value;
  jugador2 = new Jugador(21, 2, nombre2);
  turnoJugador2 = false;
});

function ganadorJuego(jugador){
  console.log("Gano: " + jugador.nombre);
}
//hacer descontar fichas
if (!turnoJugador1 && !turnoJugador2){
  comienzaJuego = true;
  turnoJugador1 = true;
  if (jugador1){
    //habilitar fichas jug1
    if (jugador1.jugar() && !ganadorHorizontal && !ganadorVertical){
      tablero.cargarFicha(0,tablero.buscarLibre(0), (jugador1.numero));
      ganadorHorizontal = tablero.verificarHorizontal(jugador1.numero);
      ganadorVertical = tablero.verificarVertical(jugador1.numero);
      if ((ganadorVertical) || (ganadorHorizontal)){
        ganadorJuego(jugador1);
      }
      turnoJugador1 = false;
      turnoJugador2 = true;
    }
  }
  if (jugador2){
    //doblear fichas jug1
    //habilitar fichas jug2
    if (jugador2.jugar() && !ganadorHorizontal && !ganadorVertical){
      tablero.cargarFicha(0,tablero.buscarLibre(0), (jugador2.numero));
      ganadorHorizontal = tablero.verificarHorizontal(jugador2.numero);
      ganadorVertical = tablero.verificarVertical(jugador2.numero);
      if ((ganadorVertical) || (ganadorHorizontal)){
        ganadorJuego(jugador2);
      }
      turnoJugador2 = false;
    }
  }

}


// if (jugador2.jugar()){
//   tablero.cargarFicha(0,tablero.buscarLibre(0), (jugador2.numero));
//   ganadorHorizontal = tablero.verificarHorizontal(jugador2.numero);
//   ganadorVertical = tablero.verificarVertical(jugador2.numero);
//   if ((ganadorVertical) || (ganadorHorizontal)){
//     ganadorJuego(jugador2);
//   }
// }
