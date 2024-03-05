import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistDetails } from '../../services/artistsAPI.js';
import { getArtworksByArtist } from '../../services/collectionAPI.js';
import './ArtistDetail.css';
import Collection from '../collection/artworks/ArtworkCollection.js';

const ArtistDetail = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const { id } = useParams();
  const [artistArtworks, setArtistArtworks] = useState([]);

  const loadArtistDetails = async (artistId) => {
    try {
      const artistData = await getArtistDetails(artistId);
      setSelectedArtist(artistData);
      
      const artworksData = await getArtworksByArtist(artistId);
      setArtistArtworks(artworksData);
    } catch (error) {
      console.error('Error fetching artist details', error);
    }
  };

  useEffect(() => {
    console.log('Fetching artist details and artworks...');
    if (id) {
      loadArtistDetails(id);
    }
  }, [id]);

  useEffect(() => {
    console.log('Artist artworks:', artistArtworks);
  }, [artistArtworks]);

  if (!selectedArtist) {
    return <div className='loading'>LOADING...</div>;
  }

  return (
    <>
      <div className='artistDetailContainer'>
        <div className='detailsContainer'>
          <div className='descriptionContainer'>
            <h1 className='artistName'>{selectedArtist.Name}</h1>
            <p className='artistDescription'>{selectedArtist.ArtistDescription}</p>
            {selectedArtist.User && (
              <div className='userData'>
                <p>Username: {selectedArtist.User.Username}</p>
                <p>Email: {selectedArtist.User.Email}</p>
              </div>
            )}
          </div>
          <div className='containerImage'>
            <img src={selectedArtist.Image} className="product1" alt={selectedArtist.Name} />
          </div>
        </div>
      </div>
      <div className='artistDetailContainer'>
        <Collection artistArtworks={artistArtworks} />
      </div>
    </>
  );
};

export default ArtistDetail;
