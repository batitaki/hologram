import React, { useEffect, useState } from 'react';
import { getCollection } from '../../services/collectionAPI';
import './Collection.css'; // Asegúrate de importar tu archivo CSS aquí

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
    <div className="collection-container">
      <h1 className='title'>Art Collection</h1>
      <div className="artworks">
        {artCollection.map((artwork) => (
          <div className='artwork' key={artwork.id}>
            <h2 className='work-title'>{artwork.Titulo}</h2>
            <p className='description'>{artwork.Descripcion}</p>
            <img className='artwork-image' src={artwork.Imagen} alt={artwork.Titulo} />
            <p className='price'>Price: {artwork.Precio}</p>
            {/* Otros detalles para mostrar */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
