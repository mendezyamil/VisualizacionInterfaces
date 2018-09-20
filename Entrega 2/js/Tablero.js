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

  cargarTablero(x, y, ctx, cuadrado, offsetX, offsetY){
    let ficha = new Ficha((x * cuadrado) + offsetX, (y * cuadrado) + offsetY, "#000000");
    if (this.Matriz[x][y] == 1){
      ficha.cambiarColor("#FF0000");
      ficha.dibujarFicha(ctx);
    }
    else if(this.Matriz[x][y] == 2){
      ficha.cambiarColor("#FFFF00");
      ficha.dibujarFicha(ctx);
    }
    else  if(this.Matriz[x][y] == 0){
      ficha.cambiarColor("#FFFFFF");
      ficha.dibujarFicha(ctx);
    }
  }

  dibujarGrilla(){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let cuadrado = 74;
    let offsetY = 156;
    let offsetX = 341;
    for (let x = 0; x <= this.columnas; x++) {
        for (let y = 0; y <= this.filas; y++) {
            ctx.moveTo(x * cuadrado + offsetX, offsetY);
            ctx.lineTo(x * cuadrado + offsetX, (this.filas)*cuadrado + offsetY);
            ctx.stroke();
            ctx.moveTo(offsetX, y * cuadrado + offsetY);
            ctx.lineTo((this.columnas)*cuadrado + offsetX, y * cuadrado + offsetY);
            ctx.stroke();
            if ((x < this.columnas) && (y < this.filas)){
              this.cargarTablero(x, y, ctx, cuadrado, offsetX, offsetY);
            }
        }
    }
  }
}
