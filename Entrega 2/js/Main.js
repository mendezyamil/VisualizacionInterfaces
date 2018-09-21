let tablero = new Tablero();
let jugador1 = new Jugador(21,1,"Yamil");
let jugador2 = new Jugador(21,2,"Facundo");

tablero.iniciarTablero();
//hacer descontar fichas
if (jugador1.jugar()){
  tablero.cargarFicha(0,tablero.buscarLibre(0), (jugador1.numero));
  console.log (jugador1.numero);
}

if (jugador1.jugar()){
  tablero.cargarFicha(0,tablero.buscarLibre(0), (jugador1.numero));
  console.log (jugador1.numero);
}
if (jugador1.jugar()){
  tablero.cargarFicha(0,tablero.buscarLibre(0), (jugador1.numero));
  console.log (jugador1.numero);
}
if (jugador1.jugar()){
  tablero.cargarFicha(0,tablero.buscarLibre(0), (jugador1.numero));
  console.log (jugador1.numero);
}

if (jugador2.jugar()){
  tablero.cargarFicha(1,tablero.buscarLibre(1), (jugador2.numero))
  console.log (jugador2.numero);
}

tablero.dibujarGrilla();
