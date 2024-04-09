import React, { useEffect, useRef, useState } from "react";
import { getElementRandom } from "../../../hooks/useRandom";
import speak from "../../../hooks/useSpeak";
import checkIcon from '../../../assets/images/check.svg'
import speaker from '../../../assets/images/haut-parleur.svg'

const E = (props) => {
    const { data, onAttemptMade, score, imgNotFound } = props;
    const [item, setItem] = useState(); //Valeur de l'item courant
    const [input, setInput] = useState("");//valeur de l'input
    const [attemptCount, setAttemptCount] = useState(0);  //Nombre de tâches
    const [tabResponses, setTabResponses] = useState(new Array(data?.choice.length).fill(null));
    const [answerAlreadyTaken, setAnswerAlreadyTaken] = useState([]);
    const inputRef = useRef(null); // Référence à l'élément d'entrée

    useEffect(() => {
        if (item){
            speak(item.value);
        }
       
    }, [item])

    useEffect(() => {

      
        const init = () => {
            if (attemptCount === tabResponses.length) {
                const scorePercent = tabResponses.filter(el => el === true).length / tabResponses.length * 100; //Calule le score final basé sur le nombre de true
                score(scorePercent);
                onAttemptMade(); 
            }else if(attemptCount  < tabResponses.length) {
                setItem(getElementRandom(data?.choice.filter(el => {
                    return answerAlreadyTaken.map(it => it.value)
                                             .includes(el.value) === false;
                })));
              
                if (item){
                    const tabAnswerAlreadyTaken = answerAlreadyTaken;
              
                    tabAnswerAlreadyTaken.push(item);
               
                    setAnswerAlreadyTaken(tabAnswerAlreadyTaken)
                }
            }
        }
       
        init();
      
    }, [attemptCount, onAttemptMade, tabResponses.length]);

    const handleChange = (evt) => {
        const inputText = evt.target.value;

        if (item.chosenSyllable){
            if (inputText.length < input.length) {
                setInput(input.replace(/[^_]/g, '_')); // Remplace tous les caractères non-trait par des traits
                return;
            }
            
            // Obtient le dernier caractère saisi
            const lastChar = inputText.slice(-1);
        
            // Trouve le premier trait de soulignement dans l'entrée actuelle
            const firstUnderscoreIndex = input.indexOf('_');
        
            if (firstUnderscoreIndex !== -1) {
                // Construit la nouvelle chaîne avec le trait remplacé par le dernier caractère saisi
                let updatedInput = input.substring(0, firstUnderscoreIndex) + lastChar + 
                                   input.substring(firstUnderscoreIndex + 1);
        
                
                if (!updatedInput.includes('_')) {
                    
                }
        
                setInput(updatedInput);
            }
        }else{
             setInput(evt.target.value)
        }
     
    };
    

    useEffect(() => {
        if (item && item.chosenSyllable){
            speak(item.value);
            if (data.exo_type === "E2 bis" && item.chosenSyllable) {
                    setInput(
                        item?.value.replace(new RegExp(`[^${item?.chosenSyllable}]`, "gi"), "_")
                    )
            }
        }

    }, [item, data.exo_type]);


    const handleSubmit = (event) => {
        event.preventDefault();
        
    
        const finalInput = input.endsWith('_') ? input.slice(0, -1) : input;
        const isCorrect = finalInput.trim().toUpperCase() === item.value.toUpperCase();
        
        const newTabResponses = [...tabResponses];
        newTabResponses[attemptCount] = isCorrect;
        setTabResponses(newTabResponses);
        setAttemptCount(attemptCount + 1);
    
        setInput(""); // Réinitialise l'input après avoir entré sa réponse
    };
    

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace') {
            const lastUnderscoreIndex = input.lastIndexOf('_'); 
            if (lastUnderscoreIndex !== -1) { // Vérifie si une occurrence a été trouvée
                const newInput = input.substring(0, lastUnderscoreIndex) + '_' + input.substring(lastUnderscoreIndex + 1); // Supprime la dernière occurrence du caractère "_"
                setInput(newInput); // Met à jour l'input avec la nouvelle chaîne
            }
        }
    };

    return <React.Fragment>
                 <div  className="exercice__consigne">
                    <img src={speaker} alt="" />
                    <h1>{data?.exo_instruction}</h1>
                </div>
                <div className="group">
                {data.exo_type !== "E1" && 
                <img src={'https://mtsene.lpmiaw.univ-lr.fr/lettrelumiere/public/images/choices/' + item?.file } 
                                             alt="" 
                                             className="exercice__img"  
                                        
                                             onClick={() => speak(item.value)}
                                             
                                             onError={(e) => {
                                                e.target.src = imgNotFound;
                                              }}/>}
                    <p className="exercice__sound" 
                       onClick={() => speak(item.value)}>
                        ?
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="exercice__form">
                    <input type="text" 
                           value={input}
                           className="exercice__input" 
                           onKeyDown={(event) => handleKeyDown(event)}
                      
                           onChange={(evt) => handleChange(evt)} 
                           autoFocus />
                </form>
                <div className="exercice__footer">
                    <ul className="progress">
                        {tabResponses.map((response, index) => (
                            <li key={index} className={`${response === null ? 'progress__part' : response === true ? 'progress__part progress__part--true' : 'progress__part progress__part--false'}`}></li>
                        ))}
                    </ul>
                    <button type="submit" className="exercice__valid" onClick={handleSubmit}>Ok <img src={checkIcon} alt="ok" /></button>
                </div>
            </React.Fragment>
}

export default E;
