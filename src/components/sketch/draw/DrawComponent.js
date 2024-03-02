import React, { useState } from "react";
import Sketch from "react-p5";
import "./DrawComponent.css";

const DrawComponent = () => {
  const [isMouseOverCanvas, setIsMouseOverCanvas] = useState(false);
  const [drawnShapes ] = useState([]);
  const [currentShape, setCurrentShape] = useState("ellipse");
  const [currentDrawing, setCurrentDrawing] = useState([]);
  const [lineStart, setLineStart] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#242424");
  const [shapeColor, setShapeColor] = useState("#14DCEB"); 
  const [lineThickness, setLineThickness] = useState(1);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(724, 568).parent(canvasParentRef);
    p5.frameRate(60);
  };

  const draw = (p5) => {
    p5.background(backgroundColor);

    setIsMouseOverCanvas(
      p5.mouseX > 0 &&
      p5.mouseX < p5.width &&
      p5.mouseY > 0 &&
      p5.mouseY < p5.height
    );

    if (p5.mouseIsPressed && isMouseOverCanvas) {
      if (currentShape === "ellipse") {
        const ellipseShape = {
          type: "ellipse",
          x: p5.mouseX,
          y: p5.mouseY,
          size: 5,
          color: shapeColor,
        };
        setCurrentDrawing([...currentDrawing, ellipseShape]);
      } else if (currentShape === "line" && !lineStart) {
        setLineStart({ x: p5.mouseX, y: p5.mouseY });
      } else if (currentShape === "line" && lineStart) {
        const lineShape = {
          type: "line",
          startX: lineStart.x,
          startY: lineStart.y,
          endX: p5.mouseX,
          endY: p5.mouseY,
          color: shapeColor,
        };
        setCurrentDrawing([...currentDrawing, lineShape]);
      } else if (currentShape === "snowflake") {

        const snowflakeShape = {
          type: "snowflake",
          x: p5.mouseX,
          y: p5.mouseY,
          color: shapeColor,
        };
        setCurrentDrawing([...currentDrawing, snowflakeShape]);
      }
    }

    p5.strokeWeight(lineThickness);

    // Dibujar las líneas en drawnShapes
    for (const shapes of drawnShapes) {
      for (const shape of shapes) {
        p5.stroke(shape.color);
        if (shape.type === "ellipse") {
          p5.ellipse(shape.x, shape.y, shape.size, shape.size);
        } else if (shape.type === "line") {
          p5.line(shape.startX, shape.startY, shape.endX, shape.endY);
        } else if (shape.type === "snowflake") {

          p5.text("*", shape.x, shape.y);
        }
      }
    }

    for (const shape of currentDrawing) {
      p5.stroke(shape.color);
      if (shape.type === "ellipse") {
        p5.ellipse(shape.x, shape.y, shape.size, shape.size);
      } else if (shape.type === "line") {
        p5.line(shape.startX, shape.startY, shape.endX, shape.endY);
      } else if (shape.type === "snowflake") {

        p5.text("*", shape.x, shape.y);
      }
    }
  };

  const handleEllipseClick = () => {
    setCurrentShape("ellipse");
  };

  const handleLineClick = () => {
    setCurrentShape("line");
  };

  const handleSnowflakeClick = () => {
    setCurrentShape("snowflake");
  };

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleShapeColorChange = (event) => {
    setShapeColor(event.target.value);
  };

  const handleLineThicknessChange = (event) => {
    setLineThickness(parseInt(event.target.value));
  };

  return (
    <div>
      <div className="sketch-controls">
        <label htmlFor="backgroundColor">BACKGROUND COLOR</label>
        <input
          type="color"
          id="backgroundColor"
          value={backgroundColor}
          onChange={handleBackgroundColorChange}
        />
        <label htmlFor="shapeColor">SHAPE COLOR</label>
        <input
          type="color"
          id="shapeColor"
          value={shapeColor}
          onChange={handleShapeColorChange}
        />
        <label htmlFor="lineThickness">SIZE</label>
        <input
            className="lineThickness"
            type="range"
            id="lineThickness"
            min="1"
            max="10"
            value={lineThickness}
            onChange={handleLineThicknessChange}
            style={{
              backgroundColor: 'red',
              color: 'white', 
              border: '1px solid transparent', 
            }}
          />
      </div>
      <div className="sketch-buttons">
        <button onClick={handleEllipseClick}>DRAW CIRCULE</button>
        <button onClick={handleLineClick}>DRAW LINES</button>
        <button onClick={handleSnowflakeClick}>DRAW CIRCULES</button>
      </div>
      <Sketch setup={setup} draw={draw} className="draw-container" />
    </div>
  );
};

export default DrawComponent;
