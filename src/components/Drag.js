import React from 'react';

// sub-components
import DragItem from './DragItem';
import DropZone from './DropZone';
import DropZones from './DropZones';
import DropGuide from './DropGuide';

// context for the drag
export const DragContext = React.createContext();

// drag context component
function Drag({ draggable = true, handleDrop, children }) {
  const [dragItem, setDragItem] = React.useState(null); 
  const [dragType, setDragType] = React.useState(null); 
  const [isDragging, setIsDragging] = React.useState(null); 
  const [drop, setDrop] = React.useState(null); 

  React.useEffect(() => {
    if (dragItem) {
      document.body.style.cursor = "grabbing"; 
    } else {
      document.body.style.cursor = "default"; 
    }
  }, [dragItem]); 
  
  const dragStart = function(e, dragId, dragType) {
    e.stopPropagation();
    e.dataTransfer.effectAllowed = 'move';
    setDragItem(dragId);
    setDragType(dragType);
  };

  const drag = function(e, dragId, dragType) {
    e.stopPropagation();
    setIsDragging(true);
  };

  const dragEnd = function() {
    setDragItem(null);
    setDragType(null);
    setIsDragging(false);
    setDrop(null);
  };

  const onDrop = function(e) {
    e.preventDefault();
    handleDrop({ dragItem, dragType, drop });
    setDragItem(null);
    setDragType(null);
    setIsDragging(false);
    setDrop(null);
  };

  return (
    <DragContext.Provider value={{ draggable, dragItem, dragType, isDragging, dragStart, drag, dragEnd, drop, setDrop, onDrop }}>
      { typeof children === "function" ? children({ activeItem: dragItem, activeType: dragType, isDragging }) : children }
    </DragContext.Provider>
  );
};

// export Drag and assign sub-components
export default Object.assign(Drag, { DragItem, DropZone, DropZones, DropGuide });