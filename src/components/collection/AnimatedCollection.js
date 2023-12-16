import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useInterval } from 'react-use';
import { getCollection } from '../../services/collectionAPI';
import './AnimatedCollection.css';

const AnimatedCollection = () => {
  const [artworks, setArtworks] = useState([]);
  const [indexes, setIndexes] = useState([]);
  const [positions, setPositions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const fetchedArtworks = await getCollection();
        setArtworks(fetchedArtworks);
        const initialIndexes = getRandomIndexes(fetchedArtworks, 13);
        setIndexes(initialIndexes);
        setPositions(generateRandomPositions(13));
      } catch (error) {
        console.error('Error fetching artworks', error);
      }
    };

    fetchArtworks();
  }, []);

  const getRandomIndexes = (array, count) => {
    const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count).map((item) => array.indexOf(item));
  };

  const generateRandomPositions = (count) => {
    const positions = [];
    const imageWidth = 200; // Ajusta el ancho de las imágenes según tus necesidades
    const imageHeight = 200; // Ajusta la altura de las imágenes según tus necesidades
    const margin = 20; // Ajusta el margen entre las imágenes según tus necesidades

    for (let i = 0; i < count; i++) {
      let left, top;
      do {
        left = Math.random() * (1100 - imageWidth);
        top = Math.random() * (700 - imageHeight);
      } while (checkOverlap(positions, left, top, imageWidth, imageHeight));

      positions.push({ left: `${left}px`, top: `${top}px` });
    }
    return positions;
  };

  const checkOverlap = (existingPositions, left, top, width, height) => {
    for (const pos of existingPositions) {
      const xOverlap = left < pos.left + width && left + width > pos.left;
      const yOverlap = top < pos.top + height && top + height > pos.top;
      if (xOverlap && yOverlap) {
        return true; // Hay superposición
      }
    }
    return false; // No hay superposición
  };

  const navbarHeight = 60; // Ajusta la altura de tu barra de navegación
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
    onRest: () => {
      const timeoutId = setTimeout(() => {
        setIndexes((prevIndexes) => {
          const nextIndexes = getRandomIndexes(artworks, 13);
          setCurrentIndex(nextIndexes[0]);
          setPositions(generateRandomPositions(13));
          return nextIndexes;
        });
      }, 9000);

      return () => clearTimeout(timeoutId);
    },
  });

  useInterval(() => {
    setIndexes((prevIndexes) => {
      const nextIndexes = getRandomIndexes(artworks, 13);
      setCurrentIndex(nextIndexes[0]);
      setPositions(generateRandomPositions(13));
      return nextIndexes;
    });
  }, 9000);

  return (
    <div
      className='images-content'
      style={{
        width: '700px',
        height: '700px', // Ajusta la altura del contenedor según tus necesidades
        position: 'relative',
        overflow: 'hidden',
        margin: 'auto', // Centra el contenedor
      }}
    >
      <div className="animated-collection-container">
        {artworks.length > 0 && (
          <div className="animated-artwork-container">
            {indexes.map((index, i) => (
              <animated.div
                key={index}
                style={{
                  ...props,
                  position: 'absolute',
                  left: positions[i].left,
                  top: positions[i].top,
                  width: '200px', // Ajusta el ancho de las imágenes según tus necesidades
                  margin: '20px', // Ajusta el margen entre las imágenes según tus necesidades
                }}
              >
                {artworks[index] && (
                  <img
                    className={`animated-artwork-image ${index === currentIndex ? 'active' : ''}`}
                    src={artworks[index].Image}
                    alt={artworks[index].Title}
                    style={{ width: '100%', objectFit: 'cover' }}
                  />
                )}
              </animated.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedCollection;
