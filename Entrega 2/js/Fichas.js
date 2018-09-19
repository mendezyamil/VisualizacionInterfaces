class Ficha {

  constructor(x, y, paramcolor) {
    this.posX = x;
    this.posY = y;
    this.color = paramcolor;
  }

  cambiarColor(color){
    this.color = color;
  }

  dibujarFicha(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    let M = Math.floor ((Math.sqrt(((70)*(70)) + ((70)*(70))))/2); //calcular a partir de donde dibujar el circulo
    ctx.arc(M + this.PosX, M + this.PosY, 40, 0, Math.PI *2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}
