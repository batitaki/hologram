import React, { useState, useRef, useEffect } from 'react';
import Sketch from 'react-p5';

const DrawImagesComponent = () => {
  const [drawImage, setDrawImage] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [shouldDraw, setShouldDraw] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true); // Nuevo estado
  const imgRef = useRef(null);
  const imagesHistory = useRef([]);

  const handleImageUpload = (p5, e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = p5.loadImage(reader.result, () => {
          setUserImage(img);
          setDrawImage(true);
          setShouldDraw(true);
          setShowInstructions(false); // Ocultar instrucciones después de cargar la imagen
        });
        imgRef.current = img;
      };
      reader.readAsDataURL(file);
    }
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1024, 668).parent(canvasParentRef);
    p5.background(255);
    p5.frameRate(60);
  };

  const draw = (p5) => {
    p5.background(255);

    if (showInstructions) {
      // Dibujar texto titilante si showInstructions es true
      if (p5.frameCount % 30 < 15) {
        p5.fill(0);
        p5.textAlign(p5.CENTER);
        p5.textSize(20);
        p5.textFont('Array');
        p5.text('PRESS U TO DRAW YOUR PHOTO', p5.width / 2, p5.height / 2);
      }
    } else {
      // Dibujar imágenes
      for (let i = 0; i < imagesHistory.current.length; i++) {
        const { img, x, y } = imagesHistory.current[i];
        const imgSize = 100;
        p5.image(img, x - imgSize / 2, y - imgSize / 2, imgSize, imgSize);
      }

      if (drawImage && userImage && shouldDraw && !isPaused) {
        const currentImage = { img: userImage, x: p5.mouseX, y: p5.mouseY };
        imagesHistory.current.push(currentImage);
      }
    }
  };

  const mousePressed = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.pause = isPaused;
    }
  }, [isPaused]);

  const keyTyped = (p5) => {
    if (p5.key === 'U' || p5.key === 'u') {
      document.getElementById('imageInput').click();
    } else if (p5.key === 'I' || p5.key === 'i') {
      setDrawImage(!drawImage);
    }
  };

  return (
    <>
    <div className='draw-images'>
    <h4 className='title'> DRAW IMAGES </h4>
    <div>
      <Sketch
        className="fluid"
        setup={(p5, canvasParentRef) => setup(p5, canvasParentRef)}
        draw={(p5) => draw(p5)}
        keyTyped={(p5) => keyTyped(p5)}
        mousePressed={() => mousePressed()}
      />
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleImageUpload(new window.p5(), e)}
      />
      
    </div>
    </div>
    </>
  );
};

export default DrawImagesComponent;
