let juego = new Juego();
let boton = document.getElementById('restart');
boton.disabled = true;

document.getElementById("start").addEventListener("click", function(){
    juego.comienzoJuego();
});

document.getElementById("restart").addEventListener("click", function(){
    juego.comienzoJuego();
});

document.addEventListener("keydown", function (e) {
  if (e.keyCode == 37){
	e.preventDefault();
    juego.movimiento("left", 8);
  }
  if (e.keyCode == 39){
	e.preventDefault();
    juego.movimiento("right", 8);
  }
  if (e.keyCode == 38){
	e.preventDefault();
    juego.movimiento("up", 8);
  }
  if (e.keyCode == 40){
	e.preventDefault();
    juego.movimiento("down", 8);
  }
  e.keyCode = true;
});
