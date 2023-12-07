// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          createArt: 'CREATE ART',
          home: 'HOME',
          register: 'REGISTER',
          magazine: 'MAGAZINE',
          gallery: 'GALLERY',
          artists: 'ARTISTS',
          apply: 'APPLY',
          createSketch: 'CREATE SKETCH'
        },
      },
      es: {
        translation: {
          home: 'INICIO',
          register: 'REGISTRARSE',
          magazine: 'REVISTA',
          gallery: 'GALERIA',
          artists: 'ARTISTAS',
          apply: 'APLICÁR',
          createArt: 'CREAR ARTE',
          createSketch: 'CREAR SKETCH'
        },
      },
    },
    lng: 'en', // idioma por defecto
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
