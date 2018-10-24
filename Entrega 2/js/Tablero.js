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
        this.offset = {x:325,y:106,cuadrado:64}
    }

    iniciarTablero(){
        for (let i = 0; i < this.Matriz.length; i++) {
            for (let y = 0; y < this.Matriz[i].length; y++) {
                this.Matriz[i][y] = 0; //inicializo la matriz en 0
            }
        }
    }

    cargarTablero(x, y, cuadrado, offsetX, offsetY){
        let ficha = new Ficha((x * cuadrado) + offsetX, (y * cuadrado) + offsetY, "#000000", 0, {});
        let offsetFicha = {x:46,y:46};
        if (this.Matriz[x][y] == 2){
            ficha.cambiarColor("#FF0000");
            ficha.cambiarImagen("image/ficha1.png");
        }
        else if(this.Matriz[x][y] == 1){
            ficha.cambiarColor("#FFFF00");
            ficha.cambiarImagen("image/ficha2.png");
        }
        else if(this.Matriz[x][y] == 0){
            ficha.cambiarColor("#FFFFFF");
        }
        ficha.dibujarFichaEnTablero(this.ctx, offsetFicha);
    }

    pintarGrilla(){
        this.ctx.fillStyle = "#0033aa";
        //margen derecho, margen arriba, ancho, alto
        this.ctx.fillRect(this.offset.x, this.offset.y, 448, 384);
        this.ctx.beginPath();
    }

    dibujarGrilla(){
        this.pintarGrilla(this.ctx); //fondo de la grilla
        for (let x = 0; x <= this.columnas; x++) {
            for (let y = 0; y <= this.filas; y++) {
                this.ctx.moveTo(x * this.offset.cuadrado + this.offset.x, this.offset.y);
                this.ctx.lineTo(x * this.offset.cuadrado + this.offset.x, (this.filas) * this.offset.cuadrado + this.offset.y);
                this.ctx.moveTo(this.offset.x, y * this.offset.cuadrado + this.offset.y);
                this.ctx.lineTo((this.columnas) * this.offset.cuadrado + this.offset.x, y * this.offset.cuadrado + this.offset.y);
                if ((x < this.columnas) && (y < this.filas)){
                    this.cargarTablero(x, y, this.offset.cuadrado, this.offset.x, this.offset.y); //dibujar almacenamiento para cada ficha dentro de la grilla
                }
            }
        }
    }

    obtenerColumna(ficha){
        let columna = -1; //no estoy dentro de ninguna columna
        let x = ficha.offset.x;
        let cotaIzquierda = this.offset.x; //posicion inicial de la columna
        let cotaDerecha = (this.offset.x+this.offset.cuadrado); //posicion final de la columna

        if(cotaIzquierda < x && x < cotaDerecha){
            columna = 0;
        }else{
            cotaIzquierda = cotaDerecha;
            cotaDerecha += this.offset.cuadrado;

            if (cotaIzquierda < x && x < cotaDerecha) {
                columna = 1;
            }else{
                cotaIzquierda = cotaDerecha;
                cotaDerecha += this.offset.cuadrado;
                if (cotaIzquierda < x && x < cotaDerecha) {
                    columna = 2;
                }else{
                    cotaIzquierda = cotaDerecha;
                    cotaDerecha += this.offset.cuadrado;

                    if (cotaIzquierda < x && x < cotaDerecha) {
                        columna = 3;
                    }else{
                        cotaIzquierda = cotaDerecha;
                        cotaDerecha += this.offset.cuadrado;

                        if (cotaIzquierda < x && x < cotaDerecha) {
                            columna = 4;
                        }else {
                            cotaIzquierda = cotaDerecha;
                            cotaDerecha += this.offset.cuadrado;

                            if (cotaIzquierda < x && x < cotaDerecha) {
                                columna = 5;
                            }else {
                                cotaIzquierda = cotaDerecha;
                                cotaDerecha += this.offset.cuadrado;

                                if (cotaIzquierda < x && x < cotaDerecha) {
                                    columna = 6;
                                }
                            }
                        }
                    }
                }
            }
        }
        let fila = this.buscarLibre(columna);
        if(fila != -1){
            this.cargarFicha(columna,fila, ficha.id);
            return true;
        }else{
            return false;
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
        if(x != -1){
            for (let y = this.filas-1; y >= 0; y--) {
                if (this.Matriz[x][y] == 0){
                    return y;
                }
            }
        }
        return -1;
    }

    verificarGanador(jugador){
        let ganador = this.verificarHorizontal(jugador);
        if(!ganador){
            ganador = this.verificarVertical(jugador);
            if(!ganador){
                ganador = this.verificarDiagonal1(jugador);
                if(!ganador){
                    ganador = this.verificarDiagonal2(jugador);
                }
            }
        }
        return ganador;
    }

    //Verificar victoria horizontal
    verificarHorizontal(jugador){
        for (let x = 0; x < this.Matriz.length; x++) {
            for (let y = 0; y < this.Matriz[x].length-2; y++) {
                if((this.Matriz[y][x] == jugador) && (y-3 < this.Matriz.length)){
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
        for (let x = 0; x < this.Matriz.length; x++) {
            for (let y = 0; y < this.Matriz[x].length-2; y++) {
                if((this.Matriz[x][y] == jugador) && (y+3 < this.Matriz[x].length)){
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

    verificarDiagonal1(jugador){
        for (let x = this.Matriz.length-1; x >=0; x--) {
            for (let y = 0; y < this.Matriz[x].length-2; y++) {
                if ((this.Matriz[x][y] == jugador) && (y+3 < this.Matriz[x].length) && (x-3 >= 0)){
                    if ((this.Matriz[x-1][y+1] == jugador) && (this.Matriz[x-2][y+2] == jugador) && (this.Matriz[x-3][y+3] == jugador)){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    verificarDiagonal2(jugador){
        for (let x = 0; x < this.Matriz.length; x++) {
            for (let y = 0; y < this.Matriz[x].length-2; y++) {
                if ((this.Matriz[x][y] == jugador) && (y+3 < this.Matriz[x].length) && (x+3 < this.Matriz.length)){
                    if ((this.Matriz[x+1][y+1] == jugador) && (this.Matriz[x+2][y+2] == jugador) && (this.Matriz[x+3][y+3] == jugador)){
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
