import React from 'react';
import videoSource from '../../../assets/lacienaga.mp4';
import './Home.css'; 


const Home = () => {
  return (
    <>
      <div className="home-video">
        <video autoPlay loop muted className="background-video">
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}

export default Home;
