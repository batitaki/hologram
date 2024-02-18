import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next'; // Importa useTranslation desde react-i18next
import Sketch from 'react-p5';

const NavbarSketch = () => {
  const { t } = useTranslation(); // Utiliza useTranslation para acceder a las traducciones

  const [userImage, setUserImage] = useState(null);
  const [shouldDraw, setShouldDraw] = useState(false);
  const imgRef = useRef(null);
  const imagesHistory = useRef([]);
  const imageSize = 50; // Tamaño de la imagen
  const textPosX = useRef(-200); // Posición X inicial del texto

  const handleImageUpload = (p5, e) => {
    const file = e.target.files[0];
  
    if (file && !userImage) { // Verifica si no hay una imagen cargada
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = p5.loadImage(reader.result, () => {
          setUserImage(img);
          setShouldDraw(true);
        });
        imgRef.current = img;
      };
      reader.readAsDataURL(file);
    }
  };
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(250, 400).parent(canvasParentRef);
    p5.background(255, 0, 0); // Fondo rojo (rojo, verde, azul)
    p5.textFont('Array'); // Establecer la tipografía como 'Array'
  };

  const draw = (p5) => {
    p5.background(255, 0, 0); // Fondo rojo (rojo, verde, azul)

    // Ajustar la posición X del texto
    if (textPosX.current > -200) { // Cambiar la condición
        textPosX.current -= 1; // Disminuir la posición X
      } else {
        textPosX.current = p5.width; // Restablecer la posición al final del canvas
      }
    
      p5.fill(0); // Texto en negro
      p5.textSize(12);
      p5.textAlign(p5.LEFT);
      p5.text(t('sketchText'), textPosX.current, 20); // Utiliza la traducción para el texto

    // Dibuja las imágenes almacenadas
    for (let i = 0; i < imagesHistory.current.length; i++) {
      const { img, x, y } = imagesHistory.current[i];
      p5.image(img, x - imageSize / 2, y - imageSize / 2, imageSize, imageSize);
    }

    // Dibuja la imagen si está disponible y se debe dibujar
    if (userImage && shouldDraw && p5.mouseIsPressed) {
      const mouseX = p5.mouseX;
      const mouseY = p5.mouseY;
      imagesHistory.current.push({ img: userImage, x: mouseX, y: mouseY });
    }
  };

  const keyTyped = (p5) => {
    if (p5.key === 'U' || p5.key === 'u') {
      document.getElementById('imageInput').click();
    }
  };

  return (
    <div>
      <Sketch
        className="fluid"
        setup={(p5, canvasParentRef) => setup(p5, canvasParentRef)}
        draw={(p5) => draw(p5)}
        keyTyped={(p5) => keyTyped(p5)}
        style={{ color: 'black' }} // Color del texto en negro
      />
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleImageUpload(new window.p5(), e)}
      />
    </div>
  );
};

export default NavbarSketch;
