import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Home } from './components/home/Home';
import { Foot } from './components/foot/Foot';
import Navbar from './components/navbar/Navbar';
import { Magazine } from './components/magazine/Magazine';
import i18n from '../src/components/navbar/i18n';

import Artists from './components/artist/Artists';
import Collection from './components/collection/Collection';
import ApplyForm from './components/apply/Apply';
import CreateArtWork from './components/collection/CreateArtWork';
import { ArtistDetail } from './components/artist/ArtistDetail';
import Artwork from './components/collection/Artwork';

import Register from './components/user/Register';
import CreateSketch from './components/sketch/list/CreateSketch.js';

import StarsComponent from './components/sketch/audio/StarsComponent.js'
import VideoList from './components/movie/VideoList';
import Movie from './components/movie/Movie';
import MovieForm from './components/movie/MovieForm';

import DrawComponent from './components/sketch/draw/DrawComponent';
import DrawImagesComponent from './components/sketch/draw/DrawImagesComponent';
import AudioVisualizerComponent from './components/sketch/audio/AudioVisualizerComponent.js';
import DrawCirculesComponent from './components/sketch/draw/DrawCirculesComponent';
import SketchList from './components/sketch/list/SketchList.js';
import ParticleComponent from './components/sketch/audio/ParticleComponent.js';

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <div className="App">
          <div className='headerParent'>
            <Router>
              <Navbar />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/AudioVisualizer' element={<AudioVisualizerComponent />} />
                <Route path='/SphereImage' element={<DrawCirculesComponent />} />
                <Route path='/magazine' element={<Magazine />} />
                <Route path='/artists' element={<Artists />} />
                <Route path='/artist/:id' element={<ArtistDetail />} />
                <Route path='/collection' element={<Collection />} />
                <Route path='/artwork/:id' element={<Artwork />} />
                <Route path='/apply' element={<ApplyForm />} />
                <Route path='/createArt' element={<CreateArtWork />} />
                <Route path='/DrawShapes' element={<DrawComponent />} />
                <Route path='/DrawImages' element={<DrawImagesComponent />} />
                <Route path='/movies' element={<VideoList />} />
                <Route path='/movieForm' element={<MovieForm />} />
                <Route path='/movie/:id' element={<Movie />} />
                <Route path='createSketch' element={<CreateSketch />} />
                <Route path='SketchList' element={<SketchList />} />
                <Route path='Stars' element={<StarsComponent />} />
                <Route path='AudioParticles' element={<ParticleComponent />} />
              </Routes>
            </Router>
          </div>
        </div>

        <Foot />
      </I18nextProvider>
    </>
  );
}

export default App;
