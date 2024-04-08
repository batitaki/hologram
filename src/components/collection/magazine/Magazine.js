import React from 'react';
import './Magazine.css';
import { useTranslation } from 'react-i18next';
import AnimatedCollectionVisual from '../animatedCollection/AnimatedCollectionVisual.js';
import DrawImagesComponent from '../../sketch/draw/DrawImagesSketch.js';

const Magazine = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <div className='magazine'>
        <h2 className='titleMagazine'>{t("magazine")}</h2>
      </div>
      <div className='animated'>
        <div className='text-animation'>
          Outlaw Man (アウトロー・マン Autorō Man?, Shōnen Jump especial 1982)
Mashōnen B. T. (魔少年ビーティー Mashōnen bītī?, Shōnen Jump semanal 1982–1983, 1 volumen 1984)
Baoh (バオー来訪者 Baō Raohōsha?, Shōnen Jump semanal 1984–1985, 2 volúmenes 1985)
Gorgeous Irene (colección de one-shots, 1987)
Busō Poker (武装ポーカー Busō Pōkā?, Shōnen Jump semanal 1980)
        </div>
        <AnimatedCollectionVisual />
      </div>
      <DrawImagesComponent/>
    </>
  );
};

export default Magazine;
