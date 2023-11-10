import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './components/navbar/Navbar';
import Sketch from './components/sketch/Sketch';
import Artists  from './components/artist/Artists'
import { Home } from './components/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div className="App">
      <div className='headerParent'>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sketch' element={<Sketch />} />
            <Route path='/artist' element={<Artists />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

