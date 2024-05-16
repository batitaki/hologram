import React from "react";
import { animated } from "react-spring";
import { Link } from "react-router-dom";

import AnimatedCollectionLogic from "./AnimatedCollectionLogic";

const AnimatedCollectionVisual = () => {
  const { props, positions, currentIndex, media, loading } =
    AnimatedCollectionLogic();

  const handleClick = (userId) => {
    // Aquí podrías realizar alguna acción al hacer clic en la imagen,
    // como redireccionar al perfil del usuario.
    console.log(`Clic en la imagen del usuario con ID: ${userId}`);
  };

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
          {media.length > 0 && (
            <div className="animated-media-container">
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
                  {media[i] && (
                    <Link
                      to={`/creatives/${media[i].UserID}`} // Reemplaza "UserID" con el nombre de la propiedad que contiene el ID del usuario asociado con el medio
                      key={media[i].ID}
                      onClick={() => handleClick(media[i].UserID)}
                    >
                      <img
                        className={`animated-media-image ${
                          i === currentIndex ? "active" : ""
                        }`}
                        src={media[i].Image}
                        alt={media[i].Title}
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
