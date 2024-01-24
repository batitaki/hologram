import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';

const DrawImagesComponent = () => {
  const [drawImage, setDrawImage] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const imgRef = useRef(null);

  const handleImageUpload = (p5, e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = p5.loadImage(reader.result, () => {
          setUserImage(img);
          setDrawImage(true);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const keyTyped = (p5) => {
    if (p5.key === 'I' || p5.key === 'i') {
      if (drawImage && userImage) {
        const imgSize = 100;
        p5.image(userImage, p5.mouseX - imgSize / 2, p5.mouseY - imgSize / 2, imgSize, imgSize);
      }
    } else if (p5.key === 'U' || p5.key === 'u') {
      document.getElementById('imageInput').click();
    }
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(924, 668).parent(canvasParentRef);
    p5.background(255);
    p5.frameRate(60);
  };

  const draw = (p5) => {
    // Puedes agregar animaciones u otros elementos de dibujo aquí si es necesario
  };

  return (
    <div>
      <Sketch
        className="fluid"
        setup={(p5, canvasParentRef) => setup(p5, canvasParentRef)}
        draw={(p5) => draw(p5)}
        keyTyped={(p5) => keyTyped(p5)}
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
