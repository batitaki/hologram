import React, { useState } from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import videoFile from '../../assets/lacienaga.mp4'; 
import audio from '../../assets/beat.wav';
import audio1 from '../../assets/ojo.wav';
import audio2 from '../../assets/soho.wav';
import audio3 from '../../assets/rising.wav';
import audio4 from '../../assets/space.wav';
import suziImage from '../../assets/suzi.jpg';
import valentinoImage from '../../assets/valen1.png';
import jeeImage from '../../assets/jeee.png'
import './SketchStyles.css';

let sound;
let sound1;
let sound2;
let sound3;
let sound4;
let video;

let isSoundOn = false;
let isSound1On = false;
let isSound2On = false;
let isSound3On = false;
let isSound4On = false;
let isVideoPlaying = false;

let suzi;
let valentino;
let jee;
let suziSize = 100;
let valentinoSize = 100;
let jeeSize = 100;
let angle = 0;
let yOffset = 0;

let isHKeyPressed = false;
let circleRadius = 0;

export default (props) => {
  const x = 250;
  const y = 250;

  const preload = (p5) => {
    sound = p5.loadSound(audio);
    sound1 = p5.loadSound(audio1);
    sound2 = p5.loadSound(audio2);
    sound3 = p5.loadSound(audio3);
    sound4 = p5.loadSound(audio4);
    suzi = p5.loadImage(suziImage);
    valentino = p5.loadImage(valentinoImage);
    jee = p5.loadImage(jeeImage);
    video = p5.createVideo([videoFile]);
    video.hide(); 
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(215, 300, 423);

    if (isSoundOn && sound.isPlaying()) {
      const scaleValue = p5.sin(angle);
      suziSize = p5.map(scaleValue, -1, 1, 50, 200);
      angle += 0.1;
    }

    p5.image(suzi, x - suziSize / 2, y - suziSize / 2 + yOffset, suziSize, suziSize);

    if (p5.keyIsDown(75)) {
      if (isSoundOn && sound.isPlaying()) {
        const scaleValue = p5.sin(angle);
        valentinoSize = p5.map(scaleValue, -1, 1, 50, 200);
        angle += 0.1;
      }
      p5.image(valentino, x - valentinoSize / 2, y - suziSize / 2 - valentinoSize - yOffset, valentinoSize, valentinoSize);
    }

    if (p5.keyIsDown(83)) {
      if (isSoundOn && sound.isPlaying()) {
        const scaleValue = p5.sin(angle);
        jeeSize = p5.map(scaleValue, -1, 1, 50, 200);
        angle += 0.1;
      }
      p5.image(jee, 0, p5.height - jeeSize, jeeSize, jeeSize);
    }

    if (x > p5.width - 35 || x < 35) {
      x = p5.constrain(x, 35, p5.width - 35);
    }

    if (p5.keyIsDown(66) && !isSoundOn) {
      sound.loop();
      isSoundOn = true;
    } else if (!p5.keyIsDown(66) && isSoundOn) {
      sound.stop();
      isSoundOn = false;
    }

    if (p5.keyIsDown(75) && !isSound1On) {
      sound1.loop();
      isSound1On = true;
    } else if (!p5.keyIsDown(75) && isSound1On) {
      sound1.stop();
      isSound1On = false;
    }

    if (p5.keyIsDown(83) && !isSound2On) {
      sound2.loop();
      isSound2On = true;
    } else if (!p5.keyIsDown(83) && isSound2On) {
      sound2.stop();
      isSound2On = false;
    }

    if (p5.keyIsDown(72) && !isSound3On) {
      sound3.loop();
      isSound3On = true;
    } else if (!p5.keyIsDown(72) && isSound3On) {
      sound3.stop();
      isSound3On = false;
    }

    if (p5.keyIsDown(82) && !isSound4On) {
      sound4.loop();
      isSound4On = true;
    } else if (!p5.keyIsDown(82) && isSound4On) {
      sound4.stop();
      isSound4On = false;
    }
   
    if (p5.keyIsDown(86) && !isVideoPlaying) { 
      video.loop(); 
      isVideoPlaying = true;
    } else if (!p5.keyIsDown(86) && isVideoPlaying) {
      video.pause();
      isVideoPlaying = false;
    }

    const videoWidth = 300; 
    const videoHeight = (videoWidth / video.width) * video.height;
  
    if (isVideoPlaying) {
      p5.image(video, p5.width - videoWidth, 0, videoWidth, videoHeight);
    }

    if (p5.keyIsDown(72) && !isHKeyPressed) { 
      isHKeyPressed = true;
    } else if (!p5.keyIsDown(72) && isHKeyPressed) {
      isHKeyPressed = false;
      circleRadius = 0; 
    }

    if (isHKeyPressed) {
      p5.fill(255, 0, 0);
      p5.ellipse(p5.width / 2, p5.height / 2, circleRadius, circleRadius);
      circleRadius += 5; 
      if (circleRadius > 200) {
        circleRadius = 200;
      }
    }
  };

  const remove = (p5) => {
    video.remove();
  };

  return <Sketch className={"sketch"} setup={setup} draw={draw} preload={preload} remove={remove} />;
};