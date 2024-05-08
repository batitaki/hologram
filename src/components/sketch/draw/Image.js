import React from "react";

const Image = ({ src, alt, size, onClick }) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        marginBottom: "10px",
        cursor: "pointer",
        border: "solid 1px black",
        padding: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default Image;