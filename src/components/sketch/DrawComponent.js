import React, { useState } from "react";
import Sketch from "react-p5";
import './DrawComponent.css'

const DrawComponent = () => {
  const [isMouseOverCanvas, setIsMouseOverCanvas] = useState(false);
  const [drawingInProgress, setDrawingInProgress] = useState(false);
  const [drawnShapes, setDrawnShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState("ellipse");
  const [currentDrawing, setCurrentDrawing] = useState([]);
  const [lineStart, setLineStart] = useState(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(924, 668).parent(canvasParentRef);
    p5.frameRate(60);
  };

  const draw = (p5) => {
    p5.background(0);

    setIsMouseOverCanvas(
      p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height
    );

    if (p5.mouseIsPressed && isMouseOverCanvas) {
      if (currentShape === "ellipse") {
        const ellipseShape = {
          type: "ellipse",
          x: p5.mouseX,
          y: p5.mouseY,
          size: 5, 
        };
        setCurrentDrawing([...currentDrawing, ellipseShape]);
        setDrawingInProgress(true);
      } else if (currentShape === "line" && !lineStart) {
        setLineStart({ x: p5.mouseX, y: p5.mouseY });
      }
    } else if (drawingInProgress && !p5.mouseIsPressed) {
      setDrawnShapes([...drawnShapes, ...currentDrawing]);
      setCurrentDrawing([]);
      setDrawingInProgress(false);
    }

    for (const shape of drawnShapes) {
      p5.fill(255);
      if (shape.type === "ellipse") {
        p5.ellipse(shape.x, shape.y, shape.size, shape.size);
      } else if (shape.type === "line") {
        p5.stroke(255);
        p5.line(shape.startX, shape.startY, shape.endX, shape.endY);
      }
    }

    for (const shape of currentDrawing) {
      p5.fill(255);
      if (shape.type === "ellipse") {
        p5.ellipse(shape.x, shape.y, shape.size, shape.size);
      } else if (shape.type === "line") {
        p5.stroke(255);
        p5.line(shape.startX, shape.startY, p5.mouseX, p5.mouseY);
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
