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
                id:78741,
                name:"mais"
            }
        ] },
    ];

    useEffect(() => {
        setAllData(dummyData)
    }, [])

    function handleDrop({ dragItem, dragType, drop }) {
        console.log(drop)
        if (dragType === "card" && drop) { // Vérifiez que `drop` n'est pas null
          // get the drop position as numbers
          console.log(drop)
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
        else {
          // Gérez le cas où `drop` est null, peut-être en affichant une alerte ou en ne faisant rien
          console.log("Drop information is missing or incorrect.");
        }
      };
      

    return <>
        <h2 className="exercice__consigne">{data.exo_consigne}</h2>

                            {/* Autre drag n drop */}
                            <Drag handleDrop={handleDrop}>
      {({ activeItem, activeType, isDragging }) => (
        <div>
          {allData.map((list, listPosition) => (
            <div className="exercice__dragArea" key={list.id}>
              <ul className="rounded-xl bg-pink-700 p-2 mx-2 my-5 w-80 shrink-0 grow-0 shadow list">
                {list.cards.map((card, cardPosition) => (
                  <Drag.DropZones key={card.id} prevId={`${listPosition}-${cardPosition}`} nextId={`${listPosition}-${cardPosition + 1}`} dropType="card" remember={true}>
                    <Drag.DropGuide dropId={`${listPosition}-${cardPosition}`} className="rounded-lg bg-gray-200 h-24 m-2" dropType="card" />
                    <Drag.DragItem dragId={card.id} className={`cursor-pointer ${activeItem === card.id && activeType === "card" && isDragging ? "hidden" : "translate-x-0"}`} dragType="card">
                      <li className={`list__item cursor-pointer ${activeItem === card.id && activeType === "card" && isDragging ? "hidden" : ""} ${activeItem === card.id && activeType === "card" ? "rotate-6" : ""}`}>
                        {card.name}
                      </li>
                    </Drag.DragItem>
                  </Drag.DropZones>
                ))}
                <Drag.DropZone dropId={`${listPosition}-${list.cards.length}`} dropType="card" remember={true}>
                  <Drag.DropGuide dropId={`${listPosition}-${list.cards.length}`} className="rounded-lg bg-gray-200 h-24 m-2" dropType="card" />
                </Drag.DropZone>
              </ul>
              <Drag.DropZone dropId={`${listPosition}-${list.cards.length}`} className="grow" dropType="card" remember={true} />
            </div>
          ))}
        </div>
      )}
    </Drag>



    </>
}

export default H;
