import React, { useEffect, useState } from 'react';
import { useParams , Link } from 'react-router-dom';
import { getArtworkById } from '../../../services/collectionAPI';
import { getArtistDetails } from '../../../services/artistsAPI';
import {initLightboxJS} from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'
import {SlideshowLightbox} from 'lightbox.js-react'
import { useTranslation } from "react-i18next";
import 'lightbox.js-react/dist/index.css'
import './Artwork.css';

const Artwork = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [artworkDetails, setArtworkDetails] = useState(null);
  const [artistName, setArtistName] = useState('');

  useEffect(() => {
    initLightboxJS("Insert your License Key here", "Insert plan type here");
  }, []);

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
          <Link to={`/artist/${artworkDetails.ArtistID}`} className='artist-name'>{artistName}</Link>
      <div className='artworkImage'>
           <SlideshowLightbox className="container grid grid-cols-3 gap-2 mx-auto">
           <img
                  style={{ width: 'auto', height: '500px' }}
                  className="w-full"
                  src={artworkDetails.Image}
                  alt={artworkDetails.Name}
                />
            </SlideshowLightbox> 
     </div>
          <br></br>
          </div>
          <div className='info'>
            <h1 className="title-art">{artworkDetails.Title}</h1>
            <p className='price'> {t("price")}  {artworkDetails.Price}USD</p>
            <p className='price'>  {artworkDetails.Description}</p>
            <p className='price'>  {artworkDetails.Materials}</p>
          </div>
        </div>
      ) : (
        <p className='loading'>LOADING...</p>
      )}
    </div>
  );
};

export default Artwork;
