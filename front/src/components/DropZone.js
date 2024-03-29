import React from 'react';

// context
import {DragContext} from './Drag';

// listens for drags over drop zones
function DropZone({ as, dropId, dropType, remember, style, children, ...props }) {
  const { dragItem, dragType, setDrop, drop, onDrop } = React.useContext(DragContext);
  
  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
      console.log("Drag Over DropZone: ", dropId);
    }
    return false;
  };

  function handleLeave() {
    if (!remember) {
      setDrop(null); 
    }
  };

  const handleDragEnter = (e) => {
    if (dragItem && dropType === dragType) {
      setDrop(dropId);
      // Log pour voir quand et quel dropId est défini
      console.log("Drag Enter, setting drop: ", dropId);
    }
  };


  let Component = as || "div";
  return ( 
    <Component onDragEnter={handleDragEnter} onDragOver={handleDragOver}  onDrop={onDrop} style={{position: "relative", ...style}} {...props}>
      { children }
      { drop === dropId && <div style={{position: "absolute", inset: "0px"}} onDragLeave={handleLeave}></div> }
    </Component>
  );
};

export default DropZone;
