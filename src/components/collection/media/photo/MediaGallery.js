import React from "react";
import { Link } from "react-router-dom";

function MediaGallery({ userMedia }) {
  return (
    <div className="media-container">
      <div className="columns-photos-container">
        {Array.from({ length: Math.ceil(userMedia.length / 3) }).map((_, rowIndex) => (
          <div className="row-photo" key={rowIndex}>
            {userMedia
              .slice(rowIndex * 3, (rowIndex + 1) * 3)
              .map((media, index) => (
                <div className="photo-container" key={index}>
                  <Link to={`/profile/${media.UserID}`}>
                    <img className="photo-image" src={media.Image} alt={`Media ${index}`} />
                  </Link>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaGallery;
