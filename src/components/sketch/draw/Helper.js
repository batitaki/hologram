import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';
import { ChromePicker } from 'react-color';
import './DrawCircles.css'; // Ajusté el nombre del archivo

const DrawCirclesComponent = () => {
  const [aureolaColor, setAureolaColor] = useState({ r: 465, g: 90, b: 220 }); 
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [userImage, setUserImage] = useState(null); // Estado para almacenar la imagen proporcionada por el usuario
  const [drawUserImage, setDrawUserImage] = useState(false); // Estado para controlar el dibujo de la imagen del usuario
  const [showInstructions, setShowInstructions] = useState(true); // Estado para mostrar u ocultar las instrucciones
  const imgRef = useRef(null);
  const aureolas = [];

  const handleColorChange = (color) => {
    setAureolaColor(color.rgb);
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  const keyPressed = (p5) => {
    if (p5.key === 'u' || p5.key === 'U') {
      // Permitir al usuario cargar la imagen cuando se presiona 'u'
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserImage(e.target.result);
          setDrawUserImage(true); // Activar dibujo de la imagen del usuario
          setShowInstructions(false); // Ocultar las instrucciones una vez que se carga la foto
        };
        reader.readAsDataURL(file);
      };
      fileInput.click();
    }
  };

  const mousePressed = (p5) => {
    if (drawUserImage && userImage && imgRef.current && imgRef.current.user) {
      // Dibujar imagen del usuario cuando se presiona el mouse
      const mouseX = p5.mouseX;
      const mouseY = p5.mouseY;
      const imgSize = 100;
      p5.image(imgRef.current.user, mouseX - imgSize / 2, mouseY - imgSize / 2, imgSize, imgSize);
      aureolas.push({ x: mouseX, y: mouseY, radius: 0, growing: true }); // Inicializar radio en 0 e indicar que está creciendo
    }
  };

  const mouseReleased = () => {
    // Detener el crecimiento de la aureola cuando se suelta el mouse
    aureolas.forEach((aureola) => {
      aureola.growing = false;
    });
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1024, 768).parent(canvasParentRef);
    p5.background(255);
    p5.frameRate(60);
  };

  const draw = (p5) => {
    p5.background(255); // Limpiar el fondo en cada iteración

    if (userImage && !imgRef.current) {
      // Cargar imagen del usuario al entorno p5.js si aún no está cargada
      imgRef.current = {
        user: p5.loadImage(userImage, () => {
          console.log('User image loaded successfully.');
        }),
      };
    }

    // Dibujar aureolas
    for (let i = aureolas.length - 1; i >= 0; i--) {
      p5.noFill();
      p5.stroke(aureolaColor.r, aureolaColor.g, aureolaColor.b);
      p5.ellipse(aureolas[i].x, aureolas[i].y, aureolas[i].radius, aureolas[i].radius);

      // Aumentar el radio de la aureola mientras se presiona el mouse
      if (aureolas[i].growing) {
        aureolas[i].radius -= 5;
      }

      if (aureolas[i].radius >= 340) {
        aureolas.splice(i, 1); // Eliminar aureolas que excedan el tamaño máximo
      }
    }

    // Mostrar las instrucciones intermitentes
    if (showInstructions && p5.frameCount % 60 < 30) {
      p5.textAlign(p5.CENTER);
      p5.textSize(20);
      p5.fill(0);
      p5.text('PRESS U TO UPLOAD YOUR PHOTO', p5.width / 2, p5.height / 2);
    }
  };

  return (
    <div>
      <div className='color-button-container' >
        <button className='color-buttons' onClick={toggleColorPicker}>PICK COLOR</button>
        {showColorPicker && (
          <ChromePicker color={aureolaColor} onChange={handleColorChange} onClose={handleCloseColorPicker} />
        )}
      </div>
      <Sketch
        className="fluid"
        setup={setup}
        draw={draw}
        keyPressed={keyPressed}
        mousePressed={mousePressed}
        mouseReleased={mouseReleased}
      />
    </div>
  );
};

export default DrawCirclesComponent;
