class Tablero {
  constructor() {
    this.columnas = 7;
    this.filas = 6;
    this.Matriz = new Array(this.columnas);
    for (let i = 0; i < this.Matriz.length; i++) {
      this.Matriz[i] = new Array(this.filas);
    }
  }

  iniciarTablero(){
    for (let i = 0; i < this.Matriz.length; i++) {
      for (let y = 0; y < this.Matriz[i].length; y++) {
        this.Matriz[i][y] = 0; //inicializo la matriz en 0
      }
    }
  }

  setColum (col, valor){
      for (let i = 0; i < this.Matriz[col].length; i++) {
      //pinto una columna
      this.Matriz[col][i] = valor;
    }
  }
  setFila (fil, valor) {
    for (let i = 0; i < this.Matriz.length; i++) {
      //pinto una fila
      this.Matriz[i][fil] = valor;
    }
  }

  cargarTablero(x, y, ctx){
    let ficha = new Ficha(x, y, "#000000");
    if (this.Matriz[x/100][y/100] == 1){
      ficha.cambiarColor("#FF0000");
      ficha.dibujarFicha(ctx);
    }
    else if(this.Matriz[x/100][y/100] == 2){
      ficha.cambiarColor("#FFFF00");
      ficha.dibujarFicha(ctx);
    }
    else {
      ficha.cambiarColor("#FFFFFF");
      ficha.dibujarFicha(ctx);
    }
  }

  dibujarGrilla(width, height){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.canvas.width  = width;
    ctx.canvas.height = height;
    for (let x = 0; x < width; x += 100) {
        for (let y = 0; y < height; y += 100) {
            ctx.fillStyle = "#FFFF00";
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
            this.cargarTablero(x, y, ctx);
        }
    }
  }
}
