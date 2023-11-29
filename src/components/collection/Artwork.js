import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtworkById } from '../../services/collectionAPI';
import { getArtistDetails } from '../../services/artistsAPI';
import './Artwork.css';

const Artwork = () => {
  const { id } = useParams();
  const [artworkDetails, setArtworkDetails] = useState(null);
  const [artistName, setArtistName] = useState('');

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        const artworkData = await getArtworkById(id);
        setArtworkDetails(artworkData);
        if (artworkData && artworkData.ArtistID) {
          const artistData = await getArtistDetails(artworkData.ArtistID);
          setArtistName(artistData ? artistData.Name : '');
        }
      } catch (error) {
        console.error('Error fetching artwork details', error);
      }
    };

    fetchArtworkDetails();
  }, [id]);

  return (
    <div>
      {artworkDetails ? (
        <div className="artworkContent">
          <div className='image-content'>
          <p className='artist-name'>{artistName}</p>
          <img src={artworkDetails.Image} className="artworkImage" alt={artworkDetails.Name} />
          <br></br>
          </div>
          <div className='info'>
            <h1 className="title-art">{artworkDetails.Title}</h1>
            <p className='price'> PRICE:  {artworkDetails.Price}USD</p>
            <p className='price'>  {artworkDetails.Description}</p>
            <p className='price'>  {artworkDetails.Materials}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Artwork;
