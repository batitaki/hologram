import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollection } from '../../../services/collectionAPI';  
import './Collection.css';

const Collection = ({ artistArtworks }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const fetchedArtworks = artistArtworks ? artistArtworks : await getCollection();
        setArtworks(fetchedArtworks);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching artworks', error);
      }
    };

    fetchArtworks();
  }, [artistArtworks]);

  return (
    <>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="collection-container">
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
        </div>
      )}
    </>
  );
};

export default Collection;
