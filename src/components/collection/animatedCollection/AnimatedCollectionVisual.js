import React from 'react';
import { animated } from 'react-spring';
import { Link } from 'react-router-dom';

import AnimatedCollectionLogic from './AnimatedCollectionLogic';

const AnimatedCollectionVisual = () => {
  const { props, indexes, positions, currentIndex, artworks } = AnimatedCollectionLogic();

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
                  <Link to={`/artwork/${artworks[index].ID}`} key={artworks[index].ID}>
                    <img
                      className={`animated-artwork-image ${index === currentIndex ? 'active' : ''}`}
                      src={artworks[index].Image}
                      alt={artworks[index].Title}
                      style={{ width: '100%', objectFit: 'cover' }}
                    />
                  </Link>
                )}
              </animated.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedCollectionVisual;
