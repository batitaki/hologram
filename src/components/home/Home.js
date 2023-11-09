import React, { useState, useEffect } from 'react';

function Home() {
  const [artistas, setArtistas] = useState([]);

  useEffect(() => {
    // Hacer una solicitud a la API de artistas al cargar el componente
    fetch('http:localhost:3002/artistas/artistas') // Reemplaza '/ruta-de-tu-api' con la ruta correcta a tu API
      .then((response) => response.json())
      .then((data) => {
        setArtistas(data);
      })
      .catch((error) => {
        console.error('Error al obtener artistas:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Artistas</h1>
      <ul>
        {artistas.map((artista) => (
          <li key={artista.id}>
            <p>Nombre: {artista.Nombre}</p>
            <p>Email: {artista.Email}</p>
            <p>Descripción: {artista.DescripcionArtista}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
