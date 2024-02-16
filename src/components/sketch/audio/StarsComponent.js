import React, { useState } from 'react';
import Sketch from 'react-p5';
import { ChromePicker } from 'react-color'; 

const DrawStarsComponent = () => {
  const [starColor, setStarColor] = useState('#FFFFFF');
  const [particles, ] = useState([]);
  const [targetX, setTargetX] = useState(null);
  const [targetY, setTargetY] = useState(null);

  const numParticles = 200;
  const particleSpeed = 1;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1200, 1000).parent(canvasParentRef);
    p5.background(0, 0, 255);

    // Genera las posiciones de las partículas
    for (let i = 0; i < numParticles; i++) {
      const x = p5.random(p5.width);
      const y = p5.random(p5.height);
      const dx = p5.random(-particleSpeed, particleSpeed);
      const dy = p5.random(-particleSpeed, particleSpeed);
      particles.push({ x, y, dx, dy });
    }
  };

  const draw = (p5) => {
    p5.clear();
    p5.background(0, 0, 255);
    
    // Dibuja las partículas y las actualiza
    for (let i = 0; i < particles.length; i++) {
      let { x, y, dx, dy } = particles[i];

      // Mueve la partícula
      if (targetX !== null && targetY !== null) {
        const distance = p5.dist(x, y, targetX, targetY);
        if (distance > 1) { // Evitar la división por cero
          const directionX = (targetX - x) / distance;
          const directionY = (targetY - y) / distance;
          x += directionX;
          y += directionY;
        }
      } else {
        x += dx;
        y += dy;

        // Rebote en los bordes del lienzo
        if (x < 0 || x > p5.width) dx *= -1;
        if (y < 0 || y > p5.height) dy *= -1;
      }

      // Dibuja la partícula
      p5.fill(starColor);
      p5.noStroke();
      p5.circle(x, y, 6);

      // Actualiza la posición de la partícula
      particles[i] = { x, y, dx, dy };
    }
  };

  const handleColorChange = (color) => {
    setStarColor(color.hex);
  };

  const handleMousePress = (p5) => {
    setTargetX(p5.mouseX);
    setTargetY(p5.mouseY);
  };

  const handleMouseRelease = () => {
    setTargetX(null);
    setTargetY(null);
  };

  return (
    <div>
      <div className='color-buttons'>
        <ChromePicker color={starColor} onChangeComplete={(color) => handleColorChange(color)} />
      </div>
      <Sketch
        className="fluid"
        setup={setup}
        draw={draw}
        mousePressed={handleMousePress}
        mouseReleased={handleMouseRelease}
      />
    </div>
  );
};

export default DrawStarsComponent;
