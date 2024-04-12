import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { getMediaByUser } from '../../../../services/mediaAPI';
import './DragAndDropProvider.css';

function DragDrop({ userId }) {
  const [board, setBoard] = useState([]);
  const [userMedia, setUserMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserMedia = async () => {
      try {
        const mediaDataByUser = await getMediaByUser(userId);
        setUserMedia(mediaDataByUser || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user media', error);
      }
    };

    loadUserMedia();
  }, [userId]);

  useEffect(() => {
    const storedBoard = JSON.parse(localStorage.getItem('board'));
    if (storedBoard) {
      setBoard(storedBoard);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(board));
  }, [board]);

  useEffect(() => {
    localStorage.setItem('userMedia', JSON.stringify(userMedia));
  }, [userMedia]);

  const addImageToBoard = (id) => {
    const selectedImage = userMedia.find((image) => image.ID === id);
    if (selectedImage) {
      setBoard((prevBoard) => [...prevBoard, selectedImage]);
    } else {
      console.error('Image not found with ID:', id);
    }
  };

  const moveImage = (dragIndex, hoverIndex) => {
    const updatedBoard = [...board];
    const draggedImage = updatedBoard[dragIndex];
    updatedBoard.splice(dragIndex, 1);
    updatedBoard.splice(hoverIndex, 0, draggedImage);
    setBoard(updatedBoard);
  };
  
  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'image',
    drop: (item, monitor) => {
      addImageToBoard(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  if (isLoading) {
    return <div className="loading">LOADING...</div>;
  }

  return (
    <div className="media-container">
      <div className="board" ref={drop}>
        {board.map((image, index) => (
          <div
            className='board-image'
            key={image.ID}
            style={{ position: 'absolute', left: index * 100, top: 0, cursor: 'pointer' }}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('image', image.ID);
              e.dataTransfer.setData('dragIndex', index);
              e.target.style.cursor = 'grabbing';
            }}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => moveImage(Number(e.dataTransfer.getData('dragIndex')), index)}
          >
            <img src={image.Image} alt={`Image ${index}`} style={{ width: '80px', height: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DragDrop;
