import React from 'react';
import VideoList from '../components/collection/movie/VideoList'; 
import MovieForm from '../components/collection/movie/MovieForm';
import Movie from '../components/collection/movie/Movie'; 

const VideoRoutes = [
  { path: '/movies', element: <VideoList /> },
  { path: '/movieForm', element: <MovieForm /> },
  { path: '/movie/:id', element: <Movie /> },
];

export default VideoRoutes;
