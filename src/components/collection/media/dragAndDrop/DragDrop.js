import React, { useState, useEffect } from 'react';
import Picture from './Picture';
import { useDrop } from 'react-dnd';
import { getMediaByUser } from '../../../../services/mediaAPI'; 
import './DragAndDropProvider.css';

function DragDrop( { userId } ) {
    const [board, setBoard] = useState([]);
    const [userMedia, setUserMedia] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUserMedia = async () => {
            try {
                const mediaDataByUser = await getMediaByUser(userId);
                setUserMedia(mediaDataByUser);
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
        const userMedia = JSON.parse(localStorage.getItem('userMedia'));
       const selectedImage = userMedia.find((image) => image.ID === id);
        if (selectedImage) {
            setBoard((prevBoard) => [...prevBoard, selectedImage]);
        } else {
            console.error('Image not found with ID:', id);
        }
    };
    
    
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'image',
        drop: (item) => {
            addImageToBoard(item.id);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Calculating the number of columns and dividing the media into three parts
    const columnsCount = 3;
    const columnSize = Math.ceil(userMedia.length / columnsCount);
    const mediaColumns = Array.from({ length: columnsCount }).map((_, columnIndex) =>
        userMedia.slice(columnIndex * columnSize, (columnIndex + 1) * columnSize)
    );

    return (
        <div className="media-container">
            <div className="photos">
                <div className="columns-photos-container">
                    {mediaColumns.map((column, columnIndex) => (
                        <div className="column-photo" key={columnIndex}>
                            {column.map((image) => (
                                <div className="" key={image.ID}>
                                    <Picture id={image.ID} image={image.Image} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="board" ref={drop}>
                {board.map((image) => (
                    <div className="board-picture" key={image.ID}>
                        <Picture id={image.ID} image={image.Image} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DragDrop;