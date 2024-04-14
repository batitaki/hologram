import React from 'react';
import CreateSketch from '../components/sketch/list/CreateSketch.js';
import StarsComponent from '../components/sketch/audio/StarsComponent.js';
import DrawComponent from '../components/sketch/draw/DrawComponent';
import DrawImagesSketch from '../components/sketch/draw/DrawImagesSketch.js';
import AudioVisualizerComponent from '../components/sketch/audio/AudioVisualizerComponent.js';
import DrawCirclesComponent from '../components/sketch/draw/DrawCirclesComponent';
import ParticleComponent from '../components/sketch/audio/ParticleComponent.js';
import ShapeSketch from '../components/collection/magazine/ShapeSketch.js';
import IAimages from '../components/collection/magazine/IAimages.js';
import SketchList from '../components/sketch/list/SketchList.js';
import FluidComponent from '../components/sketch/audio/FluidComponent.js';


const SketchRoutes = [
  { path: '/createSketch', element: <CreateSketch /> },
  { path: '/DrawShapesSketch', element: <DrawComponent /> },
  { path: '/DrawImagesSketch', element: <DrawImagesSketch /> },
  { path: '/StarsSketch', element: <StarsComponent /> },
  { path: '/AudioParticlesSketch', element: <ParticleComponent /> },
  { path: '/FluidSketch', element: <FluidComponent /> },
  { path: '/AudioVisualizerSketch', element: <AudioVisualizerComponent /> },
  { path: '/SphereImagesSketch', element: <DrawCirclesComponent /> }, 
  { path: '/ShapeSketch', element: <ShapeSketch /> }, 
  { path: '/IAimages', element: <IAimages /> }, 
  { path: '/SketchList', element: <SketchList /> }, 
];

export default SketchRoutes;
