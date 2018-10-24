class Juego {
    constructor(jugador1, jugador2) {
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.tablero = new Tablero();
        this.turnoJugador = this.jugador1;
        this.terminaJuego = false;
        this.img = new Image();
    }

    prepararJuego(){
        document.getElementById('input1').value = '';
        document.getElementById('input2').value = '';
        document.getElementById('ganador').innerHTML = '';
        this.tablero.iniciarTablero();
        this.tablero.dibujarGrilla();
        this.dibujarFichasJugador();
    }

    dibujarFichasJugador(){
        for (let i = 1; i <= 2; i++) {
            for (let y = 0; y < 21; y++){
                let ficha;
                if(i == 1){
                    let offset = this.calcularOffset(i,y);
                    ficha = new Ficha(35, 35, "#FFFF00", this.jugador1.numero,offset, "image/ficha2.png");
                    this.jugador1.cargarFichas(y,ficha);
                }
                else {
                    let offset = this.calcularOffset(i,y);
                    ficha = new Ficha(35, 35, "#FF0000", this.jugador2.numero,offset, "image/ficha1.png");
                    this.jugador2.cargarFichas(y,ficha);
                }
                ficha.dibujarFicha();
            }
        }
    }

    jugar(x,y){
        let clicked = this.turnoJugador.isClicked(x,y);
        if(clicked){
            this.borrarFicha();
        }
    }

    borrarFicha(){
        let ficha = this.turnoJugador.ficha;
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');
        ctx.beginPath();
        ctx.globalCompositeOperation = "destination-out";
        ctx.arc(ficha.offset.x+20, ficha.offset.y+20, ficha.radio, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.globalCompositeOperation = "source-over";
        this.img.src = c.toDataURL(); //guardo un screenshot
    }

    jugarFicha(x,y){
        let ficha = this.turnoJugador.ficha.levantaMouse(x,y);
        let posOriginal = {x:ficha.posX, y:ficha.posY}; //guarda posicion
        let isFichaJugada = this.tablero.obtenerColumna(ficha);

        if(isFichaJugada){
            this.turnoJugador.fichas.shift();
            console.log(this.turnoJugador.fichas.length);
            let ganador = this.tablero.verificarGanador(this.turnoJugador.numero);
            if(ganador){
                document.getElementById('ganador').innerHTML = this.turnoJugador.nombre+" es el ganador!";
                let elem = this;
                setTimeout(function(){ elem.prepararJuego(); }, 3000);
            }
            this.cambiarTurno();
        }
        else {
          ficha.posX = posOriginal.x;
          ficha.posY = posOriginal.y;
          ficha.dibujarFicha();
        }
        this.reDibujar();
        this.turnoJugador.ficha = false;
    }

    cambiarTurno(){
        if(this.turnoJugador.numero == 1){
            this.turnoJugador = this.jugador2;
        }else{
            this.turnoJugador = this.jugador1;
        }
    }

    calcularOffset(jugador,y){
        let offset;
        if(jugador == 1){
            if(y < 7){
                switch (y) {
                    case 0:
                    offset = {x:50, y: 35};
                    break;
                    case 1:
                    offset = {x:50, y: 105};
                    break;
                    case 2:
                    offset = {x:50, y: 175};
                    break;
                    case 3:
                    offset = {x:50, y: 245};
                    break;
                    case 4:
                    offset = {x:50, y: 315};
                    break;
                    case 5:
                    offset = {x:50, y: 385};
                    break;
                    case 6:
                    offset = {x:50, y: 455};
                    break;
                }
            }else if(y < 14){
                switch (y) {
                    case 7:
                    offset = {x:120, y: 35};
                    break;
                    case 8:
                    offset = {x:120, y: 105};
                    break;
                    case 9:
                    offset = {x:120, y: 175};
                    break;
                    case 10:
                    offset = {x:120, y: 245};
                    break;
                    case 11:
                    offset = {x:120, y: 315};
                    break;
                    case 12:
                    offset = {x:120, y: 385};
                    break;
                    case 13:
                    offset = {x:120, y: 455};
                    break;
                }
            }else {
                switch (y) {
                    case 14:
                    offset = {x:190, y: 35};
                    break;
                    case 15:
                    offset = {x:190, y: 105};
                    break;
                    case 16:
                    offset = {x:190, y: 175};
                    break;
                    case 17:
                    offset = {x:190, y: 245};
                    break;
                    case 18:
                    offset = {x:190, y: 315};
                    break;
                    case 19:
                    offset = {x:190, y: 385};
                    break;
                    case 20:
                    offset = {x:190, y: 455};
                    break;
                }
            }
        }else if(jugador == 2){
            if(y < 7){
                switch (y) {
                    case 0:
                    offset = {x:1050, y: 35};
                    break;
                    case 1:
                    offset = {x:1050, y: 105};
                    break;
                    case 2:
                    offset = {x:1050, y: 175};
                    break;
                    case 3:
                    offset = {x:1050, y: 245};
                    break;
                    case 4:
                    offset = {x:1050, y: 315};
                    break;
                    case 5:
                    offset = {x:1050, y: 385};
                    break;
                    case 6:
                    offset = {x:1050, y: 455};
                    break;
                }
            }else if(y < 14){
                switch (y) {
                    case 7:
                    offset = {x:980, y: 35};
                    break;
                    case 8:
                    offset = {x:980, y: 105};
                    break;
                    case 9:
                    offset = {x:980, y: 175};
                    break;
                    case 10:
                    offset = {x:980, y: 245};
                    break;
                    case 11:
                    offset = {x:980, y: 315};
                    break;
                    case 12:
                    offset = {x:980, y: 385};
                    break;
                    case 13:
                    offset = {x:980, y: 455};
                    break;
                }
            }else {
                switch (y) {
                    case 14:
                    offset = {x:910, y: 35};
                    break;
                    case 15:
                    offset = {x:910, y: 105};
                    break;
                    case 16:
                    offset = {x:910, y: 175};
                    break;
                    case 17:
                    offset = {x:910, y: 245};
                    break;
                    case 18:
                    offset = {x:910, y: 315};
                    break;
                    case 19:
                    offset = {x:910, y: 385};
                    break;
                    case 20:
                    offset = {x:910, y: 455};
                    break;
                }
            }
        }

        return offset;
    }

    reDibujar(){
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.drawImage(this.img, 0, 0);
        this.tablero.dibujarGrilla();
    }
}
