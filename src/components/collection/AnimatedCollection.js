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
        const initialIndexes = getRandomIndexes(fetchedArtworks, 10);
        setIndexes(initialIndexes);
        setPositions(generateRandomPositions(10));
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
    const imageWidth = 200;
    const imageHeight = 200;
    const margin = 20;

    for (let i = 0; i < count; i++) {
      let left, top;
      do {
        left = Math.random() * (500 - imageWidth);
        top = Math.random() * (700 - imageHeight);
      } while (checkOverlap(positions, left, top, imageWidth, imageHeight));

      positions.push({ left: `${left}px`, top: `${top}px` });
    }
    return positions;
  };

  const checkOverlap = (existingPositions, left, top, width, height) => {
    for (const pos of existingPositions) {
      const xOverlap = left < pos.left + width + 20 && left + width + 20 > pos.left;
      const yOverlap = top < pos.top + height + 20 && top + height + 20 > pos.top;
      if (xOverlap && yOverlap) {
        return true;
      }
    }
    return false;
  };

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
    onRest: () => {
      setIndexes((prevIndexes) => {
        const nextIndexes = getRandomIndexes(artworks, 10);
        setCurrentIndex(nextIndexes[0]);
        setPositions(generateRandomPositions(10)); 
        return nextIndexes;
      });
    },
  });

  useInterval(() => {
    setIndexes((prevIndexes) => {
      const nextIndexes = getRandomIndexes(artworks, 10); 
      setCurrentIndex(nextIndexes[0]);
      setPositions(generateRandomPositions(10)); 
      return nextIndexes;
    });
  }, 9000);

  return (
    <div
      className='images-content'
      style={{
        width: '500px',
        height: '700px',
        position: 'relative',
        overflow: 'hidden',
        margin: 'auto',
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
                  width: '200px',
                  margin: '20px',
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
