import React from 'react';
import  Collection  from '../components/collection/artworks/ArtworkCollection';
import  Artwork  from '../components/collection/artworks/Artwork';
import ApplyForm from '../components/artist/apply/Apply';
import CreateArtWork from '../components/collection/artworks/CreateArtWork';
import  Magazine  from '../components/collection/magazine/Magazine';

const CollectionRoutes = [
  { path: '/collection', element: <Collection /> },
  { path: '/artwork/:id', element: <Artwork /> },
  { path: '/apply', element: <ApplyForm /> },
  { path: '/createArt', element: <CreateArtWork /> },
  { path: '/magazine', element: <Magazine /> },
];

export default CollectionRoutes;
