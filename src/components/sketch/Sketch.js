import React, { useState } from "react";
import Sketch from "react-p5";
import p5 from "p5";
import "p5/lib/addons/p5.sound"; // Importa p5.sound
import audio from '../../assets/beat.wav'
import './SketchStyles.css'

let x = 50;
let y = 50;
let sound; // Variable para el objeto de sonido
let isSoundOn = false; // Estado para rastrear si el sonido está activado

export default (props) => {
  const preload = (p5) => {
    // Cargar el archivo de audio en la función preload
    sound = p5.loadSound(audio);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    x++;

    // Verificar si la tecla "b" se ha presionado
    if (p5.keyIsDown(66) && !isSoundOn) { // 66 es el código de la tecla "b"
      // Activar el sonido
      sound.loop();
      isSoundOn = true;
    } else if (!p5.keyIsDown(66) && isSoundOn) {
      // Desactivar el sonido
      sound.stop();
      isSoundOn = false;
    }
  };

  return <Sketch className={"sketch"} setup={setup} draw={draw} preload={preload} />;
};
