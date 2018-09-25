class Tablero {
  constructor() {
    this.columnas = 7;
    this.filas = 6;
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext('2d');
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

  cargarTablero(x, y, cuadrado, offsetX, offsetY){
    let ficha = new Ficha((x * cuadrado) + offsetX, (y * cuadrado) + offsetY, "#000000");
    let offsetFicha = 46; //53
    if (this.Matriz[x][y] == 1){
      ficha.cambiarColor("#FF0000");
      ficha.dibujarFicha(this.ctx, offsetFicha);
    }
    else if(this.Matriz[x][y] == 2){
      ficha.cambiarColor("#FFFF00");
      ficha.dibujarFicha(this.ctx, offsetFicha);
    }
    else  if(this.Matriz[x][y] == 0){
      ficha.cambiarColor("#FFFFFF");
      ficha.dibujarFicha(this.ctx, offsetFicha);
    }
  }

  pintarGrilla(){
    this.ctx.fillStyle = "#000000";
		//fillRect margen derecho, margen arriba, ancho, alto
		this.ctx.fillRect(376, 106, 448, 384);
		this.ctx.beginPath();
  }

  dibujarGrilla(){
    this.pintarGrilla(this.ctx); //fondo de la grilla
    let cuadrado = 64; //longitud en pixeles de cada cuadrado
    let offsetY = 106; //distancia en y 156
    let offsetX = 376; //distancia en x 341
    for (let x = 0; x <= this.columnas; x++) {
      for (let y = 0; y <= this.filas; y++) {
        this.ctx.moveTo(x * cuadrado + offsetX, offsetY);
        this.ctx.lineTo(x * cuadrado + offsetX, (this.filas) * cuadrado + offsetY);
        this.ctx.stroke();
        this.ctx.moveTo(offsetX, y * cuadrado + offsetY);
        this.ctx.lineTo((this.columnas) * cuadrado + offsetX, y * cuadrado + offsetY);
        this.ctx.stroke();
        if ((x < this.columnas) && (y < this.filas)){
          this.cargarTablero(x, y, cuadrado, offsetX, offsetY); //dibujar almacenamiento para cada ficha
        }
      }
    }
  }

  cargarFichasJugador(){
    let cuadrado = 74;
    let offsetFicha = 3;
    let offsetX = 35;
    let offsetY = 35;
    let color = "#FFFF00";
    let filas = 7;
    let columnas = 3;
    let ficha = new Ficha(offsetX, offsetY, color);
    ficha.dibujarFicha(this.ctx, offsetFicha);
    ficha.dibujarFicha(this.ctx, offsetFicha+30);

    // for (let x = 0; x <= columnas; x++) {
    //   for (let y = 0; y <= filas; y++) {
    //     offsetFicha += 20;
    //     ficha.dibujarFicha(this.ctx, offsetFicha);
    //   }
    // }
  }

//Carga ficha en dicha posicion, matriz logica
  cargarFicha(x, y, valor){
    if ((x < this.columnas) && (y < this.filas)) {
        this.Matriz[x][y] = valor;
      }
  }

//Retorna primer posicion libre, de abajo para arriba
  buscarLibre(x){
   for (var y = this.filas-1; y < this.Matriz[x].length; y--) {
    if (this.Matriz[x][y] == 0){
      return y;
      }
    }
  }

  //Verificar victoria horizontal
  verificarHorizontal(jugador){
    for (var x = 0; x < this.Matriz.length; x++) {
      for (var y = 0; y < this.Matriz[x].length; y++) {
        if(this.Matriz[y][x] == jugador){
          if(this.Matriz[y+1][x] == jugador){
            if(this.Matriz[y+2][x] == jugador){
              if(this.Matriz[y+3][x] == jugador){
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }

  verificarVertical(jugador){
    for (var x = 0; x < this.Matriz.length; x++) {
      for (var y = 0; y < this.Matriz[x].length; y++) {
        if(this.Matriz[x][y] == jugador){
          if(this.Matriz[x][y+1] == jugador){
            if(this.Matriz[x][y+2] == jugador){
              if(this.Matriz[x][y+3] == jugador){
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }

}
