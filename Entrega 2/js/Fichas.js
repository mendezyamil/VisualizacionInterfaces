class Ficha {

  constructor(x, y, paramcolor) {
    this.posX = x;
    this.posY = y;
    this.color = paramcolor;
    this.radio = 30;
  }

  cambiarColor(color){
    this.color = color;
  }

  dibujarFicha(ctx, offset){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    let M = Math.floor((Math.sqrt(((offset)*(offset)) + ((offset)*(offset))))/2); //calcular a partir de donde dibujar el circulo
    ctx.arc(M + this.posX, M + this.posY, this.radio, 0, Math.PI *2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }

  // function isClicked(x,y){
  //   let hipotenusa = Math.floor(Math.sqrt(((x - circle.PosX) * (x - circle.PosX)) + ((y - circle.PosY) * (y - circle.PosY))));
  //   console.log (x,y);
  //   if ((hipotenusa) <= (circle.radio)){
  //     console.log ("No le erraste");
  //   } else {
  //     console.log("Le erraste");
  //   }
  // }
  //
  // var canvas = document.getElementById("canvas");
  // var ctx = canvas.getContext("2d");
  // canvas.addEventListener("mousedown", function(event){
  //     let x = event.layerX - event.currentTarget.offsetLeft;
  //     let y = event.layerY - event.currentTarget.offsetTop;
  //     isClicked(x,y);
  // });
}
