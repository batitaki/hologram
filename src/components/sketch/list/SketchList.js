import React, { useState, useEffect } from 'react';
import { fetchSketchData } from '../../../services/fetchSketch';

const SketchList = () => {
  const [sketches, setSketches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSketchData(); // Llama a la función para obtener los datos de los bocetos
      setSketches(data); // Actualiza el estado con los datos de los bocetos
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Sketches</h2>
      <ul>
        {sketches.map(sketch => (
          <li key={sketch.ID}>
            <h3>{sketch.Title}</h3>
            <p>Instructions: {sketch.Instructions}</p>
            <p>Description: {sketch.Description}</p>
            <img src={sketch.Image} alt={sketch.Title} />
            <p>Artist ID: {sketch.ArtistID}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SketchList;
