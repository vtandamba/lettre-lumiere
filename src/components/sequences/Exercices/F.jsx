import React, { useState } from "react";
import { DragDropContext, Droppable,  Draggable  } from 'react-beautiful-dnd';

const F = (props) => {
  const {data} = props;
  const [tabItems, setTabItems] = useState(data?.exo_choices);
  return <DragDropContext>
     <Droppable droppableId="characters">
      {(provided) => (
        <ul className="characters">
        
        </ul>
      )}
    </Droppable>
</DragDropContext>
}

export default F;