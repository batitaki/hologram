import React, { useState } from 'react';
import Sketch from 'react-p5';


const ShapeSketch = () => {
  const [userInput, setUserInput] = useState(''); // Estado para almacenar la entrada del usuario
  const [shapes, setShapes] = useState([]); // Estado para almacenar las formas dibujadas
  const [deformation, setDeformation] = useState(0); // Estado para el parámetro de deformación
  const [movement, setMovement] = useState(0); // Estado para el parámetro de movimiento

  // Función de configuración de p5.js
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.background(0, 0, 255); // Establecer el fondo del lienzo como azul
  };

  // Función de dibujo de p5.js
  const draw = (p5) => {
    p5.background(0, 0, 255); // Limpiar el fondo en cada cuadro
  
    shapes.forEach(shape => {
        p5.stroke(255); // Establecer el color del trazo en blanco
        p5.strokeWeight(2); // Establecer el grosor del trazo
    
        const [command, ...params] = shape.split(' ');
        if (command === 'ellipse' && params.length === 4) {
            const [x, y, w, h] = params.map(Number);
            const deformX = deformation !== 0 ? p5.random(-20, 20) : 0;
            const deformY = deformation !== 0 ? p5.random(-20, 20) : 0;
            const deformW = deformation !== 0 ? p5.random(-20, 20) + w : w;
            const deformH = deformation !== 0 ? p5.random(-20, 20) + h : h;
            const moveX = movement !== 0 ? movement : 0;
            const moveY = movement !== 0 ? movement : 0;
            p5.ellipse(x + moveX, y + moveY, deformW, deformH);
        } else if (command === 'line' && params.length === 4) {
            const [x1, y1, x2, y2] = params.map(Number);
            const deformX1 = deformation !== 0 ? p5.random(-20, 20) : 0;
            const deformY1 = deformation !== 0 ? p5.random(-20, 20) : 0;
            const deformX2 = deformation !== 0 ? p5.random(-20, 20) : 0;
            const deformY2 = deformation !== 0 ? p5.random(-20, 20) : 0;
            p5.line(x1 + deformX1, y1 + deformY1, x2 + deformX2, y2 + deformY2);
        } else if (command === 'rect' && params.length === 4) {
            const [x, y, w, h] = params.map(Number);
            const deformX = deformation !== 0 ? p5.random(-20, 20) : 0;
            const deformY = deformation !== 0 ? p5.random(-20, 20) : 0;
            const deformW = deformation !== 0 ? p5.random(-20, 20) + w : w;
            const deformH = deformation !== 0 ? p5.random(-20, 20) + h : h;
            p5.rect(x + deformX, y + deformY, deformW, deformH);
        } else if (command === 'triangle' && params.length === 6) {
            const [x1, y1, x2, y2, x3, y3] = params.map(Number);
            const deformX1 = deformation !== 0 ? p5.random(-20, 20) : 0;
            const deformY1 = deformation !== 0 ? p5.random(-20, 20) : 0;
            const deformX2 = deformation !== 0 ? p5.random(-20, 20) : 0;
            const deformY2 = deformation !== 0 ? p5.random(-20, 20) : 0;
            const deformX3 = deformation !== 0 ? p5.random(-20, 20) : 0;
            const deformY3 = deformation !== 0 ? p5.random(-20, 20) : 0;
            p5.triangle(
                x1 + deformX1, y1 + deformY1,
                x2 + deformX2, y2 + deformY2,
                x3 + deformX3, y3 + deformY3
            );
        } else if (command === 'arc' && params.length === 6) {
            const [x, y, w, h, start, stop] = params.map(Number);
            const deformedW = deformation !== 0 ? w + p5.random(-20, 20) : w;
            const deformedH = deformation !== 0 ? h + p5.random(-20, 20) : h;
            p5.arc(x, y, deformedW, deformedH, start, stop);
        } else if (command === 'quad' && params.length === 8) {
            const [x1, y1, x2, y2, x3, y3, x4, y4] = params.map(Number);
            p5.quad(
                x1, y1,
                x2, y2,
                x3, y3,
                x4, y4
            );
        } else if (command === 'point' && params.length === 2) {
            const [x, y] = params.map(Number);
            p5.point(x, y);
        }
    });
};

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    setShapes(prevShapes => [...prevShapes, userInput]); // Agregar el nuevo comando a la lista de formas
    setUserInput(''); // Limpiar el campo de entrada
  };

  // Manejar cambios en el parámetro de deformación
  const handleDeformationChange = (event) => {
    setDeformation(Number(event.target.value));
  };

  // Manejar cambios en el parámetro de movimiento
  const handleMovementChange = (event) => {
    setMovement(Number(event.target.value));
  };

  return (
    <div >
      <h1>Simple Model Component</h1>
      <p>Ingrese los comandos de p5.js:</p>
      <ul>
        <li>Para dibujar una elipse: 'ellipse 100 100 50 80' (x, y, ancho, alto)</li>
        <li>Para dibujar una línea: 'line 50 50 200 200' (x1, y1, x2, y2)</li>
        <li>Para dibujar un rectángulo: 'rect 50 50 100 80' (x, y, ancho, alto)</li>
        <li>Para dibujar un triángulo: 'triangle 50 50 100 100 150 50' (x1, y1, x2, y2, x3, y3)</li>
        <li>Para dibujar un arco: 'arc 50 50 100 100 0 3.14' (x, y, ancho, alto, ánguloInicial, ánguloFinal)</li>
        <li>Para dibujar un cuadrilátero: 'quad 50 50 150 50 200 150 100 200' (x1, y1, x2, y2, x3, y3, x4, y4)</li>
        <li>Para dibujar un punto: 'point 50 50' (x, y)</li>
      </ul>
      <p>Ingrese un valor para la deformación: </p>
  
      {/* Formulario para ingresar los comandos de p5.js */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Ingrese los comandos de p5.js"
        />
        <button type="submit">Agregar Comando</button>
      </form>
  
      {/* Input para el parámetro de movimiento */}
      <label>
        Movimiento:
        <input
          type="number"
          value={movement}
          onChange={handleMovementChange}
        />
      </label>
  
      {/* Input para el parámetro de deformación */}
      <label>
        Deformación:
        <input
          type="number"
          value={deformation}
          onChange={handleDeformationChange}
        />
      </label>
  
      {/* Componente Sketch de p5.js */}
      <Sketch setup={setup} draw={draw} />
    </div>
  );
  
  
};

export default ShapeSketch;
