import React, { useEffect, useState } from "react";
import Drag from "../../Drag";



const H = (props) => {

    const { data, fileNotFound } = props;
    const [tabItems, setTabItems] = useState(JSON.parse(data.exo_choices));
    const [allData, setAllData] = useState();

    // Tableaux d'éléments droppables
    const dummyData = [
        {
            id: 1,
            name: "List 1",
            cards: tabItems.map((el, index) => {
                return {
                    id: index,
                    name: el.value
                }
            })
        },
        { id: 2, name: "List 2", cards: [
            {
                id:14414,
                name:"la"
            }
        ] },
    ];

    useEffect(() => {
        setAllData(dummyData)
    }, [])

    function handleDrop({ dragItem, dragType, drop }) {
        // do something
        if (dragType === "card" && drop) {
            // get the drop position as numbers
            let [newListPosition, newCardPosition] = drop.split("-").map((string) => parseInt(string));
            // create a copy for the new data
            let newData = structuredClone(allData); // deep clone
            // find the current positions
            let oldCardPosition;
            let oldListPosition = allData.findIndex((list) => {
              oldCardPosition = list.cards.findIndex((card) => card.id === dragItem);
              return oldCardPosition >= 0;
            });

            // get the card
            let card = allData[oldListPosition].cards[oldCardPosition];
            // if same array and current position before drop reduce drop position by one
            if (newListPosition === oldListPosition && oldCardPosition < newCardPosition) {
              newCardPosition--; // reduce by one
            }
            // remove the card from the old position
            newData[oldListPosition].cards.splice(oldCardPosition, 1);
            // put it in the new position
            newData[newListPosition].cards.splice(newCardPosition, 0, card);
            // update the state
            setAllData(newData);
          }
    };

    return <>
        <h2 className="exercice__consigne">{data.exo_consigne}</h2>

        <div>
            {/* Ajoutez le DropZone ici */}
         
        </div>

        <Drag handleDrop={handleDrop}>
            {({ activeItem, activeType, isDragging }) => (
                <div className="exercice__dragArea">
                {allData && allData.map((list, listPosition) => (
                    <ul key={list.id} className="list">
                    {list.cards.map((card, cardPosition) => (
                        <Drag.DropZone key={card.id} dropId={`${listPosition}-${cardPosition}`} dropType="card" remember={true}>
                            
                        <Drag.DropGuide dropId={`${listPosition}-${cardPosition}`} className="rounded-lg bg-gray-200 h-24 m-2" dropType="card" />
                        <Drag.DragItem key={card.id} dragId={card.id} className={`cursor-pointer ${activeItem === card.id && activeType === "card" && isDragging ? "hidden" : "translate-x-0"}`} dragType="card">
                            <li className={`list__item cursor-pointer ${activeItem === card.id && activeType === "card" && isDragging ? "hidden" : ""} ${activeItem === card.id && activeType === "card" ? "rotate-6" : ""}`}>
                            {card.name}
                            </li>
                        </Drag.DragItem>
                        </Drag.DropZone>
                    ))}
                    <Drag.DropZone key={`${listPosition}-drop`} dropId={`${listPosition}-${allData[listPosition]?.cards.length}`} dropType="card" remember={true}>
                        <div className="border-t-2 border-dashed border-gray-400 h-2 w-full"></div>
                        <Drag.DropGuide dropId={`${listPosition}-${allData[listPosition]?.cards.length}`} className="rounded-lg bg-gray-200 h-24 m-2" dropType="card" />
                        <div className="border-t-2 border-dashed border-pink-400 h-2 w-full"></div> {/* Trait après DropGuide */}
                    </Drag.DropZone>
                    </ul>
                ))}
                </div>
            )}
            </Drag>



    </>
}

export default H;
