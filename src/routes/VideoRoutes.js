import React from 'react';
import VideoList from '../components/collection/movie/VideoList'; // Actualizar la ruta de VideoList
import MovieForm from '../components/collection/movie/MovieForm'; // Actualizar la ruta de MovieForm
import Movie from '../components/collection/movie/Movie'; 

const VideoRoutes = [
  { path: '/movies', element: <VideoList /> },
  { path: '/movieForm', element: <MovieForm /> },
  { path: '/movie/:id', element: <Movie /> },
];

export default VideoRoutes;
