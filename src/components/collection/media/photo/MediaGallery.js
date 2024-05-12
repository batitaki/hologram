import React from "react";

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
                  <img className="photo-image" src={media.Image} alt={`Media ${index}`} />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaGallery;
