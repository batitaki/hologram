import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';
import { ChromePicker } from 'react-color';
import './DrawCircles.css'; // Adjusted file name

const DrawCirclesComponent = () => {
  const [aureolaColor, setAureolaColor] = useState({ r: 465, g: 90, b: 220 }); 
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [userImage, setUserImage] = useState(null); // State to store user provided image
  const [drawUserImage, setDrawUserImage] = useState(false); // State to control drawing of user image
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
      // Allow user to load image when 'u' is pressed
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserImage(e.target.result);
          setDrawUserImage(true); // Activate drawing of user image
        };
        reader.readAsDataURL(file);
      };
      fileInput.click();
    }
  };

  const mousePressed = (p5) => {
    if (drawUserImage && userImage && imgRef.current && imgRef.current.user) {
      // Draw user image when mouse is pressed
      const mouseX = p5.mouseX;
      const mouseY = p5.mouseY;
      const imgSize = 100;
      p5.image(imgRef.current.user, mouseX - imgSize / 2, mouseY - imgSize / 2, imgSize, imgSize);
      aureolas.push({ x: mouseX, y: mouseY, radius: 0, growing: true }); // Initialize radius to 0 and indicate it's growing
    }
  };

  const mouseReleased = () => {
    // Stop aureola growth when mouse is released
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
    if (userImage && !imgRef.current) {
      // Load user image into p5.js environment if it's not already loaded
      imgRef.current = {
        user: p5.loadImage(userImage, () => {
          console.log('User image loaded successfully.');
        }),
      };
    }

    // Draw aureolas
    for (let i = aureolas.length - 1; i >= 0; i--) {
      p5.noFill();
      p5.stroke(aureolaColor.r, aureolaColor.g, aureolaColor.b);
      p5.ellipse(aureolas[i].x, aureolas[i].y, aureolas[i].radius, aureolas[i].radius);

      // Increase aureola radius while mouse is pressed
      if (aureolas[i].growing) {
        aureolas[i].radius -= 5;
      }

      if (aureolas[i].radius >= 340) {
        aureolas.splice(i, 1); // Remove aureolas that exceed maximum size
      }
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
