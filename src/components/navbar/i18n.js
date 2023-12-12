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
          createSketch: 'CREATE SKETCH' ,
          price:'PRICE',
          description:'DESCRIPTION',
          title:'TITLE',
          materials:'MATERIALS',
          selectArtist:'SELECT AN ARTIST',
          dimensions:'DIMENSIONS',
          upload:'UPLOAD AN IMAGE',
          createArt:'CREATE ARTWORK',
          magazine:'MAGAZINE'
        },
      },
      es: {
        translation: {
          home: 'INICIO',
          register: 'REGISTRARSE',
          magazine: 'REVISTA',
          gallery: 'GALERIA',
          artists: 'ARTISTAS',
          apply: 'APLICAR',
          createArt: 'CREAR ARTE',
          createSketch: 'CREAR SKETCH',
          price:'PRECIO',
          description:'DESCRIPCION',
          title:'TITULO',
          materials:'MATERIALES',
          selectArtist:'SELECCIONA UN ARTISTA',
          dimensions:'DIMENSIONES',
          upload:'CARGA UNA IMAGEN',
          createArt:'CREAR OBRA',
          creationDate:'FECHA DE CREACION',
          magazine:'REVISTA'
        },
      },
    },
    lng: 'en', // idioma por defecto
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
