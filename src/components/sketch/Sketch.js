import React, { useState } from "react";
import Sketch from "react-p5";

import "p5/lib/addons/p5.sound"; // Importa p5.sound
import audio from '../../assets/beat.wav';
import audio1 from '../../assets/ojo.wav';
import audio2 from '../../assets/soho.wav';
import './SketchStyles.css';

let x = 50;
let y = 50;
let sound; // Variable para el objeto de sonido principal
let sound1; // Variable para el objeto de sonido secundario
let sound2;
let isSoundOn = false; // Estado para rastrear si el sonido principal está activado
let isSound1On = false; // Estado para rastrear si el sonido secundario está activado
let isSound2On = false;

export default (props) => {
  const preload = (p5) => {
    // Cargar los archivos de audio en la función preload
    sound = p5.loadSound(audio);
    sound1 = p5.loadSound(audio1);
    sound2 = p5.loadSound(audio2);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    x++;

    if (p5.keyIsDown(66) && !isSoundOn) { 
      // Activar el sonido principal al presionar la tecla 'b'
      sound.loop();
      isSoundOn = true;
    } else if (!p5.keyIsDown(66) && isSoundOn) {
      sound.stop();
      isSoundOn = false;
    }

    if (p5.keyIsDown(75) && !isSound1On) { 
      // Activar el sonido secundario al presionar la tecla 'k'
      sound1.loop();
      isSound1On = true;
    } else if (!p5.keyIsDown(75) && isSound1On) {
      sound1.stop();
      isSound1On = false;
    }
    
    if (p5.keyIsDown(83) && !isSound2On) {
      sound2.loop();
      isSound2On = true;
    } else if (!p5.keyIsDown(83)&& isSound2On){
      sound2.stop();
      isSound2On = false;
    }
  };

  return <Sketch className={"sketch"} setup={setup} draw={draw} preload={preload} />;
};

