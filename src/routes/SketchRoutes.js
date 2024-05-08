import React from 'react';
import StarsComponent from '../components/sketch/audio/StarsComponent.js';
import DrawComponent from '../components/sketch/draw/DrawComponent';
import DrawImagesSketch from '../components/sketch/draw/DrawImagesSketch.js';
import AudioVisualizerComponent from '../components/sketch/audio/AudioVisualizerComponent.js';
import DrawCirclesComponent from '../components/sketch/draw/DrawCirclesComponent';
import ParticleComponent from '../components/sketch/audio/ParticleComponent.js';
import FluidComponent from '../components/sketch/audio/FluidComponent.js';
import SketchVideoList from '../components/sketch/list/SketchVideoList.js';


const SketchRoutes = [
  { path: '/DrawShapesSketch', element: <DrawComponent /> },
  { path: '/DrawImagesSketch', element: <DrawImagesSketch /> },
  { path: '/StarsSketch', element: <StarsComponent /> },
  { path: '/AudioParticlesSketch', element: <ParticleComponent /> },
  { path: '/FluidSketch', element: <FluidComponent /> },
  { path: '/AudioVisualizerSketch', element: <AudioVisualizerComponent /> },
  { path: '/SphereImagesSketch', element: <DrawCirclesComponent /> }, 
  { path: '/SketchVideoList', element: <SketchVideoList /> }, 
];

export default SketchRoutes;
