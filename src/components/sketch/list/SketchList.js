import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSketchData } from '../../../services/fetchSketch';
import './SketchList.css';

const SketchList = () => {
  const [sketches, setSketches] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSketchData();
      setSketches(data);
      setLoading(false); // Cuando los datos se cargan, establece loading como falso
    };

    fetchData();
  }, []);

  return (
    <div className='sketchListContainer'>
      <h2 className='titleSketch'>SKETCHES</h2>
      {loading ? ( // Verifica si está cargando, si es así, muestra el indicador de carga
        <div className="loading">Loading...</div>
      ) : (
        <ul className='sketchList'>
          {sketches.map(sketch => (
            <li key={sketch.ID}>
              <Link to={`/${sketch.FilePath}`} style={{ textDecoration: 'none', color: '#27343a' }}>
                <h3 className='titleSketch'>{sketch.Title}</h3>
                <img className='sketchImage' src={sketch.Image} alt={sketch.Title} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
 
export default SketchList;
