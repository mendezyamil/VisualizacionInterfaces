class Ficha {

    constructor(x, y, paramcolor, tipo, offset) {
        this.posX = x;
        this.posY = y;
        this.color = paramcolor;
        this.radio = 30;
        this.id = tipo;
        this.offset = offset;
        this.clicked = false;
    }

    cambiarColor(color){
        this.color = color;
    }

    dibujarFichaEnTablero(ctx, offset){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        let M = Math.floor((Math.sqrt(((offset.x)*(offset.x)) + ((offset.y)*(offset.y))))/2); //calcular a partir de donde dibujar el circulo
        ctx.arc(M + this.posX, M + this.posY, this.radio, 0, Math.PI *2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    dibujarFicha(){
        let ctx = document.getElementById('canvas').getContext('2d');
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.offset.x, this.offset.y, this.radio, 0, Math.PI *2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    isClicked(x,y){
        let mouseX = x - (this.offset.x);
        let mouseY = y - (this.offset.y);
        let hipotenusa = Math.sqrt(mouseX*mouseX + mouseY*mouseY);
        if (hipotenusa < this.radio){
            this.clicked = true;
        }else{
            this.clicked = false;
        }
        return this.clicked;
    }

    borrar(){
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    mueveMouse(x,y,juego){
        let ctx = document.getElementById('canvas').getContext('2d');
        this.borrar();
        juego.reDibujar();
        this.offset.x=x;
        this.offset.y=y;
        this.dibujarFicha();
    }

    levantaMouse(x,y){
        this.offset.x=x;
        this.offset.y=y;
        this.clicked = false;
        this.borrar();
        return this;
    }
}
