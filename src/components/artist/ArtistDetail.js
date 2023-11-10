import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ArtistDetail = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const { id } = useParams(); // Obtiene el ID del artista de la URL

  const loadArtistDetails = async (artistId) => {
    try {
      const response = await fetch(`http://localhost:3002/artistas/detalleArtista/${artistId}`);
      if (response.ok) {
        const artistData = await response.json();
        setSelectedArtist(artistData);
      } else {
        console.error('Error fetching artist details');
      }
    } catch (error) {
      console.error('Error fetching artist details', error);
    }
  };

  useEffect(() => {
    if (id) {
      loadArtistDetails(id);
    }
  }, [id]);

  if (!selectedArtist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{selectedArtist.Nombre}</h1>
      <p>{selectedArtist.DescripcionArtista}</p>
      <img src={selectedArtist.Imagen} className="product1" alt={selectedArtist.Nombre} />
    </div>
  );
};

export { ArtistDetail };

