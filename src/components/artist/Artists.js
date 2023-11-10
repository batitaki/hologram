import React, { useState, useEffect } from 'react';
import './Artists.css'; // Importa tu archivo CSS

const Artists = () => {
   const [artistas, setArtistas] = useState([]);

   useEffect(() => {
    const getArtist = async () => { 
        try {
            const answer = await fetch ('http://localhost:3002/artistas/artistas');
            const data = await answer.json();
            setArtistas(data);
            console.log(data);
        } catch (error) {
            console.error('Error getting artists');
        }
    };

    getArtist();
  }, []);

  return (
    <main>
      <div className="buscador mt-5 mx-auto text-center">
        <h1 className="titulo">ARTISTS</h1>
        <br/>
   
      </div>
      
      <div className="artistas-contenedor">
        {artistas.map((artista) => (
          <article className="artista" key={artista.ID}>
            <div className="imagen">
              <a href={`/artistas/detalleArtista/${artista.ID}`}>
                <img src={artista.Imagen} className="product1" alt={artista.Nombre} />
              </a>
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

