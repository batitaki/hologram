import React, { useState, useEffect } from 'react';
import './VideoList.css'

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
    <div>
      <ul className='list'>
        {videos.map(video => (
          <li key={video.ID}>
            <h1 className='view-title'>MOVIES</h1>
            <video width="420" height="340" controls>
              <source src={video.VideoFile} type="video/mp4" />
            </video>
            <p className='title'>{video.Title} - {video.Description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
