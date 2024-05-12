import React from 'react';
import VideoList from '../components/collection/media/movie/VideoList'; 
import Movie from '../components/collection/media/movie/Movie'; 

const VideoRoutes = [
  { path: '/movies', element: <VideoList /> },
  { path: '/movie/:id', element: <Movie /> },
];

export default VideoRoutes;
