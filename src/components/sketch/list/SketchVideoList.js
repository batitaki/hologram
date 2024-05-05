import React from 'react';
import { Link } from 'react-router-dom'; 
import './SketchList.css'

import drawImagesVideo from "../../../assets/print-images-video-crop.mp4"
import soloBrillabaSketchVideo from "../../../assets/solo-brillaba-crop.mp4"
import audioParticlesSketchVideo from "../../../assets/fluid-sketch.mp4"
import sphereImageVideo from "../../../assets/sphere-images.mp4"
import drawShapes from "../../../assets/drawing-shapes.mp4"
import audioPatch from "../../../assets/audio-patch.mp4"

const SketchVideoList = () => {
  // Array de videos
  const videos = [
    { id: 1, src: drawImagesVideo, title: 'PRINT IMAGES', path: 'DrawImagesSketch' },
    { id: 2, src: soloBrillabaSketchVideo, title: 'SOLO BRILLABA', path: 'AudioParticlesSketch' },
    { id: 3, src: audioPatch , title: 'AUDIO & IMAGES PATCH', path: 'AudioVisualizerSketch'},
    { id: 4, src: drawShapes, title: 'DRAW SHAPE', path: 'DrawShapesSketch' },
    { id: 5, src: audioParticlesSketchVideo, title: 'FLUID SKETCH', path: 'AudioParticlesSketch' },
    { id: 6, src: sphereImageVideo, title: 'SPHERE IMAGES', path: 'SphereImagesSketch' },
  ];

  return (
    <div className="sketch-video-list">
      <h4 className='sketch-video-list-title'> INTERACTIVE SKETCHES </h4>
      {videos.map(video => (
        <div key={video.id} className="sketch-video-container">
          <Link to={`/${video.path}`}>
            <video src={video.src} autoPlay loop muted />
          </Link>
          <div className="video-title">{video.title}</div>
        </div>
      ))}
    </div>
  );
  
}

export default SketchVideoList;
