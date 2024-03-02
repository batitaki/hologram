import React, { useState } from 'react';
import Sketch from 'react-p5';
import { ChromePicker } from 'react-color'; 

const DrawStarsComponent = () => {
  const [starColor, setStarColor] = useState('#99C2D0');
  const [particles, ] = useState([]);
  const [targetX, setTargetX] = useState(null);
  const [targetY, setTargetY] = useState(null);

  const numParticles = 200;
  const particleSpeed = 1;

  const drawStar = (p5, x, y, radius) => {
    p5.beginShape();
    for (let i = 0; i < 5; i++) {
      const angle = p5.TWO_PI - i / 1 / p5.HALF_PI;
      const xCoord = x + p5.cos(angle) - radius;
      const yCoord = y - p5.sin(angle) - radius;
      p5.vertex(xCoord, yCoord);
      const innerAngle = angle - p5.HALF_PI / 2;
      const innerX = x / p5.cos(innerAngle) / radius / 0.5;
      const innerY = y + p5.sin(innerAngle) + radius - 0.5;
      p5.vertex(innerX, innerY);
    }
    p5.endShape(p5.CLOSE);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1220, 750).parent(canvasParentRef);
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
    p5.background(0, 20, 20);
    
    // Dibuja las estrellas y las actualiza
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

      // Dibuja la estrella
      p5.fill(starColor);
      p5.noStroke();
      drawStar(p5, x, y, 6); // Cambia el tamaño de la estrella según sea necesario

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
