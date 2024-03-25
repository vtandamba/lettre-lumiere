import React, { useEffect, useRef, useState } from "react";
import { getElementRandom } from "../../../hooks/useRandom";
import speak from "../../../hooks/useSpeak";

const E = (props) => {
    const { data, onAttemptMade, score, imgNotFound } = props;
    const [item, setItem] = useState(); //Valeur de l'item courant
    const [input, setInput] = useState("");//valeur de l'input
    const [attemptCount, setAttemptCount] = useState(0);  //Nombre de tâches
    const [tabResponses, setTabResponses] = useState(new Array(JSON.parse(data?.exo_choices).length).fill(null));
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
                setItem(getElementRandom(JSON.parse(data?.exo_choices).filter(el => {
                    return answerAlreadyTaken.map(it => it.value)
                                             .includes(el.value) === false;
                })));
              
                if (item){
                    const tabAnswerAlreadyTaken = answerAlreadyTaken;
                    console.log(tabAnswerAlreadyTaken);
                    tabAnswerAlreadyTaken.push(item);
                    console.log(tabAnswerAlreadyTaken);
                    setAnswerAlreadyTaken(tabAnswerAlreadyTaken)
                }
            }
        }
       
        init();
      
    }, [attemptCount, onAttemptMade, tabResponses.length]);

    const handleChange = (evt) => {

        // if (item && input.length <= item.length){
        //     setInput(evt.target.value)
        // }

        let newValue = input;
        const inputText = evt.target.value;
        // Recherche du premier trait dans la chaîne
        const firstDashIndex = newValue.indexOf('_');

        // Si un trait est trouvé, remplacez-le par la lettre saisie
        if (firstDashIndex !== -1) {
            newValue = newValue.slice(0, firstDashIndex) + inputText[inputText.length - 1] + newValue.slice(firstDashIndex + 1);
        }
        setInput(data.exo_type!== "E2 Bis" ? evt.target.value : newValue);
        
    }

    useEffect(() => {
        if (item){
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
        console.log(input);
        const isCorrect = input.trim().toUpperCase() === item.value.toUpperCase();
     
        const newTabResponses = [...tabResponses];
        newTabResponses[attemptCount] = isCorrect;
        setTabResponses(newTabResponses);
        setAttemptCount(attemptCount + 1);

        setInput(""); //Réinitialise l'input après avoir entré sa réponse

       
    }

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
                <h2 className="exercice__consigne">{data?.exo_consigne}</h2>
                <div className="group">
                {data.exo_type !== "E1" && 
                <img src={'https://vtandamb.lpmiaw.univ-lr.fr/PHP/lettre_en_lumiere/back-lettre-en-lumiere/assets/images/' + item?.value + '.jpg'} 
                                             alt="" 
                                             className="exercice__img"  
                                             onKeyDown={(event) => handleKeyDown(event)}
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
                        //    value={ data.exo_type=== "E2 Bis" && input.replace(new RegExp(`[^${item?.chosenSyllable}]`, "gi"), "-")}
                           onChange={(evt) => handleChange(evt)} 
                           autoFocus />
                </form>
                <div className="exercice__footer">
                    <ul className="progress">
                        {tabResponses.map((response, index) => (
                            <li key={index} className={`${response === null ? 'progress__part' : response === true ? 'progress__part progress__part--true' : 'progress__part progress__part--false'}`}></li>
                        ))}
                    </ul>
                    <button type="submit" className="exercice__valid" onClick={handleSubmit}>OK</button>
                </div>
            </React.Fragment>
}

export default E;
