import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistDetails } from '../../services/artistsAPI.js'; // Asegúrate de importar el método correcto
import './ArtistDetail.css';
import Sketch from '../sketch/Sketch.js';

const ArtistDetail = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const { id } = useParams(); // Obtiene el ID del artista de la URL

  const loadArtistDetails = async (artistId) => {
    try {
      const artistData = await getArtistDetails(artistId);
      setSelectedArtist(artistData);
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
    <>
    <div className='artistDetailContainer'>
      <div className='detailsContainer'>
        <div className='descriptionContainer'>
          <h1 className='artistName'>{selectedArtist.Name}</h1>
          <p className='artistDescription'>{selectedArtist.ArtistDescription}</p>
        </div>
        <div className='containerImage'>
          <img src={selectedArtist.Image} className="product1" alt={selectedArtist.Name} />
        </div>
      </div>
    </div>

   <Sketch />


    </>
  );
};

export { ArtistDetail };
