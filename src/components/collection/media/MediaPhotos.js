import React, { useState, useEffect } from 'react';
import { fetchMedia } from '../../../services/mediaAPI';
import './MediaPhotos.css'

const MediaPhotos = () => {
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

  return (
    <div className="media-container">
      <div className="photos">
          <div className="columns-photos-container">
        {media &&
          Array.from({ length: Math.ceil(media.length / 3) }).map((_, columnIndex) => (
            <div className="column-photo" key={columnIndex}>
              {media
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
    </div>
  );
};

export default MediaPhotos;
