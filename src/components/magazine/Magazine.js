import React from 'react'
import './Magazine.css'
import Sketch from '../sketch/Sketch.js';
import { useTranslation } from 'react-i18next';

export const Magazine = () => {
  const {t } = useTranslation()
  return (
    <>
    <div className='magazine'>

      <h2 className='titleMagazine'>   {t("magazine")} </h2>

    </div>

    <Sketch/>

    </>
  )
}
