import React, { useState, useEffect } from 'react';
import './Artists.css'; // Importa tu archivo CSS
import { Link } from 'react-router-dom';
import { getArtists } from '../../services/artistsAPI.js';

const Artists = () => {
  const [artistas, setArtistas] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const data = await getArtists();
      setArtistas(data);
    };

    fetchArtists();
  }, []);

  return (
    <main>
      <div className="buscador mt-5 mx-auto text-center">
        <h1 className="titulo">ARTISTS</h1>
        <br />
      </div>

      <div className="artistas-contenedor">
        {artistas.map((artista) => (
          <article className="artista" key={artista.ID}>
            <div className="imagen">
            <Link to={`/artist/${artista.ID}`} key={artista.ID}>
                <img src={artista.Imagen} className="product1" alt={artista.Nombre} />
              </Link>
              <div className="linea"></div>
              <div className="detalle">
                <p className="nombre">{artista.Nombre}</p>
                <p className="nombre">{artista.DescripcionArtista}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Artists;
