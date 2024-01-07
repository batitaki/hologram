import React, { useEffect, useState, useRef } from 'react';
import Sketch from 'react-p5';
import { ChromePicker } from 'react-color'; // Importa el selector de colores
import './FluidComponent.css';
import audio from "../../assets/llanto.wav";
import suziImage from "../../assets/suzi.jpg";
import harmImage from "../../assets/harm.jpg";
import goylImage from "../../assets/goyl.jpg";

let sound;

const FluidComponent = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [drawHImage, setDrawHImage] = useState(false);
  const [drawSImage, setDrawSImage] = useState(false);
  const [drawGImage, setDrawGImage] = useState(false);
  const [aureolaColor, setAureolaColor] = useState({ r: 465, g: 90, b: 220 }); // Color inicial
  const [showColorPicker, setShowColorPicker] = useState(false);
  const imgRef = useRef(null);
  const aureolas = [];

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

  const handleColorChange = (color) => {
    setAureolaColor(color.rgb);
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  const mouseClicked = () => {
    playAudio();
  };

  const keyPressed = (p5) => {
    if (p5.key === 'H') {
      setDrawHImage(true);
    } else if (p5.key === 'S') {
      setDrawSImage(true);
    } else if (p5.key === 'G') {
      setDrawGImage(true);
    }
  };

  const keyReleased = (p5) => {
    if (p5.key === 'H') {
      setDrawHImage(false);
    } else if (p5.key === 'S') {
      setDrawSImage(false);
    } else if (p5.key === 'G') {
      setDrawGImage(false);
    }
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1024, 768).parent(canvasParentRef);
    p5.background(255);
    p5.frameRate(60);

    imgRef.current = {
      suzi: p5.loadImage(suziImage, () => {
        console.log('Imagen de Suzy cargada correctamente.');
      }),
      harm: p5.loadImage(harmImage, () => {
        console.log('Imagen de Harm cargada correctamente.');
      }),
      goyl: p5.loadImage(goylImage, () => {
        console.log('Imagen de Goyl cargada correctamente.');
      }),
    };
  };

  const draw = (p5) => {
    if (audioPlaying) {
      const mouseX = p5.mouseX;
      const mouseY = p5.mouseY;

      if (drawHImage && imgRef.current && imgRef.current.harm) {
        const imgSize = 100;
        p5.image(imgRef.current.harm, mouseX - imgSize / 2, mouseY - imgSize / 2, imgSize, imgSize);
        aureolas.push({ x: mouseX, y: mouseY, radius: 0 });
      } else if (drawSImage && imgRef.current && imgRef.current.suzi) {
        const imgSize = 100;
        p5.image(imgRef.current.suzi, mouseX - imgSize / 2, mouseY - imgSize / 2, imgSize, imgSize);
        aureolas.push({ x: mouseX, y: mouseY, radius: 0 });
      } else if (drawGImage && imgRef.current && imgRef.current.goyl) {
        const imgSize = 100;
        p5.image(imgRef.current.goyl, mouseX - imgSize / 2, mouseY - imgSize / 2, imgSize, imgSize);
        aureolas.push({ x: mouseX, y: mouseY, radius: 0 });
      }
    }

    for (let i = aureolas.length - 1; i >= 0; i--) {
      p5.noFill();
      p5.stroke(aureolaColor.r, aureolaColor.g, aureolaColor.b);
      p5.ellipse(aureolas[i].x, aureolas[i].y, aureolas[i].radius, aureolas[i].radius);

      aureolas[i].radius += 2;

      if (aureolas[i].radius > 100) {
        aureolas.splice(i, 1);
      }
    }
  };

  return (
    <div>
      <div className='color-buttons'>
        <button onClick={toggleColorPicker}>Pick Color</button>
        {showColorPicker && (
          <ChromePicker color={aureolaColor} onChange={handleColorChange} onClose={handleCloseColorPicker} />
        )}
      </div>
      <Sketch
        className="fluid"
        setup={setup}
        draw={draw}
        mouseClicked={mouseClicked}
        keyPressed={keyPressed}
        keyReleased={keyReleased}
      />
    </div>
  );
};

export default FluidComponent;
