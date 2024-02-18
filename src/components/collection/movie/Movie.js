import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../../services/movieAPI';
import './Movie.css';

const Movie = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [movieDetails, setMovieDetails] = useState(null);
  const [artistName, setArtistName] = useState('');

  useEffect(() => {
    const fetchMovieData = async () => {    
      try {
        const data = await fetchMovieDetails(id);
        setMovieDetails(data);
        setArtistName(data.Artist ? data.Artist.name : '');
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    
    fetchMovieData();
  }, [id]);

  if (!movieDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className='movie-container'>
      <div className='video-container'>
      <li key={movieDetails.ID}>
        <video width="420" height="340" controls>
          <source src={movieDetails.VideoFile} type="video/mp4" />
        </video>
      </li>
      </div>
     <div className='movie-details-container'>
      <h2 className='movie-title'>{movieDetails.Title}</h2>
      <p className='movie-description'>{movieDetails.Description}</p>
      <p className='movie-description'>{t('Duration')}: {movieDetails.Duration}</p>
      <p className='movie-description'>{t('Director')}: {movieDetails.Director}</p>
      <p className='movie-description'>{t('Artist')}: {artistName}</p>
      </div>
    </div>
  );
};

export default Movie;
