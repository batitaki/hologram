import React, { useState } from 'react';
import Sketch from 'react-p5';
import './IAstyles.css';

const ShapeSketch= () => {
  const [userInput, setUserInput] = useState(''); // Estado para almacenar la entrada del usuario
  const [shapes, setShapes] = useState([]); // Estado para almacenar las formas dibujadas

  // Función de configuración de p5.js
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.background(0, 0, 255); // Establecer el fondo del lienzo como azul
  };

  // Función de dibujo de p5.js
  const draw = (p5) => {
    p5.background(0, 0, 255); // Limpiar el fondo en cada cuadro
  
    // Dibujar las formas almacenadas
    shapes.forEach(shape => {
      p5.stroke(255); // Establecer el color del trazo en blanco
      p5.strokeWeight(2); // Establecer el grosor del trazo
  
      const [command, ...params] = shape.split(' ');
      if (command === 'ellipse' && params.length === 4) {
        p5.ellipse(...params.map(Number));
      } else if (command === 'line' && params.length === 4) {
        p5.line(...params.map(Number));
      } else if (command === 'triangle' && params.length === 6) {
        p5.triangle(...params.map(Number));
      } else if (command === 'rect' && params.length === 4) {
        p5.rect(...params.map(Number));
      } else if (command === 'point' && params.length === 2) {
        p5.point(...params.map(Number));
      } else if (command === 'arc' && params.length === 6) {
        p5.arc(...params.map(Number));
      } else if (command === 'quad' && params.length === 8) {
        p5.quad(...params.map(Number));
      }
      // Puedes agregar más formas aquí si lo deseas
    });
  };
  // Manejar cambios en la entrada del usuario
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    setShapes(prevShapes => [...prevShapes, userInput]); // Agregar el nuevo comando a la lista de formas
    setUserInput(''); // Limpiar el campo de entrada
  };

  return (
    <div className='iaStyles'>
      <h1>Simple Model Component</h1>
      <p>Ingrese los comandos de p5.js: 'ellipse x y width height'</p>

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

      {/* Componente Sketch de p5.js */}
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default ShapeSketch;
