import React from 'react';
import { useDrag } from 'react-dnd';

const Picture = ({ id, image }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'image',
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (

        <div
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', marginBottom: '8px' }}
        >
            <img src={image} alt={`Picture ${id}`}  style={{ width: '150px', border: '5px solid transparent' }} />
        </div>
    );
};

export default Picture;
