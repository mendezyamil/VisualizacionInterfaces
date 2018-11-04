class Policia {
  constructor(count) {
    this.div = '<div id="policia' + count + '" class="policia animacionPolicia"></div>';
    this.width = 100;
    this.height = 94;
    this.id = "policia" + count;
  }

  crearPolicia(x, y){
    $("#game").append(this.div);
    this.cargarPosicion(x, y);
  }

  cargarPosicion(x, y){
    let estilo = document.getElementById(this.id).style;
    estilo.left = x;
    estilo.bottom = y;
  }

}
