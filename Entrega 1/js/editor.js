let color = "#000000";
let pintura = false;
let tamanio = 5;
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let lastX = -1;
let lastY = -1;

//GROSOR LINEA
let grosor = document.getElementById('grosor');
grosor.addEventListener('change', function(e){
  tamanio = parseInt(grosor.value);
});
//TRAZAR LINEA
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
  lastX = -1;
  lastY = -1;
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
      ctx.lineCap = "round"; //dibujo redondeado
       ctx.lineWidth = tamanio;//grosor
       ctx.strokeStyle = color;
       ctx.beginPath();//voy a empezar a dibujar
       ctx.moveTo(posx,posy);
       if(lastX != -1 && lastY != -1){
           ctx.moveTo(lastX, lastY);
       }
       ctx.lineTo(posx, posy); //hacemos la linea hasta
       ctx.stroke();//ahora dibujalo
       lastX = posx;
       lastY = posy;
    }
  }

//SELECCIONAR BORRAR
  let borrar = document.getElementById('borrar');
  borrar.addEventListener('click', function(e){
    color = "#FFFFFF";
    document.getElementById('colores').setAttribute("disabled", ""); //bloquea la seleccion de colores
  });

//SELECCIONAR DIBUJAR
  let lapiz = document.getElementById('lapiz');
  lapiz.addEventListener('click', function(e){
    color = document.getElementById('colores').value;
    document.getElementById('colores').removeAttribute("disabled", "");
  });

//SELECCIONAR COLOR
  color = document.getElementById('colores');
  color.addEventListener('change', function(){
    color = document.getElementById('colores').value;
  });


//GUARDAR IMAGEN
  let guardarImagen = document.getElementById('guardar');
  guardarImagen.addEventListener('click', function(){
    let canvas = document.getElementById('canvas');
    let imagen = canvas.toDataURL("image/png");
    this.href = imagen;
  });

//DOCUMENTO NUEVO
  let nuevo = document.getElementById('nuevo');
  nuevo.addEventListener('click', function canvasNuevo(){
    let ctx = document.getElementById("canvas").getContext("2d");
    var imageData = ctx.createImageData(900, 450);

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

//CARGAR IMAGEN
  let cargar = document.getElementById('cargar');
  cargar.addEventListener('change', cargarImagen, false);
  //canvasNuevo(); hacer que antes de cargar una imagen se borre la anterior
  function cargarImagen(e){
    let reader = new FileReader();
    reader.onload = function(event){
      let img = new Image();
      img.onload = function(){
        if(img.width>canvas.width || img.height>canvas.height){
          let porcentaje;
          if(img.width>img.height){
            porcentaje = (canvas.width/img.width) * 100;
          }
          else{
            porcentaje = (canvas.height/img.height) * 100;
          }
          img.width = ( porcentaje * img.width ) / 100;
          img.height = ( porcentaje * img.height ) / 100;
        }
        ctx.drawImage(img,0,0, img.width, img.height);
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  //NEGATIVO
  let negativo = document.getElementById('negativo');
  negativo.addEventListener("click", function (){
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    cambiarColoresNegativo(imgData);
  });

  function cambiarColoresNegativo(imagen){
    for(i=0; i < imagen.data.length; i+=4){
      imagen.data[i] = 255-imagen.data[i];
      imagen.data[i+1] = 255-imagen.data[i+1];
      imagen.data[i+2] = 255-imagen.data[i+2];
    }
    ctx.putImageData(imagen, 0, 0);
  }

  //ESCALA DE GRISES
  let grises = document.getElementById('grises');
  grises.addEventListener("click", function (){
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    cambiarColoresGrises(imgData);
  });

  function cambiarColoresGrises(imagen){
    for(i=0; i < imagen.data.length; i+=4){
     var cambio = (imagen.data[i] + imagen.data[i+1] + imagen.data[i+2]) / 3;
     imagen.data[i] = cambio;
     imagen.data[i+1] = cambio;
     imagen.data[i+2] = cambio;
    }
    ctx.putImageData(imagen, 0, 0);
  }

  //SEPIA
  let sepia = document.getElementById('sepia');
  sepia.addEventListener("click", function (){
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    cambiarColoresSepia(imgData);
  });

  function cambiarColoresSepia(imagen){
    pixels = imagen.data,
    numPixels = imagen.width*imagen.height;
    for ( var i = 0; i < numPixels; i++ ) {
      var r = pixels[ i * 4 ];
      var g = pixels[ i * 4 + 1 ];
      var b = pixels[ i * 4 + 2 ];

      pixels[ i * 4 ] = 255 - r;
      pixels[ i * 4 + 1 ] = 255 - g;
      pixels[ i * 4 + 2 ] = 255 - b;

      pixels[ i * 4 ] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
      pixels[ i * 4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
      pixels[ i * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
    }
    ctx.putImageData( imagen, 0, 0 );
  }

//BRILLO
let brillo = document.getElementById('brillo');
brillo.addEventListener("click", function (){
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  cambiarBrillo(imgData);
});

function cambiarBrillo(imagen){
    for(i=0; i < imagen.data.length; i+=4){
      imagen.data[i] = imagen.data[i] + 10;
      imagen.data[i+1] = imagen.data[i+1] + 10;
      imagen.data[i+2] = imagen.data[i+2] + 10;
    }
  ctx.putImageData(imagen, 0, 0);
}

//BINARIZACION
let binarizacion = document.getElementById('binarizacion');
binarizacion.addEventListener("click", function (){
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  cambiarColoresBinarizacion(imgData);
});

function cambiarColoresBinarizacion(imagen){
  for(i=0; i < imagen.data.length; i+=4){
    let promedio = (imagen.data[i] + imagen.data[i+1] + imagen.data[i+2]) / 3;
    if(promedio<128){
      imagen.data[i] = 0;
      imagen.data[i+1] = 0;
      imagen.data[i+2] = 0;
    }else{
      imagen.data[i] = 255;
      imagen.data[i+1] = 255;
      imagen.data[i+2] = 255;
    }
  }
  ctx.putImageData(imagen, 0, 0);
}
