import React, { useEffect, useState } from "react";
import speak from "../../../hooks/useSpeak";
import ButtonValid from "../../ButtonValid";
import { getElementRandom } from "../../../hooks/useRandom";


const C = (props) => {
    const { data, onAttemptMade, score, imgNotFound} = props;

    const [tabItems, setTabItems] = useState([]);
    const [answer, setAnswer] = useState();
    const [input, setInput] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);
    const [tabResponses, setTabResponses] = useState(new Array(data?.choice.length).fill(null));
    const [attemptCount, setAttemptCount] = useState(0);


    useEffect(() => {
        if (data?.choice) {
            const initialTabItems = data.choice.map(el => ({
                value: el.value,
                file: el.file,
                isAlreadyChosen: false,
            }));
            setTabItems(initialTabItems);
            selectNewAnswer(initialTabItems);
        }
    }, [data?.choice]); 
    

    const selectNewAnswer = (items) => {
        if (attemptCount === tabResponses.length && attemptCount !== 0) {
            onAttemptMade();
            const scorePercent = tabResponses.filter(el => el === true).length / tabResponses.length * 100;
            score(scorePercent);
        } else {
            // Filtrer les réponses qui n'ont pas encore été choisies
            const availableChoices = items.filter(el => !el.isAlreadyChosen);
            if (availableChoices.length > 0) {
                const newAnswer = getElementRandom(availableChoices);
                setAnswer(newAnswer);
                speak(newAnswer.value);
                setShowAnswer(true); // Affiche la réponse après 3 secondes
                const timer = setTimeout(() => {
                    setShowAnswer(false);
                }, 3000);
    
                // Marquer la réponse comme choisie
                setTabItems(prevItems => prevItems.map(item => {
                    if (item.value === newAnswer.value) {
                        return { ...item, isAlreadyChosen: true };
                    }
                    return item;
                }));
    
                return () => clearTimeout(timer);
            }
        }
    };
    



    // Initialise l'input en mettant des _ ou il faut
    useEffect(() => {
        let initialInput = "";
        
        if (answer?.chosenSyllable) { // Vérifie s'il contient la propriété adéquate
            initialInput = answer?.value.split('').map(char => 
                answer?.chosenSyllable.includes(char) ? '_' : char
            ).join('');
        } else {
            initialInput = answer?.value.replace(/./g, '_');
        }
        
        setInput(initialInput);
        speak(answer?.value);
    }, [answer]); 

    

    const handleInputChange = (evt) => {
        const inputText = evt.target.value;

     
            
            if (inputText.length < input.length) {
                setInput(input.replace(/[^_]/g, '_')); 
                return;
            }
            
            const lastChar = inputText.slice(-1);
            const firstUnderscoreIndex = input.indexOf('_');
        
            if (firstUnderscoreIndex !== -1) {
                let updatedInput = input.substring(0, firstUnderscoreIndex) + lastChar + 
                                   input.substring(firstUnderscoreIndex + 1);
        
        
                setInput(updatedInput);
            }
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();

        const finalInput = input.endsWith('_') ? input.slice(0, -1) : input;
        const isCorrect = finalInput.trim().toUpperCase() === answer?.value.toUpperCase();

        const newTabResponses = [...tabResponses];
        newTabResponses[attemptCount] = isCorrect;
        setTabResponses(newTabResponses);
        setAttemptCount(attemptCount + 1);

        setTabItems(prevItems => prevItems.map(item => {
            if (item.value === answer?.value) {
                return { ...item, isAlreadyChosen: true };
            }
            return item;
        }));

        setInput(""); // Réinitialise l'input après avoir entré sa réponse
        selectNewAnswer(tabItems);
    };


    
    const handleKeyDown = (event) => {
        if (event.key === 'Backspace') {
            event.preventDefault(); 
    
            // Trouve l'index à partir duquel commencer à effacer (le dernier caractère non '_' ou le début)
            let indexToErase = input.split('').lastIndexOf('_') - 1;
            indexToErase = indexToErase >= 0 ? indexToErase : input.length - 1;
            const newInput = input.split('').map((char, index) => {
                if (index === indexToErase) {
                    return '_'; 
                }
                return char; 
            }).join('');
    
            setInput(newInput);
        }
    };
    
    return (
        <React.Fragment>
       
            <div>
                
                    {showAnswer ? <div>
                                        {  data.exo_type !== "C1" && <img src={`https://mtsene.lpmiaw.univ-lr.fr/lettrelumiere/public/${answer?.file}`} 
                                                                      alt={answer?.value}
                                                                      className="exercice__img"
                                                                      style={{marginBottom:'1rem'}}
                                                                      onError={(e) => {
                                                                        e.target.src = imgNotFound;
                                                                      }}/>}
                                      
                                        <p className="list__item">{answer?.value}</p>
                                    </div> 
                                 : <form onSubmit={handleSubmit} className="exercice__form">
                                     <input type="text" 
                                    value={input}
                                    className="exercice__input" 
                                    onKeyDown={(event) => handleKeyDown(event)}
                                
                                    onChange={(evt) => handleInputChange(evt)} 
                                    autoFocus />
                                  </form>
                    }
                
            </div>

            <div className="exercice__footer">
                <ul className="progress">
                    {tabResponses.map((response, index) => (
                        <li key={index} className={`${response === null ? 'progress__part' 
                                                            : response === true 
                                                            ? 'progress__part progress__part--true' 
                                                            : 'progress__part progress__part--false'}`}></li>
                    ))}
                </ul>
                    <ButtonValid handleClick={handleSubmit} />
            </div>
        </React.Fragment>
    );
}

export default C;
