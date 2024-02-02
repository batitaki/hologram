import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useInterval } from 'react-use';
import { getCollection } from '../../../services/collectionAPI';

import { getRandomIndexes, generateRandomPositions } from './AnimatedCollectionUtils';

const AnimatedCollectionLogic = () => {
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

  return { props, indexes, positions, currentIndex, artworks };
};

export default AnimatedCollectionLogic;