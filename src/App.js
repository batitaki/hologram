// App.js
import React from 'react';
import Navbar from './components/navbar/Navbar';
import Sketch from './components/sketch/Sketch';


import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div className="App">
      <div className='headerParent'>
        <Navbar />
        <Sketch />
      </div>
    </div>
  );
}

export default App;



