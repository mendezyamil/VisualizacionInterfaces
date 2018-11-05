class Juego {
  constructor() {
    this.auto = new Auto();
    this.width = 600;
    this.height = 700;
    this.comenzado = false;
    this.cantidadPolicia = 0;
    this.score = 0;
    this.intervalos = [];
  }

  comienzoJuego(){
    document.getElementById("game").innerHTML += '<div id="juego" class="background"></div>';
    document.getElementById("score").innerHTML = 0;
    this.comenzado = true;
    this.auto.crearAuto(this);
    this.crearPolicia();
  }

  explotar(){
    document.getElementById("auto").classList.add("explotar");
  }

  gameOver(){
    explotar();
    this.comenzado = false;
    setTimeout(() => {
      document.getElementById("auto").remove();

      for(let i = 0; i< this.intervalos.length; i++){
          clearInterval(this.intervalos[i]);
      }

      $(".policia").remove();
      document.getElementById("juego").classList.remove("background");

      let derrota = "<h1 id='gameOver' class='gameOver'>Perdiste</h1>";
      $("#juego").append(derrota);

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
    //   let caso1 = posPolicia.left < posAuto.left && posAuto.left < posPolicia.right;
    //   let caso2 = posPolicia.left < posAuto.right && posAuto.right < posPolicia.right;
    //   let caso3 = posPolicia.top < posAuto.top && posAuto.top < posPolicia.bottom;
    //   let caso4 = posPolicia.top < posAuto.bottom && posAuto.bottom < posPolicia.bottom;
    //
    //   if ((caso1 || caso2) && (caso3 || caso4)) {
    //     console.log("entro2");
    //     this.gameOver();
    //   }
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
