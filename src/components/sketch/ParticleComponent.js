import React, { useState } from "react";
import Sketch from "react-p5";

const ParticleComponent = () => {
  const [isMouseOverCanvas, setIsMouseOverCanvas] = useState(false);
  const [drawingInProgress, setDrawingInProgress] = useState(false);
  const [drawnSnowflakes, setDrawnSnowflakes] = useState([]);
  const currentSnowflakes = [];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1024, 768).parent(canvasParentRef);
    p5.frameRate(60);
  };

  const draw = (p5) => {
    p5.background(0);

    // Verifica si el mouse está sobre el canvas
    setIsMouseOverCanvas(
      p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height
    );

    // Si el mouse está presionado y sobre el canvas, agrega un "grano de nieve" al conjunto actual
    if (p5.mouseIsPressed && isMouseOverCanvas) {
      const snowflake = {
        x: p5.mouseX,
        y: p5.mouseY,
        size: p5.random(2, 8),
      };
      currentSnowflakes.push(snowflake);
      setDrawingInProgress(true);
    } else if (drawingInProgress) {
      // Si el mouse se ha soltado y estábamos dibujando, guarda el conjunto actual en drawnSnowflakes
      setDrawnSnowflakes([...drawnSnowflakes, ...currentSnowflakes]);
      currentSnowflakes.length = 0; // Limpia el conjunto actual
      setDrawingInProgress(false);
    }

    // Dibuja todos los "granos de nieve" de drawnSnowflakes
    for (const snowflake of drawnSnowflakes) {
      p5.fill(255);
      p5.ellipse(snowflake.x, snowflake.y, snowflake.size, snowflake.size);
    }

    // Dibuja los "granos de nieve" del conjunto actual mientras el mouse está siendo arrastrado
    for (const snowflake of currentSnowflakes) {
      p5.fill(255);
      p5.ellipse(snowflake.x, snowflake.y, snowflake.size, snowflake.size);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default ParticleComponent;
