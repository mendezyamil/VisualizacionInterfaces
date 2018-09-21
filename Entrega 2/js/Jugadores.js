class Jugador {
  constructor(cantidadFichas, numeroJugador, nombreJugador) {
    this.fichas = cantidadFichas;
    this.numero = numeroJugador;
    this.nombre = nombreJugador;
  }

  jugar(){
    if (this.fichas > 0){
      this.fichas -= 1;
      return true;
    }
    return false;
  }
}
