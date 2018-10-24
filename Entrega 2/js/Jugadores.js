class Jugador {
    constructor(numeroJugador, nombreJugador, direccion) {
        this.fichas = [];
        this.numero = numeroJugador;
        this.nombre = nombreJugador;
        this.ficha = false;
        this.direccion = direccion;
    }

    cargarFichas(pos,ficha){
        this.fichas[pos] = ficha;
    }

    isClicked(x,y){
        //recorro arreglo de fichas y pregunto si estoy clickeando en alguna
        for(let i = 0; i<this.fichas.length; i++){
            let clicked = this.fichas[i].isClicked(x,y);
            if(clicked){
                this.ficha = this.fichas[i];
                return clicked;
            }
            this.ficha = false;
        }
        return false;
    }
}
