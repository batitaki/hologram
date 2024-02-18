import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Sketch from 'react-p5';

const NavbarSketch = () => {
  const { t } = useTranslation();

  const [userImage, setUserImage] = useState(null);
  const [shouldDraw, setShouldDraw] = useState(false);
  const imgRef = useRef(null);
  const imagesHistory = useRef([]);
  const imageSize = 50;
  const textPosX = useRef(-200);

  const handleImageUpload = (p5, file) => {
    if (file && !userImage) {
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
    p5.background(255, 0, 0);
    p5.textFont('Array');
  };

  const draw = (p5) => {
    p5.background(255, 0, 0);

    if (textPosX.current > -200) {
      textPosX.current -= 1;
    } else {
      textPosX.current = p5.width;
    }
    
    p5.fill(0);
    p5.textSize(12);
    p5.textAlign(p5.LEFT);
    p5.text(t('sketchText'), textPosX.current, 20);

    for (let i = 0; i < imagesHistory.current.length; i++) {
      const { img, x, y } = imagesHistory.current[i];
      p5.image(img, x - imageSize / 2, y - imageSize / 2, imageSize, imageSize);
    }

    if (userImage && shouldDraw && p5.mouseIsPressed) {
      const mouseX = p5.mouseX;
      const mouseY = p5.mouseY;
      imagesHistory.current.push({ img: userImage, x: mouseX, y: mouseY });
    }
  };

  const handleWindowKeyDown = (event) => {
    if (event.altKey && event.code === 'KeyI') {
      document.getElementById('imageInput').click();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleWindowKeyDown);
    return () => {
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, []);

  const handleFileChange = (e) => {
    handleImageUpload(new window.p5(), e.target.files[0]);
  };

  return (
    <div>
      <Sketch
        className="fluid"
        setup={(p5, canvasParentRef) => setup(p5, canvasParentRef)}
        draw={(p5) => draw(p5)}
        style={{ color: 'black' }}
      />
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default NavbarSketch;
