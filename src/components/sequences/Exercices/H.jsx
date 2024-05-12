import React, { useEffect, useState } from "react";
import Drag from "../../Drag";
import { getElementRandom, shuffleArray } from "../../../hooks/useRandom";
import checkIcon from '../../../assets/images/check.svg'
import speak from "../../../hooks/useSpeak";
import speaker from '../../../assets/images/haut-parleur.svg'
import ButtonValid from "../../ButtonValid";


const H = (props) => {

    const { data, imgNotFound , score, onAttemptMade} = props;
    const [tabItems, setTabItems] = useState(data?.choice);
    const [answer, setAnswer] = useState();
    const [attemptCount, setAttemptCount] = useState(0);
    const [showModel, setShowModel] = useState(false);
    const [allData, setAllData] = useState([]);
    const words = ["exemple", "vélo", "test", "barbe", "consumer", "fléchir", "provoquer"];

    // État pour stocker les réponses (tentatives) de l'utilisateur
    const [tabResponses, setTabResponses] = useState(new Array(5).fill(null));

    const initializeGame = () => {
      const randomWord = getElementRandom(words);
      setAnswer(randomWord);

      const letters = randomWord.split('');
      const firstLetter = letters.shift(); // Supprime la première lettre du mot
      const shuffledLetters = shuffleArray(letters); // Mélange les lettres restantes

      setAllData([
          { id: 1, name: "List 1", cards: shuffledLetters.map((letter, index) => ({ id: index + 1, name: letter })) },
          { id: 2, name: "List 2", cards: [{ id: 115, name: firstLetter }] },
      ]);
  };




    useEffect(() => {
         initializeGame();
    }, [tabResponses])

    useEffect(() => {
      if (attemptCount  === tabResponses.length){
          onAttemptMade(); //Passser à l'exercice suivant
          console.log('essaies terminés');
          const scorePercent = tabResponses.filter(el => el === true).length / tabResponses.length * 100; //Calule le score final basé sur le nombre de true
          score(scorePercent); // Envoyer le score au composant parent
         
      }
   
  }, [attemptCount, tabResponses.length])

  useEffect(() => {
       
    if (answer)
    {
        speak(answer);
    }      
}, [answer])

    const handleSubmit = (event) => {

      if (attemptCount < tabResponses.length) {

        event.preventDefault();
      
        const isCorrect = allData[1].cards
                                    .map(el => el.name)
                                    .join('')
                                    .toUpperCase() === answer.toUpperCase();
        console.log('reponse correcte', isCorrect);
      

        const newTabResponses = [...tabResponses];
        newTabResponses[attemptCount] = isCorrect;
        setTabResponses(newTabResponses);
        setAttemptCount(attemptCount + 1);
      
        if (data.exo_type.startsWith('H')){
          setShowModel(true);
          const timer = setTimeout(() => {
              if (answer) {
                  setShowModel(false);
                  speak(answer);
              }
          }, 3000);
          return () => clearTimeout(timer);
        }
      }
      
  };

    function handleDrop({ dragItem, dragType, drop }) {
        console.log(drop)
        if (dragType === "card" && drop) { // Vérifier que `drop` n'est pas null
          
          console.log(drop)
          let [newListPosition, newCardPosition] = drop.split("-").map((string) => parseInt(string));
          
          // Copie des données
          let newData = structuredClone(allData); // deep clone
          // Trouver la current position
          let oldCardPosition;
          let oldListPosition = allData.findIndex((list) => {
            oldCardPosition = list.cards.findIndex((card) => card.id === dragItem);
            return oldCardPosition >= 0;
          });
      
          // Trouver la card
          let card = allData[oldListPosition].cards[oldCardPosition];
         
          if (newListPosition === oldListPosition && oldCardPosition < newCardPosition) {
            newCardPosition--; 
          }
          
          newData[oldListPosition].cards.splice(oldCardPosition, 1);
       
          newData[newListPosition].cards.splice(newCardPosition, 0, card);
         
          setAllData(newData);
        }
        else {
          
          console.log("Drop information is missing or incorrect.");
        }
      };
      

return (
  <>
   
      {data.exo_type !== "H1" 
                                ? <p className="exercice__sound" onClick={()=>speak(answer)}>?</p> 
                                : <img src={`https://mtsene.lpmiaw.univ-lr.fr/lettrelumiere/public/images/choices${answer?.value}.jpg`} 
                                       alt="item" 
                                       className="exercice__img"
                                       onClick={()=>speak(answer.value)}
                                       onError={(evt)=>{ evt.target.src = imgNotFound}}
                />
             
                }
      {
          showModel && <p className="list__item">{answer}</p>
      }
      <div className="p-10 flex flex-col max-w-full">
        
        <Drag handleDrop={handleDrop}>
          {({ activeItem, activeType, isDragging }) => (
            <Drag.DropZone className="flex flex-col justify-center items-center -mx-2 ">
              {allData && allData?.map((list, listPosition) => {
                return (
                  <React.Fragment key={list.id}>
                    <Drag.DropZone dropId={listPosition} dropType="list" remember={true}>
                      <Drag.DropGuide dropId={listPosition} dropType="list" className="rounded-xl bg-gray-200 h-96 mx-2 my-5 shrink-0 grow-0" />
                    </Drag.DropZone>
                    <Drag.DropZones className="flex flex-row justify-center items-center" prevId={listPosition} nextId={listPosition+1} dropType="list" split="x" remember={true}>
                      <Drag.DragItem dragId={list.id} className={`cursor-pointer flex ${activeItem === list.id && activeType === "list" && isDragging ? "hidden" : "translate-x-0"}`} dragType="list">
                        <ul name={list.name}  className={`list rounded-xl bg-gray-100  my-5 shadow${ activeItem === list.id && activeType === "list" ? " rotate-6" : ""}`}>
                          {allData[listPosition].cards.map((card, cardPosition) => {
                            return (
                              <Drag.DropZones key={card.id} prevId={`${listPosition}-${cardPosition}`} nextId={`${listPosition}-${cardPosition+1}`} dropType="card" remember={true}>
                                <Drag.DropGuide dropId={`${listPosition}-${cardPosition}`} className="rounded-lg bg-gray-200 w-24 m-2" dropType="card" />
                                <Drag.DragItem dragId={card.id} className={`cursor-pointer ${activeItem === card.id && activeType === "card" && isDragging ? "hidden" : "translate-x-0"}`} dragType="card">
                                  <li className={`list__item rounded-lg bg-white border border-gray-300 shadow-sm p-5 m-2${ activeItem === card.id && activeType === "card" ? " rotate-6" : ""}`}>
                                    {card.name}
                                  </li>
                                </Drag.DragItem>
                              </Drag.DropZones>
                            );
                          })}
                          <Drag.DropZone dropId={`${listPosition}-${allData[listPosition].cards.length}`} dropType="card" remember={true}>
                            <Drag.DropGuide dropId={`${listPosition}-${allData[listPosition].cards.length}`} className="rounded-lg bg-gray-200 w-24 m-2" dropType="card" />
                          </Drag.DropZone>
                        </ul>
                      </Drag.DragItem>
                      <Drag.DropZone dropId={`${listPosition}-${allData[listPosition].cards.length}`} className="grow" dropType="card" remember={true} />
                    </Drag.DropZones>
                  </React.Fragment>
                );
              })}
              <Drag.DropZone dropId={allData?.length} dropType="list" remember={true}>
                <Drag.DropGuide dropId={allData?.length} dropType="list" className="rounded-xl bg-gray-200 mx-2 my-5 w-80 shrink-0 grow-0" />
              </Drag.DropZone>
            </Drag.DropZone>
          )}
        </Drag>

        </div>
            <div className="exercice__footer">
            <ul className="progress">
                {tabResponses.map((response, index) => (
                    <li key={index} className={`${response === null ? 'progress__part' : response === true ? 'progress__part progress__part--true' : 'progress__part progress__part--false'}`}></li>
                ))}
            </ul>
            <ButtonValid handleClick={handleSubmit} />
      </div>
  </>
);


}

export default H;
