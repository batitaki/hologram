import React, { useState, useRef } from "react";
import Sketch from "react-p5";

const DrawImagesComponent = () => {
  const [drawImage, setDrawImage] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [shouldDraw, setShouldDraw] = useState(false); 
  const [isPaused, setIsPaused] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [size, setSize] = useState(100); 
  const [opacity, setOpacity] = useState(1); // Estado para controlar la opacidad
  const imgRef = useRef(null);
  const imagesHistory = useRef([]);
  const opacityImage = useRef(null); // Referencia a la imagen con opacidad

  const handleImageUpload = (p5, e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = p5.loadImage(reader.result, () => {
          setUserImage(img);
          setShowInstructions(false);
          setDrawImage(true); 
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
      if (p5.frameCount % 30 < 15) {
        p5.fill(0);
        p5.textAlign(p5.CENTER);
        p5.textSize(35);
        p5.textFont("Array");
        p5.text("PRESS U TO DRAW YOUR IMAGES", p5.width / 2, p5.height / 2);
      }
    } else {
      for (let i = 0; i < imagesHistory.current.length; i++) {
        const { img, x, y, width, height } = imagesHistory.current[i];
        p5.image(img, x - width / 2, y - height / 2, width, height);
      }

      // Dibujar imagen con opacidad si está activada
      if (opacityImage.current) {
        p5.tint(255, 255 * opacity); // Aplicar opacidad
        p5.image(opacityImage.current, 0, 0, p5.width, p5.height);
        p5.noTint(); // Restaurar opacidad a su estado normal
      }

      if (drawImage && userImage && shouldDraw && !isPaused) {
        const currentImage = {
          img: userImage,
          x: p5.mouseX,
          y: p5.mouseY,
          width: userImage.width * (size / userImage.width),
          height: userImage.height * (size / userImage.width),
        };
        imagesHistory.current.push(currentImage);
      }
    }
  };

  const mousePressed = () => {
    setShouldDraw(true);

    if (shouldDraw) {
      setIsPaused(!isPaused);
    }
  };

  const handleSizeChange = (key) => {
    switch (key) {
      case '1':
        setSize(50); 
        break;
      case '2':
        setSize(150);
        break;
      case '3':
        setSize(250); // Tamaño grande
        break;
      case '4':
        setSize(500); // Tamaño muy grande
        break;
      case '5':
        setSize(1050); // Tamaño máximo
        break;
      default:
        break;
    }
  };

  const handleOpacityChange = () => {
    setOpacity(opacity === 1 ? 0.5 : 1); // Cambiar la opacidad entre 1 y 0.5
  };

  const keyTyped = (p5) => {
    handleSizeChange(p5.key);
    if (p5.key === "U" || p5.key === "u") {
      document.getElementById("imageInput").click();
    } else if (p5.key === "6") {
      setSize(1050); // Establecer el tamaño al máximo
      setOpacity(0.5); // Establecer la opacidad a 0.5
    }
  };
  

  return (
    <>
      <div className="draw-images">
        <h4 className="title"> DRAW IMAGES </h4>
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
            style={{ display: "none" }}
            onChange={(e) => handleImageUpload(new window.p5(), e)}
          />
          <div className="sizes-instruction">
            <li className="intructions-list">
              TO SELECT THE IMAGE SIZE PRESS 
              <p> KEY 1 = EXTRA SMALL 50PX </p>
              <p> KEY 2 = SMALL 150PX </p>
              <p> KEY 3 = MEDIUM 250PX </p>
              <p> KEY 4 = LARGE 500PX </p>
              <p> KEY 5 = EXTRA LARGE 1050PX</p>
              <p> KEY 6 = CHANGE OPACITY</p> {/* Agregar instrucción para la tecla "6" */}
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawImagesComponent;
