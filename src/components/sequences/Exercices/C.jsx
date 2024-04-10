import React, { useEffect, useState } from "react";
import speak from "../../../hooks/useSpeak";
import checkIcon from '../../../assets/images/check.svg'
import speaker from '../../../assets/images/haut-parleur.svg'


const C = (props) => {
    const { data, onAttemptMade, score, imgNotFound} = props;
    const [syllabes, setSyllabes] = useState( data?.choice);
    const [currentSyllabeIndex, setCurrentSyllabeIndex] = useState(0);
    const [input, setInput] = useState("");
    const [showSyllabe, setShowSyllabe] = useState(true);
    const [tabResponses, setTabResponses] = useState(new Array(syllabes.length).fill(null));
    const [attemptCount, setAttemptCount] = useState(0);

    

    useEffect(() => {
       
         if (attemptCount === tabResponses.length && attemptCount !== 0) {
            onAttemptMade(); // Passe à l'exercice suivant immédiatement
            const scorePercent = tabResponses.filter(el => el === true).length / tabResponses.length * 100; //Calule le score final basé sur le nombre de true
       
            score(scorePercent);
        }
        else {
            setShowSyllabe(true);
            const timer = setTimeout(() => {
                if (syllabes) {
                    setShowSyllabe(false);
                    speak(syllabes[currentSyllabeIndex].value);
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [attemptCount, syllabes, currentSyllabeIndex,  tabResponses]);


    // Initialise l'input en mettant des _ ou il faut
    useEffect(() => {
        let initialInput = "";
        const currentSyllabe = syllabes[currentSyllabeIndex];
        if (currentSyllabe?.chosenSyllable) {
            initialInput = currentSyllabe.value.split('').map(char => 
                currentSyllabe.chosenSyllable.includes(char) ? '_' : char
            ).join('');
        } else {
            initialInput = currentSyllabe.value.replace(/./g, '_');
        }
        
        setInput(initialInput);
        speak(currentSyllabe.value);
    }, [syllabes, currentSyllabeIndex]); 

    

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
        const isCorrect = finalInput.trim().toUpperCase() === syllabes[currentSyllabeIndex]?.value.toUpperCase();
        
        const newTabResponses = [...tabResponses];
        newTabResponses[attemptCount] = isCorrect;
        setTabResponses(newTabResponses);
        setAttemptCount(attemptCount + 1);
    
        setInput(""); // Réinitialise l'input après avoir entré sa réponse
        if (currentSyllabeIndex + 1 < syllabes.length) {
            setCurrentSyllabeIndex(prevIndex => prevIndex + 1);
        }
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
             <div  className="exercice__consigne">
                    <img src={speaker} alt="" />
                    <h1>{data?.exo_instruction}</h1>
            </div>
            <div>
                
                    {showSyllabe ? <div>
                                        {  data.exo_type !== "C1" && <img src={`https://mtsene.lpmiaw.univ-lr.fr/lettrelumiere/public/${syllabes[currentSyllabeIndex].file}`} 
                                                                      alt={syllabes[currentSyllabeIndex].value}
                                                                      className="exercice__img"
                                                                      style={{marginBottom:'1rem'}}
                                                                      onError={(e) => {
                                                                        e.target.src = imgNotFound;
                                                                      }}/>}
                                      
                                        <p className="list__item">{syllabes[currentSyllabeIndex].value}</p>
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
                <button className="exercice__valid" onClick={handleSubmit}>Ok <img src={checkIcon} alt="ok" /></button>
            </div>
        </React.Fragment>
    );
}

export default C;
