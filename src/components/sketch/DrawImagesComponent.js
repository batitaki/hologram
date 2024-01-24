import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';

const DrawImagesComponent = () => {
  const [drawImage, setDrawImage] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const imgRef = useRef(null);
  const imagesHistory = useRef([]); // Almacena las imágenes anteriores

  const handleImageUpload = (p5, e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = p5.loadImage(reader.result, () => {
          setUserImage(img);
          setDrawImage(true);
        });
        imgRef.current = img;
      };
      reader.readAsDataURL(file);
    }
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(924, 668).parent(canvasParentRef);
    p5.background(255);
    p5.frameRate(60);
  };

  const draw = (p5) => {
    p5.background(255);

    // Dibujar todas las imágenes almacenadas en el historial
    for (let i = 0; i < imagesHistory.current.length; i++) {
      const { img, x, y } = imagesHistory.current[i];
      const imgSize = 100;
      p5.image(img, x - imgSize / 2, y - imgSize / 2, imgSize, imgSize);
    }

    if (drawImage && userImage) {
      const imgSize = 100;
      const currentImage = { img: userImage, x: p5.mouseX, y: p5.mouseY };
      imagesHistory.current.push(currentImage);
    }
  };

  const mouseMoved = (p5) => {
    // No es necesario para esta implementación, pero puedes dejarlo aquí si lo necesitas
  };

  const keyTyped = (p5) => {
    if (p5.key === 'U' || p5.key === 'u') {
      document.getElementById('imageInput').click();
    } else if (p5.key === 'I' || p5.key === 'i') {
      setDrawImage(!drawImage);
    }
  };

  return (
    <div>
      <Sketch
        className="fluid"
        setup={(p5, canvasParentRef) => setup(p5, canvasParentRef)}
        draw={(p5) => draw(p5)}
        keyTyped={(p5) => keyTyped(p5)}
        mouseMoved={(p5) => mouseMoved(p5)}
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

export default DrawImagesComponent;
