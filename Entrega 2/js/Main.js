let tablero = new Tablero();
let jugador1 = new Jugador(21,1,"Yamil");
let jugador2 = new Jugador(21,2,"Facundo");
let ganadorHorizontal = false;
let ganadorVertical = false;

tablero.iniciarTablero();

function ganadorJuego(jugador){
  console.log("Gano: " + jugador.nombre);
}
//hacer descontar fichas
if (jugador2.jugar()){
  tablero.cargarFicha(0,tablero.buscarLibre(0), (jugador2.numero));
  ganadorHorizontal = tablero.verificarHorizontal(jugador2.numero);
  ganadorVertical = tablero.verificarVertical(jugador2.numero);
  if ((ganadorVertical) || (ganadorHorizontal)){
    ganadorJuego(jugador1);
  }
}

if (jugador2.jugar()){
  tablero.cargarFicha(0,tablero.buscarLibre(0), (jugador2.numero));
  ganadorHorizontal = tablero.verificarHorizontal(jugador2.numero);
  ganadorVertical = tablero.verificarVertical(jugador2.numero);
  if ((ganadorVertical) || (ganadorHorizontal)){
    ganadorJuego(jugador2);
  }
}

if (jugador2.jugar()){
  tablero.cargarFicha(0,tablero.buscarLibre(0), (jugador2.numero));
  ganadorHorizontal = tablero.verificarHorizontal(jugador2.numero);
  ganadorVertical = tablero.verificarVertical(jugador2.numero);
  if ((ganadorVertical) || (ganadorHorizontal)){
    ganadorJuego(jugador2);
  }
}

if (jugador2.jugar()){
  tablero.cargarFicha(0,tablero.buscarLibre(0), (jugador2.numero));
  ganadorHorizontal = tablero.verificarHorizontal(jugador2.numero);
  ganadorVertical = tablero.verificarVertical(jugador2.numero);
  if ((ganadorVertical) || (ganadorHorizontal)){
    ganadorJuego(jugador2);
  }
}

tablero.dibujarGrilla();
