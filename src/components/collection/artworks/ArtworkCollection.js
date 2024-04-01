import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollection } from '../../../services/collectionAPI';  
import './Collection.css';

const Collection = ({ artistArtworks }) => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado isLoading para indicar si se está cargando

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const fetchedArtworks = artistArtworks ? artistArtworks : await getCollection();
        setArtworks(fetchedArtworks);
        setIsLoading(false); // Cuando la carga se complete, establece isLoading en false
      } catch (error) {
        console.error('Error fetching artworks', error);
        setIsLoading(false); // En caso de error, también establece isLoading en false
      }
    };

    fetchArtworks();
  }, [artistArtworks]);

  return (
    <>
      <div className="collection-container">
        {isLoading ? ( // Renderiza el indicador de carga si isLoading es true
          <div className="loading-container">
            <p className='loading'>Loading...</p>
          </div>
        ) : (
          <>
            <br></br>
            <h1 className="title">COLLECTION</h1>
            <br></br>
            <div className="artworks">
              <div className="columns-container">
                {artworks && Array.from({ length: Math.ceil(artworks.length / 3) }).map((_, columnIndex) => (
                  <div className="column" key={columnIndex}>
                    {artworks
                      .filter((_, index) => index % 3 === columnIndex)
                      .map((artwork) => (
                        <Link to={`/artwork/${artwork.ID}`} key={artwork.ID}>
                          <div className="artwork-container" key={artwork.id}>
                            <div className="artwork">
                              <img className="artwork-image" src={artwork.Image} alt={artwork.Title} />
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Collection;
