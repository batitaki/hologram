import React from 'react';
import Artists from '../components/artist/Artists';
import  ArtistDetail  from '../components/artist/ArtistDetail';

const ArtistRoutes = [
  { path: '/artists', element: <Artists /> },
  { path: '/artist/:id', element: <ArtistDetail /> },
];

export default ArtistRoutes;
