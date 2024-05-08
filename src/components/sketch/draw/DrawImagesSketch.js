import React, { useState, useRef, useEffect } from "react";
import Sketch from "react-p5";
import horseImage from "../../../assets/horse.png";
import image1 from "../../../assets/face.png";
import image2 from "../../../assets/gratis-png-muhammad-ali-mike-tyson-boxeo-thumbnail.png";
import image3 from "../../../assets/flan.png";
import image4 from "../../../assets/stars.png";
import image5 from "../../../assets/dolphines.png";

const DrawImagesComponent = () => {
  const [drawImage, setDrawImage] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [shouldDraw, setShouldDraw] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showSecondInstruction, setShowSecondInstruction] = useState(false);
  const [printedFirstImage, setPrintedFirstImage] = useState(false);
  const [size, setSize] = useState(() => {
    return window.innerWidth < 780 ? 50 : 100;
  });
  const imgRef = useRef(null);
  const imagesHistory = useRef([]);

  const handleImageUpload = (p5, e, image) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = p5.loadImage(reader.result, () => {
          setUserImage(img);
          setShowInstructions(false);
          setDrawImage(true);
          setShowSecondInstruction(true);
          openFullscreen();
        });
        imgRef.current = img;
      };
      reader.readAsDataURL(file);
    }
  };

  const setup = (p5, canvasParentRef) => {
    const canvasWidth = Math.min(window.innerWidth, 1024);
    const canvasHeight = canvasWidth * (2 / 3);

    const canvas = p5.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasParentRef);
    canvas.style("display", "block");
    canvas.style("margin", "auto");
    canvas.style("user-select", "none");
    canvas.style("touch-action", "none");
    canvas.style("border", "1px solid black"); // Agregar un borde de 1px sólido negro

    canvas.elt.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );

    p5.background(255);
    p5.frameRate(60);
  };

  const draw = (p5) => {
    p5.background(255);

    if (showInstructions) {
      if (p5.frameCount % 30 < 15) {
        p5.fill(0);
        p5.textAlign(p5.CENTER);
        const instructionTextSize = p5.width < 600 ? 20 : 35;
        p5.textSize(instructionTextSize);
        p5.textFont("Array");
        const instructionText = "PRESS U TO LOAD IMAGES";
        p5.text(
          instructionText,
          p5.width / 2,
          p5.height / 2 + instructionTextSize / 2
        );
      }
    } else {
      if (
        showSecondInstruction &&
        !printedFirstImage &&
        imagesHistory.current.length === 0
      ) {
        if (p5.frameCount % 30 < 15) {
          p5.fill(0);
          p5.textAlign(p5.CENTER);
          const instructionTextSize = p5.width < 600 ? 20 : 35;
          p5.textSize(instructionTextSize);
          p5.textFont("Array");
          const instructionText = "CLICK INSIDE THE CANVAS";
          p5.text(
            instructionText,
            p5.width / 2,
            p5.height / 2 + instructionTextSize / 2
          );
        }
      }

      for (let i = 0; i < imagesHistory.current.length; i++) {
        const { img, x, y, width, height } = imagesHistory.current[i];
        p5.image(img, x - width / 2, y - height / 2, width, height);
      }

      if (drawImage && userImage && shouldDraw && !isPaused) {
        const currentImage = {
          img: userImage,
          x: p5.mouseX,
          y: p5.mouseY,
          width: userImage.width * (size / userImage.width),
          height: userImage.height * (size / userImage.width),
        };
        imagesHistory.current.push(currentImage);
        if (!printedFirstImage) {
          setShowSecondInstruction(false);
          setPrintedFirstImage(true);
        }
      }
    }
  };

  const mousePressed = (p5) => {
    const canvasX = p5.width / 2;
    const canvasY = p5.height / 2;
  
    if (
      p5.mouseX > canvasX - p5.width / 2 &&
      p5.mouseX < canvasX + p5.width / 2 &&
      p5.mouseY > canvasY - p5.height / 2 &&
      p5.mouseY < canvasY + p5.height / 2
    ) {
      if (shouldDraw && userImage) {
        const currentImage = {
          img: userImage,
          x: p5.mouseX,
          y: p5.mouseY,
          width: userImage.width * (size / userImage.width),
          height: userImage.height * (size / userImage.width),
        };
        imagesHistory.current.push(currentImage);
        setShowSecondInstruction(false);
        setPrintedFirstImage(true);
        setShowInstructions(false);
      } else {
        setShouldDraw(true);
      }
  
      setIsPaused(!isPaused);
    }
  };
  
  const mouseDragged = (p5) => {
    const canvasX = p5.width / 2;
    const canvasY = p5.height / 2;
  
    if (
      p5.mouseX > canvasX - p5.width / 2 &&
      p5.mouseX < canvasX + p5.width / 2 &&
      p5.mouseY > canvasY - p5.height / 2 &&
      p5.mouseY < canvasY + p5.height / 2
    ) {
      if (shouldDraw && userImage) {
        const currentImage = {
          img: userImage,
          x: p5.mouseX,
          y: p5.mouseY,
          width: userImage.width * (size / userImage.width),
          height: userImage.height * (size / userImage.width),
        };
        imagesHistory.current.push(currentImage);
        setShowSecondInstruction(false);
        setPrintedFirstImage(true);
        setShowInstructions(false);
      }
    }
  };
  

  const keyTyped = (p5) => {
    if ((p5.key === "z" || p5.key === "Z") && p5.keyIsDown(91)) {
      handleUndo();
    } else if (p5.key === "U" || p5.key === "u") {
      document.getElementById("imageInput").click();
    } else {
      handleSizeChange(p5.key);
    }
  };

  const keyDown = (event) => {
    // Verifica si la combinación de teclas es Command + Z
    if (event.metaKey && event.key === "z") {
      handleUndo();
      // Previene el comportamiento predeterminado del navegador para evitar que se realice el desplazamiento hacia arriba
      event.preventDefault();
    }
  };

  // Agrega un event listener para el evento keydown en el documento
  useEffect(() => {
    document.addEventListener("keydown", keyDown);
    // Limpia el event listener al desmontar el componente
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, []);

  const handleButtonClick = () => {
    document.getElementById("imageInput").click();
  };

  const openFullscreen = () => {
    const canvas = document.querySelector(".p5Canvas");
    try {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.webkitRequestFullscreen) {
        /* Safari */
        canvas.webkitRequestFullscreen();
      } else if (canvas.msRequestFullscreen) {
        /* IE11 */
        canvas.msRequestFullscreen();
      }
    } catch (error) {
      console.error("Error requesting fullscreen:", error);
    }
  };

  const handleImageClick = (p5, image) => {
    const canvasX = p5.mouseX - p5.width / 2;
    const canvasY = p5.mouseY - p5.height / 2;
    const imageSize = size / 2; // Tamaño de la imagen dividido por 2 para centrarla correctamente

    const img = p5.loadImage(image, () => {
      if (img.width !== 0 && img.height !== 0) {
        setUserImage(img);
        const currentImage = {
          img: img,
          x: canvasX - imageSize, // Ajustar la posición en función del tamaño de la imagen
          y: canvasY - imageSize, // Ajustar la posición en función del tamaño de la imagen
          width: img.width * (size / img.width),
          height: img.height * (size / img.width),
        };
        imagesHistory.current.push(currentImage);
        setShowSecondInstruction(false);
        setPrintedFirstImage(true);
        setShowInstructions(false);
      } else {
        console.error("Error loading image.");
      }
    });
  };

  const handleSizeChange = (key) => {
    switch (key) {
      case "1":
        setSize(50);
        break;
      case "2":
        setSize(150);
        break;
      case "3":
        setSize(250);
        break;
      case "4":
        setSize(500);
        break;
      case "5":
        setSize(1050);
        break;
      default:
        break;
    }
  };
  const handleUndo = () => {
    // Recorremos el historial de imágenes desde el final hacia el principio
    for (let i = imagesHistory.current.length - 1; i >= 0; i--) {
      // Si encontramos una imagen en el historial, la eliminamos y salimos del bucle
      if (imagesHistory.current[i].hasOwnProperty("img")) {
        imagesHistory.current.splice(i, 1);
        break;
      }
    }

    // Forzar una actualización del componente
    setShouldDraw(!shouldDraw);

    console.log(imagesHistory.current);
  };

  return (
    <>
      <div className="draw-images">
        <h4 className="title"> PRINT IMAGES </h4>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginLeft:"10%"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Sketch
              setup={(p5, canvasParentRef) => setup(p5, canvasParentRef)}
              draw={(p5) => draw(p5)}
              keyTyped={(p5) => keyTyped(p5)}
              mousePressed={(p5) => mousePressed(p5, image1)}
              mouseDragged={(p5) => mouseDragged(p5, image1)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft:"5%", marginBottom:"5%", position:"relative" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                marginBottom: "10px",
                cursor: "pointer",
                border: "solid 1px black",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleImageClick(new window.p5(), horseImage)}
            >
              <img
                src={horseImage}
                alt="horse"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              style={{
                width: "120px",
                height: "120px",
                marginBottom: "10px",
                cursor: "pointer",
                border: "solid 1px black",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleImageClick(new window.p5(), image1)}
            >
              <img
                src={image1}
                alt="image1"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              style={{
                width: "120px",
                height: "120px",
                marginBottom: "10px",
                cursor: "pointer",
                border: "solid 1px black",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleImageClick(new window.p5(), image2)}
            >
              <img
                src={image2}
                alt="image2"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              style={{
                width: "120px",
                height: "120px",
                marginBottom: "10px",
                cursor: "pointer",
                border: "solid 1px black",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleImageClick(new window.p5(), image3)}
            >
              <img
                src={image3}
                alt="image3"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              style={{
                width: "120px",
                height: "120px",
                marginBottom: "10px",
                cursor: "pointer",
                border: "solid 1px black",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleImageClick(new window.p5(), image4)}
            >
              <img
                src={image4}
                alt="image4"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              style={{
                width: "120px",
                height: "120px",
                marginBottom: "10px",
                cursor: "pointer",
                border: "solid 1px black",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleImageClick(new window.p5(), image5)}
            >
              <img
                src={image5}
                alt="image5"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "70%",
            marginLeft: "15vw",
            fontFamily: "Arial, Helvetica, sans-serif"
     
          }}
        >
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleImageUpload(new window.p5(), e)}
          />
          <div className="buttons-draw-images">
            <button className="button-full-screan" onClick={openFullscreen}>
              FULLSCREEN
            </button>
            <button className="button-full-screan" onClick={handleButtonClick}>
              LOAD IMAGE
            </button>
            <button className="button-full-screan" onClick={handleUndo}>
              UNDO
            </button>
          </div>
          <p>
            Interactive Image Collage Platform <br />
            Welcome to our interactive image collage platform! How It Works
            <br />
            For guidance on using the platform, follow the on-screen
            instructions. These will provide helpful tips and information as you
            navigate the collage creation process.
            <br />
            Whether you're an artist, designer, or simply looking to unleash
            your creativity, our interactive image collage platform offers a fun
            and efficient way to bring your ideas to life. Get started now and
            let your imagination run wild!
            <br />
            <br />
            Fullscreen Mode: Want to immerse yourself fully in your creative
            process? Click the "FULLSCREEN" button to enter fullscreen mode.
            <br />
            Pause/Resume Drawing: Need a break or want to pause the drawing
            process? Simply click inside the canvas area again to toggle between
            pause and resume modes.
          </p>
          Begin by uploading your desired images using the "LOAD IMAGE" button.
          Simply click the button or press "U" to trigger the image upload
          prompt.
          <br />
          <br />
          Once you've uploaded your images, click inside the canvas area to
          start placing them. Each click will position the image at the cursor
          location.
          <br />
          <br />
          <br />
          Image Size Adjustment: To adjust the size of the images, use the
          numbered keys on your keyboard:
          <br />
          Press 1 for an extra-small size (50px).
          <br />
          Press 2 for a small size (150px).
          <br />
          Press 3 for a medium size (250px).
          <br />
          Press 4 for a large size (500px).
          <br />
          Press 5 for an extra-large size (1050px).
        </div>
      </div>
    </>
  );
};

export default DrawImagesComponent;
