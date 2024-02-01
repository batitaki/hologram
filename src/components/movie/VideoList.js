import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../../services/movieAPI';
import './VideoList.css'

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetchMovies();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error.message);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
    <div className='video-list-container'>
      <h1 className='view-title'>MOVIES</h1>
      <div className='video-list'>
        {videos.map(video => (
          <Link to={`/movie/${video.ID}`} key={video.ID} className='video-item-link'>
            <div className='video-item'>
              <video className='video-pic' >
                <source src={video.VideoFile} type="video/mp4" />
              </video>
              <p className='video-list-title'>{video.Title}</p>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </>
  );
};

export default VideoList;