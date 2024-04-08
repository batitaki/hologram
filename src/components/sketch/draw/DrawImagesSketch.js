import React, { useState, useRef, useEffect } from "react";
import Sketch from "react-p5";
import "./DrawImages.css";

const DrawImagesComponent = () => {
  const [drawImage, setDrawImage] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [shouldDraw, setShouldDraw] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [size, setSize] = useState(100);
  const imgRef = useRef(null);
  const imagesHistory = useRef([]);

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
    const canvasWidth = Math.min(window.innerWidth, 1024);
    const canvasHeight = canvasWidth * (2 / 3);
    const canvas = p5.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasParentRef);
    canvas.style("display", "block");
    canvas.style("margin", "auto"); 
    canvas.style("user-select", "none"); 
    canvas.style('touch-action', 'none');

    canvas.elt.addEventListener('touchstart', (e) => {
      e.preventDefault();
    }, { passive: false });
  
    p5.background(255);
    p5.frameRate(60);
  };
  const draw = (p5) => {
    p5.background(255);

    if (showInstructions) {
      if (p5.frameCount % 30 < 15) {
        p5.fill(0);
        p5.textAlign(p5.CENTER);
        const instructionTextSize = p5.width < 600 ? 20 : 35; // Reducir el tamaño del texto para dispositivos móviles
        p5.textSize(instructionTextSize);
        p5.textFont("Array");
        const instructionText = "PRESS U TO DRAW YOUR IMAGES";
        p5.text(
          instructionText,
          p5.width / 2,
          p5.height / 2 + instructionTextSize / 2
        );
      }
    } else {
      for (let i = 0; i < imagesHistory.current.length; i++) {
        const { img, x, y, width, height } = imagesHistory.current[i];
        p5.image(img, x - width / 2, y - height / 2, width, height);
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
      case "1":
        setSize(50);
        break;
      case "2":
        setSize(150);
        break;
      case "3":
        setSize(250); // Tamaño grande
        break;
      case "4":
        setSize(500); // Tamaño muy grande
        break;
      case "5":
        setSize(1050); // Tamaño máximo
        break;
      default:
        break;
    }
  };

  const keyTyped = (p5) => {
    handleSizeChange(p5.key);
    if (p5.key === "U" || p5.key === "u") {
      document.getElementById("imageInput").click();
    }
  };

  const handleButtonClick = () => {
    document.getElementById("imageInput").click();
  };

  return (
    <>
      <div className="draw-images">
        <h4 className="title"> DRAW IMAGES </h4>
        <div>
          <div className="canvas-container">
            <Sketch
              setup={(p5, canvasParentRef) => setup(p5, canvasParentRef)}
              draw={(p5) => draw(p5)}
              keyTyped={(p5) => keyTyped(p5)}
              mousePressed={() => mousePressed()}
            />
          </div>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleImageUpload(new window.p5(), e)}
          />
          <div className="sizes-instruction">
          <button className="input-draw-images" onClick={handleButtonClick}>LOAD IMAGE</button>
            <ul className="intructions-list">
              TO SELECT THE IMAGE SIZE PRESS
              <li>KEY 1 = EXTRA SMALL 50PX</li>
              <li>KEY 2 = SMALL 150PX</li>
              <li>KEY 3 = MEDIUM 250PX</li>
              <li>KEY 4 = LARGE 500PX</li>
              <li>KEY 5 = EXTRA LARGE 1050PX</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawImagesComponent;
