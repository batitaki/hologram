import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import DrawImagesSketch from './components/sketch/draw/DrawImagesSketch.js';
import AudioVisualizerComponent from './components/sketch/audio/AudioVisualizerComponent.js';
import DrawCirclesComponent from './components/sketch/draw/DrawCirclesComponent';
import SketchList from './components/sketch/list/SketchList.js';
import ParticleComponent from './components/sketch/audio/ParticleComponent.js';
import Login from './components/user/Login.js';
import NavbarSketch from './components/sketch/home/NavbarSketch.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setUserData(null); // Limpiar los datos del usuario al cerrar sesión
  };

  useEffect(() => {
    if (isLoggedIn && userData) {
      console.log('Datos del usuario logueado:', userData);
    }
  }, [isLoggedIn, userData]);

  useEffect(() => {
    // Verifica si hay un token almacenado en localStorage al cargar la aplicación
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Establece el estado de isLoggedIn en true si hay un token
      // Aquí podrías recuperar información adicional del usuario si es necesario
      // setUserData(userData);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <div className='headerParent'>
          <Router>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
              <Route path='/AudioVisualizerSketch' element={<AudioVisualizerComponent />} />
              <Route path='/SphereImagesSketch' element={<DrawCirclesComponent />} />
              <Route path='/magazine' element={<Magazine />} />
              <Route path='/artists' element={<Artists />} />
              <Route path='/artist/:id' element={<ArtistDetail />} />
              <Route path='/collection' element={<Collection />} />
              <Route path='/artwork/:id' element={<Artwork />} />
              <Route path='/apply' element={<ApplyForm />} />
              <Route path='/createArt' element={<CreateArtWork />} />
              <Route path='/DrawShapes' element={<DrawComponent />} />
              <Route path='/DrawImagesSketch' element={<DrawImagesSketch />} />
              <Route path='/NavbarSketch' element={<NavbarSketch />} />
              <Route path='/movies' element={<VideoList />} />
              <Route path='/movieForm' element={<MovieForm />} />
              <Route path='/movie/:id' element={<Movie />} />
              <Route path='/createSketch' element={<CreateSketch />} />
              <Route path='/SketchList' element={isLoggedIn ? <SketchList /> : <Navigate to="/login" />} />
              <Route path='/StarsSketch' element={<StarsComponent />} />
              <Route path='/AudioParticlesSketch' element={<ParticleComponent />} />
              <Route path='/login' element={isLoggedIn ? <Navigate to="/" /> : <Login handleLogin={handleLogin} />}/>
            </Routes>
          </Router>
        </div>
      </div>
      <Foot />
    </I18nextProvider>
  );
}

export default App;
