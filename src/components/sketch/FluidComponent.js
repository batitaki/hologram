import React, { useEffect, useState, useRef } from 'react';
import Sketch from 'react-p5';
import './FluidComponent.css';
import audio from "../../assets/llanto.wav";
import suziImage from "../../assets/suzi.jpg";
import harmImage from "../../assets/harm.jpg";

let sound;

const FluidComponent = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [drawHImage, setDrawHImage] = useState(false);
  const [drawSImage, setDrawSImage] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    sound = new Audio(audio);
    sound.loop = true;
    sound.load();
  }, []);

  const playAudio = () => {
    if (!audioPlaying) {
      sound.play();
      setAudioPlaying(true);
    }
  };

  const stopAudio = () => {
    sound.pause();
    sound.currentTime = 0;
    setAudioPlaying(false);
  };

  const mouseClicked = () => {
    playAudio();
  };

  const keyPressed = (p5) => {
    if (p5.key === 'H') {
      setDrawHImage(true);
    } else if (p5.key === 'S') {
      setDrawSImage(true);
    }
  };

  const keyReleased = (p5) => {
    if (p5.key === 'H') {
      setDrawHImage(false);
    } else if (p5.key === 'S') {
      setDrawSImage(false);
    }
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(924, 668).parent(canvasParentRef);
    p5.background(255); // Fondo blanco
    p5.frameRate(60);

    // Cargar ambas imágenes en el setup
    imgRef.current = {
      suzi: p5.loadImage(suziImage, () => {
        console.log('Imagen de Suzy cargada correctamente.');
      }),
      harm: p5.loadImage(harmImage, () => {
        console.log('Imagen de Harm cargada correctamente.');
      }),
    };
  };

  const draw = (p5) => {
    if (audioPlaying) {
      // Obtener la posición del mouse
      const mouseX = p5.mouseX;
      const mouseY = p5.mouseY;

      // Verificar si la imagen se ha cargado antes de intentar dibujarla
      if (drawHImage && imgRef.current && imgRef.current.harm) {
        const imgSize = 100;
        // Dibujar la imagen de Harm en la posición del mouse
        p5.image(imgRef.current.harm, mouseX - imgSize / 2, mouseY - imgSize / 2, imgSize, imgSize);
      } else if (drawSImage && imgRef.current && imgRef.current.suzi) {
        const imgSize = 100;
        // Dibujar la imagen de Suzy en la posición del mouse
        p5.image(imgRef.current.suzi, mouseX - imgSize / 2, mouseY - imgSize / 2, imgSize, imgSize);
      }
    }
  };

  return (
    <Sketch
      className="fluid"
      setup={setup}
      draw={draw}
      mouseClicked={mouseClicked}
      keyPressed={keyPressed}
      keyReleased={keyReleased}
    />
  );
};

export default FluidComponent;
