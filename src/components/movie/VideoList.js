import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './VideoList.css';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3002/movies/movies');
        if (!response.ok) {
          throw new Error(`Error ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error.message);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <h1 className='view-title'>MOVIES</h1>
      <div className='video-list'>
        {videos.map(video => (
          <Link to={`/movie/${video.ID}`} key={video.ID} className='video-item-link'>
            <div className='video-item'>
              <video width="260" height="180" controls>
                <source src={video.VideoFile} type="video/mp4" />
              </video>
              <p className='video-list-title'>{video.Title}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default VideoList;
