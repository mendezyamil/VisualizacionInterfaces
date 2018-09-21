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

  pintarGrilla(ctx){
    ctx.fillStyle = "#000000";
		//fillRect margen derecho, margen arriba, ancho, alto
		ctx.fillRect(341, 0, 518, 555);
		ctx.beginPath();
  }

  dibujarGrilla(){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    this.pintarGrilla(ctx); //fonde de la grilla
    let cuadrado = 74; //longitud en pixeles de cada cuadrado
    let offsetY = 0; //distancia en y 156
    let offsetX = 341; //distancia en x
    for (let x = 0; x <= this.columnas; x++) {
      for (let y = 0; y <= this.filas; y++) {
        ctx.moveTo(x * cuadrado + offsetX, offsetY);
        ctx.lineTo(x * cuadrado + offsetX, (this.filas) * cuadrado + offsetY);
        ctx.stroke();
        ctx.moveTo(offsetX, y * cuadrado + offsetY);
        ctx.lineTo((this.columnas) * cuadrado + offsetX, y * cuadrado + offsetY);
        ctx.stroke();
        if ((x < this.columnas) && (y < this.filas)){
          this.cargarTablero(x, y, ctx, cuadrado, offsetX, offsetY); //dibujar almacenamiento para cada ficha
        }
      }
    }
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
