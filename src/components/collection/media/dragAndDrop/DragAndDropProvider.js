import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './DragAndDropProvider.css';

const DragAndDropProvider = ({ children }) => {
  return (
    <div className="centered-container">
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </div>
  );
};

export default DragAndDropProvider;
