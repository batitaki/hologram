import React, { useState, useEffect } from 'react';
import Picture from './Picture';
import { useDrop } from 'react-dnd';
import { fetchMedia } from '../../../../services/mediaAPI';
import './DragAndDropProvider.css';

function DragDrop() {
    const [board, setBoard] = useState([]);
    const [media, setMedia] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMedia();
                setMedia(data);
            } catch (error) {
                console.error('Error fetching media:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, []);

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
        // Almacena media en el almacenamiento local cuando se actualiza
        localStorage.setItem('media', JSON.stringify(media));
    }, [media]);

    const addImageToBoard = (id) => {
        // Obtener los datos de media del almacenamiento local
        const storedMedia = JSON.parse(localStorage.getItem('media'));
        const selectedImage = storedMedia.find((image) => image.ID === id);
        if (selectedImage) {
            setBoard((prevBoard) => [...prevBoard, selectedImage]);
        } else {
            console.error('Image not found with ID:', id);
            // Aquí puedes manejar el caso en el que no se encuentra la imagen
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

    console.log("media outside addImageTo board", media);

    return (
        <div className="ccib">
            <div className="columns-photos-container">
                <div className="photos">
                    {media.map((image) => (
                        <div className="" key={image.ID}>
                            <Picture id={image.ID} image={image.Image} />
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
