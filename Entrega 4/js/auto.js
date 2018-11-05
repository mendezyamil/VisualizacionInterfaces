class Auto {
  constructor() {
    this.div = '<div id="auto" class="auto"></div>';
    this.width = 47;
    this.height = 100;
  }

  crearAuto(game){
    document.getElementById("game").innerHTML += this.div;
    this.cargarPosicion("270px","20px");
  }

  cargarPosicion(x, y){
    let estilo = document.getElementById("auto").style;
    estilo.left = x;
    estilo.bottom = y;
  }

}
