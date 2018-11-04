class Juego {
  constructor() {
    this.auto = new Auto();
    this.width = 600;
    this.height = 700;
    this.comenzado = false;
    this.cantidadPolicia = 0;
    this.score = 0;
  }

  comienzoJuego(){
    document.getElementById("game").innerHTML += '<div id="juego" class="background"></div>';
    document.getElementById("score").innerHTML = 0;
    this.comenzado = true;
    this.auto.crearAuto(this);
    this.crearPolicia();
  }

  crearPolicia(){
    let intervalo = setInterval(() => {
      if (!this.comenzado){
        clearInterval(intervalo);
      }

      let policia = new Policia(this.cantidadPolicia);
      this.cantidadPolicia++;
      let pos = parseInt(Math.random() * (650 - 150) + 150);
      let posX = pos + "px";

      policia.crearPolicia(posX, "700px");

      let police = policia.id;
      document.getElementById(police).addEventListener("animationend", function () {
        this.remove();
        juego.score+=100;
        document.getElementById("score").innerHTML = juego.score;
      });
    }, 1000);
  }

  movimiento(direccion, desplazamiento){
    if (this.comenzado) {
      let estilo = document.getElementById("auto").style;
      let posX = parseInt(estilo.left, 10);
      let posY = parseInt(estilo.bottom, 10);
      switch (direccion) {
        case "left":
          if (posX > 20){
            posX -= desplazamiento;
            estilo.left = posX + "px";
          }
        break;
        case "right":
          if (posX < this.width - this.auto.width - 20){
            posX += desplazamiento;
            estilo.left = posX + "px";
          }
        break;
          case "up":
          if (posY < this.width - this.auto.width + 30){
            posY += desplazamiento;
            estilo.bottom = posY + "px";
          }
        break;
        case "down":
          if (posY > 5){
            posY -= desplazamiento;
            estilo.bottom = posY + "px";
          }
        break;
      }
    }
  }

}
