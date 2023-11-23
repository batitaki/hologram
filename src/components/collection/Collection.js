import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
      </>
);

};

export default Collection;