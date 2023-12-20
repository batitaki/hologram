import React, { useState } from "react";
import Sketch from "react-p5";
import './DrawComponent.css'

const DrawComponent = () => {
  const [isMouseOverCanvas, setIsMouseOverCanvas] = useState(false);
  const [drawingInProgress, setDrawingInProgress] = useState(false);
  const [drawnShapes, setDrawnShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState("ellipse");
  const [currentDrawing, setCurrentDrawing] = useState([]);
  

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(924, 668).parent(canvasParentRef);
    p5.frameRate(60);
  };

  const draw = (p5) => {
    p5.background(0);

    // Verifica si el mouse está sobre el canvas
    setIsMouseOverCanvas(
      p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height
    );

    // Si el mouse está presionado y sobre el canvas, agrega una forma al conjunto actual
    if (p5.mouseIsPressed && isMouseOverCanvas) {
      const shape = {
        type: currentShape,
        x: p5.mouseX,
        y: p5.mouseY,
        size: p5.random(2, 8),
      };
      setCurrentDrawing([...currentDrawing, shape]);
      setDrawingInProgress(true);
    } else if (drawingInProgress && !p5.mouseIsPressed) {
      // Si el mouse se ha soltado y estábamos dibujando, guarda la forma actual en drawnShapes
      setDrawnShapes([...drawnShapes, ...currentDrawing]);
      setCurrentDrawing([]); // Limpia la forma actual
      setDrawingInProgress(false);
    }

    // Dibuja todas las formas en drawnShapes
    for (const shape of drawnShapes) {
      p5.fill(255);
      if (shape.type === "ellipse") {
        p5.ellipse(shape.x, shape.y, shape.size, shape.size);
      } else if (shape.type === "line") {
        p5.stroke(255);
        p5.line(shape.x, shape.y, shape.endX, shape.endY);
      }
    }

    // Dibuja la forma actual mientras el mouse está siendo arrastrado
    for (const shape of currentDrawing) {
      p5.fill(255);
      if (shape.type === "ellipse") {
        p5.ellipse(shape.x, shape.y, shape.size, shape.size);
      } else if (shape.type === "line") {
        p5.stroke(255);
        p5.line(shape.x, shape.y, p5.mouseX, p5.mouseY);
      }
    }
  };

  const handleEllipseClick = () => {
    setCurrentShape("ellipse");
  };

  const handleLineClick = () => {
    setCurrentShape("line");
  };

  return (
    <div>
      <div className="sketch-buttons">
        <button onClick={handleEllipseClick}>Dibujar Elipse</button>
        <button onClick={handleLineClick}>Dibujar Línea</button>
      </div>
      <Sketch setup={setup} draw={draw} className="draw-container" />
    </div>
  );
};

export default DrawComponent;
