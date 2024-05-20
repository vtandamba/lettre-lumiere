import React, { useEffect, useState } from "react";
import speak from "../../../hooks/useSpeak";
import { getElementRandom } from "../../../hooks/useRandom";
import ButtonValid from "../../ButtonValid";


const D = (props) => {
  
    const { data, onAttemptMade, score, imgNotFound } = props;
    const [item, setItem] = useState();
    const [allItemsWithStyles, setAllItemsWithStyles] = useState(data?.choice);
    const [tabResponses, setTabResponses] = useState(new Array(allItemsWithStyles.length).fill(null));
    const [attemptCount, setAttemptCount] = useState(0);
    const [answerAlreadyTaken, setAnswerAlreadyTaken] = useState([]);

    const shuffleArray = (array) => { //Algorithme de mélange de Fisher-Yates 
        for (let i = array?.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const prepareItemsWithoutShuffling = (items) => {
        return items.flatMap(item => [
          { ...item, style: "list__item--uppercase", value: item.value.toUpperCase() },
          { ...item,style: "list__item--lowercase", value: item.value },
          { ...item,style: "list__item--belleallure", value: item.value }
        ]);
      };
   


      useEffect(() => {
        const init = () => {
          let choices = data?.choice.map(el => ({
            value: el.value,
            image: el.image,
            state: 'initial',
            isAlreadyChosen: false
          }));
    
          shuffleArray(choices); // Mélangez les choix en place
          choices = [...choices]; // Créez une nouvelle référence pour le tableau
         
      
          let newItem = getElementRandom(data?.choice);
          while (answerAlreadyTaken.includes(newItem)) {
              const filteredChoices = data?.choice.filter(choice => !answerAlreadyTaken.includes(choice));
              newItem = getElementRandom(filteredChoices);
          }
   
          setItem({...newItem, isAlreadyChosen:false});


            choices = prepareItemsWithoutShuffling(choices);
            shuffleArray(choices);//Faire un shuffle pour les différents éléments du tableau
            setAllItemsWithStyles(choices);
  
        };
      
        if (data) {
            init();  
        }
    }, [data]);

  

            
    useEffect(() => {
       
        if (item)
        {
            speak(item.value);
           
        }      
    }, [item])

 
    useEffect(() => {
        if (attemptCount  === tabResponses.length){
            onAttemptMade(); //Passser à l'exercice suivant
          
            const scorePercent = tabResponses.filter(el => el === true).length / tabResponses.length * 100; //Calule le score final basé sur le nombre de true
            score(scorePercent); // Envoyer le score au composant parent
           
        }
     
    }, [attemptCount, tabResponses.length])

    const handleChooseResponse = () => {
        if (attemptCount < tabResponses.length) {
            const allItemsChosen = allItemsWithStyles.filter(el => el.state === 'choosen');
          
            if (allItemsChosen.length > 0) {

                const updatedItems = allItemsWithStyles.map(el => {  //Mettre à vrai ou faux les items correspondant
                   
                    if (el.state === 'choosen') {
                        return {
                            ...el,
                            state: el.value.toLowerCase() === item.value.toLowerCase() ? 'true' : 'false',
                        };
                    } else {

                        return {
                            ...el,
                            state: el.value.toLowerCase() === item.value.toLowerCase() ? 'true' : el.state,
                        };
                    }
                });
                setAllItemsWithStyles(updatedItems); //L'assigner pour le nouvel affichage
    
                const timeOutId = setTimeout(() => {
                    setTabResponses(prev => {
                        const newTabResponses = [...prev];
                        newTabResponses[attemptCount] = allItemsChosen.some(el => el.value.toLowerCase() === item.value);
                        return newTabResponses;
                    });
        
                    setAttemptCount(prevCount => {
                        if (prevCount + 1 < tabResponses.length) {
                            //Prochain essaie
                            setItem(getElementRandom(data?.choice));
                        }
                        return prevCount + 1;
                    });
        
                    resetAllItemsState();
                }, 1000);
                return ()=> clearTimeout(timeOutId)
            }
        }
    };

    function resetAllItemsState() {
        setAllItemsWithStyles(currentItems =>
            currentItems.map(item => ({ ...item, state: 'initial' }))
        );
    }


 

    const clickResponse = (clickedIndex) => {
       
        const allItemsChosen = allItemsWithStyles.filter(el => el.state === 'choosen');
            if (allItemsChosen.length < 3){
                setAllItemsWithStyles(currentItems =>
                    currentItems.map((item, index) => {
                    if (index === clickedIndex){
                        return {
                            ...item,
                            state: item.state === 'initial' ? 'choosen' : 'initial',
                        };
                    }
                        return item;
                    })
                
                );
            }
    };


    return <React.Fragment>
             
                {data.exo_type === "D1" 
                                ? <p className="exercice__sound" onClick={()=>speak(item.value)}>?</p> 
                                : <img src={`http://lettrelumiere.localhost:8000/${item?.file}`} 
                                       alt="item" 
                                       className="exercice__img"
                                       onClick={()=>speak(item.value)}
                                       onError={(evt)=>{ evt.target.src = imgNotFound}}
                />}
                <ul className="list">
                    {allItemsWithStyles?.map((item, index) => (
                        
                        <li className={`list__item ${item.style} ${item.state}`} 
                            key={index} 
                            onClick={()=>clickResponse(index)}
                        >
                            {item.value}
                        </li>
                    ))}
                </ul>


                <div className="exercice__footer">
                    <ul className="progress">
                        {tabResponses.map(response => (
                            <li className={`${response === null ? 'progress__part' : response === true ? 'progress__part progress__part--true' : 'progress__part progress__part--false'}`}></li>
                        ))}
                    </ul>
                    <ButtonValid handleClick={handleChooseResponse} />
                </div>
            </React.Fragment>
}

export default D;