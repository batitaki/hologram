import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import audio from "../../../assets/beat.wav";
import "./SketchStyles.css";
let sound;

const ParticleComponent = () => {
  const [audioPermission, setAudioPermission] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true); // Estado para controlar la visibilidad del cursor
  const [stars, setStars] = useState([]); // Estado para almacenar las estrellas

  useEffect(() => {
    sound = new Audio(audio);
    sound.loop = true;
    sound.load();
  }, []);

  const playAudio = () => {
    if (!audioPlaying) {
      sound.play();
      setAudioPlaying(true);
      setCursorVisible(false); // Ocultar cursor al iniciar la reproducción de audio
    }
  };

  const stopAudio = () => {
    sound.pause();
    sound.currentTime = 0;
    setAudioPlaying(false);
    setCursorVisible(true); // Mostrar cursor al detener la reproducción de audio
  };

  const requestAudioPermission = () => {
    if (sound && !audioPermission) {
      sound.play().then(() => {
        setAudioPermission(true);
        stopAudio();
      }).catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(850, 650).parent(canvasParentRef);
    p5.frameRate(60);
  };

  const draw = (p5) => {
    p5.background(0);

    // Dibujar estrellas
    for (let star of stars) {
      star.update();
      star.show(p5);
    }

    // Dibujar línea que sigue al cursor
    if (!audioPlaying) {
      p5.stroke(255); // Color blanco
      p5.strokeWeight(1); // Grosor 1
      p5.line(p5.width / 2, p5.height / 2, p5.mouseX, p5.mouseY); // Línea que sigue al cursor

      // Generar nueva estrella en la posición del cursor
      if (p5.frameCount % 5 === 0) { // Controlar la frecuencia de generación de estrellas
        let newStar = new Star(p5.mouseX, p5.mouseY);
        setStars([...stars, newStar]);
      }
    }

    // Dibujar líneas aleatorias cuando el audio está reproduciéndose o cuando se sigue el cursor
    if (audioPlaying || !cursorVisible) {
      const centerX = p5.width / 2;
      const centerY = p5.height / 2;
      const numLines = 500;
      const angleIncrement = p5.TWO_PI / numLines;
      const maxLength = p5.dist(0, 0, centerX, centerY);
      let lineLength = (sound.currentTime / sound.duration) * maxLength;
      for (let i = 0; i < numLines; i++) {
        const angle = i * angleIncrement;
        const x = centerX + lineLength * p5.cos(angle);
        const y = centerY + lineLength * p5.sin(angle);
        p5.stroke(p5.random(255), p5.random(255), p5.random(255)); // Colores aleatorios
        p5.strokeWeight(p5.random(1, 3)); // Grosor aleatorio
        p5.line(centerX, centerY, x, y);
      }
    }

    // Reproducir audio cuando el cursor esté cerca del centro
    if (!audioPlaying && p5.dist(p5.width / 2, p5.height / 2, p5.mouseX, p5.mouseY) < 50) {
      playAudio();
    } else if (audioPlaying && p5.dist(p5.width / 2, p5.height / 2, p5.mouseX, p5.mouseY) >= 50) {
      stopAudio();
    }
  };

  const openFullscreen = () => {
    const canvas = document.querySelector(".p5Canvas");
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) { /* Safari */
      canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { /* IE11 */
      canvas.msRequestFullscreen();
    }
  };

  return (
    <div className="sketch">
      <div className="sketch-content">
        {audioPermission ? (
          <>
            <div>
              <button className="button-full-screan" onClick={openFullscreen}>FULLSCREEN</button>
            </div>

            <Sketch
              setup={setup}
              draw={draw}
              className="fluid-sketch"
            />
          </>
        ) : (
          <button className="button-permission" onClick={requestAudioPermission}>ALLOW AUDIO</button>
        )}
      </div>
    </div>
  );
};

// Clase para representar una estrella
class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 1;
    this.speed = Math.random() * 3 + 1;
  }

  // Actualizar posición de la estrella
  update() {
    this.y += this.speed;
    if (this.y > 650) {
      this.y = 0;
    }
  }

  // Mostrar la estrella
  show(p5) {
    p5.fill(255);
    p5.noStroke();
    p5.ellipse(this.x, this.y, this.size, this.size);
  }
}

export default ParticleComponent;
