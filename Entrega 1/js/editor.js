let color = "#000000";
let tamanio = 10;
let pintura = false;
let canvas = document.getElementById('canvas');
canvas.addEventListener('mousedown', activar);
canvas.addEventListener('mouseup', desactivar);
canvas.addEventListener('mousemove',
function lapiz(evento){
  let mousePos = getMousePos(canvas, evento);
  let mouseX = mousePos.x;
  let mouseY = mousePos.y;
  draw(canvas, mouseX, mouseY);
});

function activar(){
  pintura = true;
}

function desactivar(){
  pintura = false;
}

function getMousePos(canvas, evento){
  let rect = canvas.getBoundingClientRect();
  return {
    x:evento.clientX - rect.left,
    y:evento.clientY - rect.top
  }
}

  function draw(canvas, posx, posy){
    let ctx = canvas.getContext('2d');
    if(pintura){
      ctx.fillStyle = color;
      ctx.fillRect(posx, posy, tamanio, tamanio);
    }
  }

  let borrar = document.getElementById('borrar');
  borrar.addEventListener('click', function(e){
    color = "#FFFFFF";
    document.getElementById('colores').setAttribute("disabled", "");
  });

  let lapiz = document.getElementById('lapiz');
  lapiz.addEventListener('click', function(e){
    color = document.getElementById('colores').value;
    document.getElementById('colores').removeAttribute("disabled", "");
  });

  color = document.getElementById('colores');
  color.addEventListener('change', function(){
    color = document.getElementById('colores').value;
  });

  let guardarImagen = document.getElementById('guardar');
  guardarImagen.addEventListener('click', function(){
    let canvas = document.getElementById('canvas');
    let imagen = canvas.toDataURL("image/png");
    this.href = imagen;
  });

  let nuevo = document.getElementById('nuevo');
  nuevo.addEventListener('click', function(){
    let ctx = document.getElementById("canvas").getContext("2d");
    var imageData = ctx.createImageData(600, 500);

  	for (x=0; x < 600; x++){
  		for (y=0; y < 500; y++){
  			SetPixel(imageData, x, y, 255, 255, 255, 255);
  		}
  	}
  	ctx.putImageData(imageData, 0, 0);

  	function SetPixel(imageData, x, y, r, g, b, a){
  		index = (x+y*imageData.width)*4;
  		imageData.data[index+0] = r;
  		imageData.data[index+1] = g;
  		imageData.data[index+2] = b;
  		imageData.data[index+3] = a;
  	}
  });
