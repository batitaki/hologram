import React, { useState, useEffect } from 'react';
import './Artists.css'; 
import { Link } from 'react-router-dom';
import { getArtists } from '../../services/artistsAPI.js';
import { useTranslation } from "react-i18next";

const Artists = () => {
  const { t } = useTranslation();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtists();
        setArtists(data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching artists', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <main>
      <div className="buscador mt-5 mx-auto text-center">
        <h1 className="title">{t("artists")}</h1>
        <br />
      </div>

      {loading ? ( 
        <div className="loading">Loading...</div>
      ) : (
        <div className="artists-container">
          {artists.map((artist) => (
            <article className="artist" key={artist.ID}>
              <div className="image">
                <Link to={`/artist/${artist.ID}`} key={artist.ID}>
                  <img src={artist.Image} alt={artist.Name} />
                </Link>
                <div className="line"></div>
                <div className="detail">
                  <p className="name">{artist.Name}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Artists;
