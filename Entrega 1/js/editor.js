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

  guardarImagen = document.getElementById('guardar');
  guardarImagen.addEventListener('click', function(){
    let canvas = document.getElementById('canvas');
    let imagen = canvas.toDataURL("image/png");
    this.href = imagen;
  });

//pintar canvas en blanco 
