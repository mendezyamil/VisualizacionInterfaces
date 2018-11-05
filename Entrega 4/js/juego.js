class Juego {
  constructor() {
    this.auto = new Auto();
    this.width = 600;
    this.height = 700;
    this.comenzado = false;
    this.cantidadPolicia = 0;
    this.score = 0;
    this.intervalos = [];
    this.highScore = 0;
    this.niebla = '<div id="niebla" class="niebla"></div>'
  }

  comienzoJuego(){
    let boton = document.getElementById('restart');
    boton.disabled = true;
    document.getElementById("game").innerHTML += '<div id="juego" class="background">' + this.niebla + '</div>';
    document.getElementById("score").innerHTML = 0;
    this.comenzado = true;
    this.auto.crearAuto(this);
    this.crearPolicia();
  }

  explotar(){
    document.getElementById("auto").classList.add("explotar");
  }

  gameOver(){
    juego.explotar();
    this.comenzado = false;
    let boton = document.getElementById('restart');
    boton.disabled = false;
    if (this.score > this.highScore){
      this.highScore = this.score;
      document.getElementById("highScore").innerHTML = juego.highScore;
    }
    setTimeout(() => {
      document.getElementById("auto").remove();
      document.getElementById("niebla").remove();

      for(let i = 0; i< this.intervalos.length; i++){
          clearInterval(this.intervalos[i]);
      }

      $(".policia").remove();
      document.getElementById("juego").classList.remove("background");

      let loser = "<h1 id='loser' class='loser'>Perdiste</h1>";
      $("#juego").append(loser);

      this.cantidadPolicia = 0;
      this.intervalos = [];
      this.score = 0;
      document.getElementById("score").innerHTML = juego.score;
    }, 1000);
  }

  verificarColision(police){
    if(this.comenzado){
      let datosAuto = document.getElementById("auto").getBoundingClientRect();
      let posAuto = {
           top: datosAuto.top,
           bottom: datosAuto.bottom,
           left: datosAuto.left,
           right: datosAuto.right
      }

      let datosPolicia = document.getElementById(police).getBoundingClientRect();
      let posPolicia = {
        top: datosPolicia.top,
        bottom: datosPolicia.bottom,
        left: datosPolicia.left,
        right: datosPolicia.right
      }

      if ((posPolicia.left < posAuto.left && posAuto.left < posPolicia.right) || (posPolicia.left < posAuto.right && posAuto.right < posPolicia.right)){
        if((posPolicia.top < posAuto.top && posAuto.top < posPolicia.bottom) || (posPolicia.top < posAuto.bottom && posAuto.bottom < posPolicia.bottom)){
          this.gameOver();
        }
      }
    }
  }

  crearPolicia(){
    let juego = this;
    let intervalo = setInterval(() => {
      let policia = new Policia(this.cantidadPolicia);
      this.cantidadPolicia++;
      let pos = parseInt(Math.random() * (650 - 150) + 150);
      let posX = pos + "px";

      policia.crearPolicia(posX, "700px");

      let police = policia.id;

      document.getElementById(police).addEventListener("animationstart", function () {
        let intervalo2 = setInterval(() => {
          if (!juego.comenzado) {
              this.remove();
          } else {
              juego.verificarColision(police);
          }

        }, 20);
        juego.intervalos.unshift(intervalo2);
      });

      document.getElementById(police).addEventListener("animationend", function () {
        this.remove();
        clearInterval(juego.intervalos.pop());
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
