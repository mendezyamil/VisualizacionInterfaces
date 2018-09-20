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
    let M = Math.floor((Math.sqrt(((53)*(53)) + ((53)*(53))))/2); //calcular a partir de donde dibujar el circulo
    ctx.arc(M + this.posX, M + this.posY, 30, 0, Math.PI *2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}
