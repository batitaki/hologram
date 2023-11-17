import React, { useEffect, useState } from 'react';
import { getCollection } from '../../services/collectionAPI';
import './Collection.css'; 

const Collection = () => {
  const [artCollection, setArtCollection] = useState([]);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const data = await getCollection();
        setArtCollection(data);
      } catch (error) {
        console.error('Error fetching collection', error);
      }
    };
    fetchCollection();
  }, []);

  return (
      <>
        <div className="collection-container">
          <br></br>
          <h1 className="title">COLLECTION</h1>
          <br></br>
          <div className="artworks">
            <div className="columns-container">
              {Array.from({ length: Math.ceil(artCollection.length / 3) }).map((_, columnIndex) => (
                <div className="column" key={columnIndex}>
                  {artCollection
                    .filter((_, index) => index % 3 === columnIndex)
                    .map((artwork) => (
                      <div className="artwork-container" key={artwork.id}>
                        <div className="artwork">
                          <img className="artwork-image" src={artwork.Imagen} alt={artwork.Titulo} />
                          <h2 className="work-title">{artwork.Titulo}</h2>
                          <p className="description">{artwork.Descripcion}</p>
                        </div>
                      </div>
                    ))}
                </div>
                
              ))}
            </div>
          </div>
        </div>
      </>
);

};

export default Collection;
