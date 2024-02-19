import React, { useState, useEffect } from 'react';
import './IAstyles.css';
import * as tf from '@tensorflow/tfjs';

const IAimages = () => {
  const [prediction, setPrediction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function initializeModel() {
      try {
        // Verificar si WebGL está disponible y configurar el backend en consecuencia
        if (tf.getBackend() === 'webgl') {
          console.log('Using WebGL backend');
        } else {
          console.log('Using CPU backend');
        }

        // Define un modelo secuencial
        const model = tf.sequential();

        // Agrega una capa densa con una sola unidad
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

        // Compila el modelo con un optimizador y una función de pérdida
        model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

        // Genera datos de entrenamiento aleatorios
        const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
        const ys = tf.tensor2d([2, 4, 6, 8], [4, 1]);

        // Entrena el modelo con los datos de entrenamiento
        await model.fit(xs, ys, { epochs: 100 });

        // Evalúa el modelo
        const result = model.predict(tf.tensor2d([5], [1, 1])).dataSync()[0];
        console.log('Prediction:', result);
      } catch (error) {
        console.error('Error initializing model:', error);
      }
    }

    initializeModel();

    // Limpiar los recursos cuando el componente se desmonte
    return () => {
      tf.disposeVariables();
    };
  }, []);
  const handleSearch = async () => {
    try {
      const apiKey = 'UBY0Kz6IFJA3fuqc374tGGu4A9uodS7F9uT3PFwWOXuRz0YuabbOtFoM';
  
      // Dividir la cadena de búsqueda en palabras clave individuales
      const searchTerms = searchTerm.split(',');
  
      let allImages = [];
  
      // Iterar sobre cada palabra clave y realizar la búsqueda
      for (let term of searchTerms) {
        const imageUrl = `https://api.pexels.com/v1/search?query=${term.trim()}&per_page=10`;
  
        const response = await fetch(imageUrl, {
          headers: {
            Authorization: apiKey
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
  
        // Agregar las imágenes encontradas a la lista de imágenes
        if (data.photos && data.photos.length > 0) {
          allImages = [...allImages, ...data.photos.map(photo => photo.src.large)];
        }
      }
  
      // Actualizar el estado con todas las imágenes encontradas
      setPrediction(allImages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className='iaStyles'>
      <h1>Simple Model Component</h1>
      <p>Verifica la consola para ver la predicción del modelo.</p>

      {/* Input para ingresar la palabra de búsqueda */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Ingresa una palabra para buscar una imagen"
      />
      {/* Botón para activar la búsqueda */}
      <button onClick={handleSearch}>Buscar Imagen</button>

      {/* Mostrar la imagen si hay una predicción */}
      {prediction && (
        <div>
          <h2>Imagen Relacionada</h2>
          <img src={prediction} alt="Imagen Relacionada" />
        </div>
      )}
    </div>
  );
};

export default IAimages; 