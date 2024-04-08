import React from "react";
import { animated } from "react-spring";
import { Link } from "react-router-dom";

import AnimatedCollectionLogic from "./AnimatedCollectionLogic";

const AnimatedCollectionVisual = () => {
  const { props,  positions, currentIndex, artworks, loading } =
    AnimatedCollectionLogic();

  return (
    <div
      className="images-content"
      style={{
        width: "500px",
        height: "700px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {loading ? ( 
        <div className="loading">Loading...</div>
      ) : (
        <div className="animated-collection-container">
          {artworks.length > 0 && (
            <div className="animated-artwork-container">
              {positions.map((position, i) => (
                <animated.div
                  key={i}
                  style={{
                    ...props,
                    position: "absolute",
                    left: position && position.left,
                    top: position && position.top,
                    width: "200px",
                  }}
                >
                  {artworks[i] && (
                    <Link to={`/artwork/${artworks[i].ID}`} key={artworks[i].ID}>
                      <img
                        className={`animated-artwork-image ${
                          i === currentIndex ? "active" : ""
                        }`}
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
      )}
    </div>
  );
};

export default AnimatedCollectionVisual;
