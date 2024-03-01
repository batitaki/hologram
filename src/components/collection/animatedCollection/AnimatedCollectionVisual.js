import React from "react";
import { animated } from "react-spring";
import { Link } from "react-router-dom";

import AnimatedCollectionLogic from "./AnimatedCollectionLogic";

const AnimatedCollectionVisual = () => {
  const { props, indexes, positions, currentIndex, artworks } =
    AnimatedCollectionLogic();

  return (
    <div
      className="images-content"
      style={{
        width: "500px",
        height: "700px",
        position: "relative",
        overflow: "hidden",
        margin: "auto",
      }}
    >
      <div className="animated-collection-container">
        {artworks.length > 0 && (
          <div className="animated-artwork-container">
           {positions.map((position, i) => (
  <animated.div
    key={i} // Utiliza 'i' como la clave del elemento en el mapeo
    style={{
      ...props,
      position: 'absolute',
      left: position && position.left, // Verifica que 'position' esté definido
      top: position && position.top, // Verifica que 'position' esté definido
      width: '200px',
      margin: '20px',
    }}
  >
    {artworks[i] && (
      <Link
        to={`/artwork/${artworks[i].ID}`}
        key={artworks[i].ID}
      >
        <img
          className={`animated-artwork-image ${i === currentIndex ? "active" : ""}`}
          src={artworks[i].Image}
          alt={artworks[i].Title}
          style={{ width: "100%", objectFit: "cover" }}
        />
      </Link>
    )}
  </animated.div>
))}

          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedCollectionVisual;
