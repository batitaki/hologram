import React from 'react';
import { Link } from 'react-router-dom'; // Asumiendo que estás utilizando React Router

const SketchVideoList = () => {
  // Array de videos
  const videos = [
    { id: 1, src: 'video1.mp4', title: 'Video 1' },
    { id: 2, src: 'video2.mp4', title: 'Video 2' },
    { id: 3, src: 'video3.mp4', title: 'Video 3' },
    { id: 4, src: 'video4.mp4', title: 'Video 4' },
    { id: 5, src: 'video5.mp4', title: 'Video 5' },
    { id: 6, src: 'video6.mp4', title: 'Video 6' }
  ];

  return (
    <div>
      {/* Mapea sobre el array de videos y renderiza un Link para cada uno */}
      {videos.map(video => (
        <div key={video.id}>
          <Link to={`/sketch/${video.id}`}>
            <video src={video.src} controls />
            <p>{video.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SketchVideoList;
