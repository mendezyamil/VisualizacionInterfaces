class Ficha {

    constructor(x, y, paramcolor, tipo, offset, src) {
        this.posX = x;
        this.posY = y;
        this.color = paramcolor;
        this.radio = 30;
        this.id = tipo;
        this.offset = offset;
        this.clicked = false;
        this.img = new Image();
        this.img.src = src;
    }

    cambiarColor(color){
        this.color = color;
    }

    cambiarImagen(src){
        this.img.src = src;
    }

    dibujarFichaEnTablero(ctx, offset){

        ctx.fillStyle = this.color;
        ctx.beginPath();
        let M = Math.floor((Math.sqrt(((offset.x)*(offset.x)) + ((offset.y)*(offset.y))))/2); //calcular a partir de donde dibujar el circulo
        ctx.arc(M + this.posX, M + this.posY, this.radio, 0, Math.PI *2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.drawImage(this.img,this.posX,this.posY, 62, 62);
    }

    dibujarFicha(){
        let ctx = document.getElementById('canvas').getContext('2d');
        let fichin = this;
        this.img.onload = function(){
            ctx.drawImage(fichin.img, fichin.offset.x, fichin.offset.y, fichin.radio, fichin.radio);
        }
    }

    dragFicha(){
        let ctx = document.getElementById('canvas').getContext('2d');
        ctx.drawImage(this.img, this.offset.x, this.offset.y, this.radio, this.radio);
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
        ctx.clearRect(this.offset.x, this.offset.y, 35, 35);
    }

    mueveMouse(x,y,juego){
        let ctx = document.getElementById('canvas').getContext('2d');
        this.borrar();
        juego.reDibujar();
        this.offset.x=x;
        this.offset.y=y;
        this.dragFicha();
    }

    levantaMouse(x,y){
        this.offset.x=x;
        this.offset.y=y;
        this.clicked = false;
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return this;
    }
}
