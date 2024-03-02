import React, { useState, useEffect } from 'react';
import { fetchMedia } from '../../../services/mediaAPI';
import './MediaPhotos.css';

function MediaPhotos({ userId }) {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMedia();
        setMedia(data);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchData();
  }, []);

  // Filtrar las fotos por el ID del usuario si se proporciona
  const filteredPhotos = userId ? media.filter(photo => photo.UserID === userId) : media;

  return (
    <div className="media-container">
      <div className="columns-photos-container">
        {Array.from({ length: Math.ceil(filteredPhotos.length / 3) }).map((_, columnIndex) => (
          <div className="column-photo" key={columnIndex}>
            {filteredPhotos
              .filter((_, index) => index % 3 === columnIndex)
              .map((photo) => (
                <div className="photo-container" key={photo.ID}>
                  <img className="photo-image" src={photo.Image} alt={`Photo ${photo.ID}`} />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaPhotos;
