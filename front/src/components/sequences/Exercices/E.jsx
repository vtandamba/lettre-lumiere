import React, { useEffect, useState } from "react";
import { getElementRandom } from "../../../hooks/useRandom";
import speak from "../../../hooks/useSpeak";

const E = (props) => {
    const { data, onAttemptMade, score, imgNotFound } = props;
    const [item, setItem] = useState();
    const [input, setInput] = useState("");
    const [attemptCount, setAttemptCount] = useState(0); 
    const [tabResponses, setTabResponses] = useState(new Array(JSON.parse(data?.exo_choices).length).fill(null));
    const [answerAlreadyTaken, setAnswerAlreadyTaken] = useState([]);

    useEffect(() => {
        if (item){
            speak(item.value);
        }
       
    }, [item])

    useEffect(() => {

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
    }, [attemptCount, onAttemptMade, tabResponses.length]);

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

    return <React.Fragment>
                <h2 className="exercice__consigne">{data.consigne}</h2>
                <div>
                {data.exo_type !== "E1" && 
                <img src={'https://vtandamb.lpmiaw.univ-lr.fr/PHP/lettre_en_lumiere/back-lettre-en-lumiere/assets/images/' + item?.value + '.jpg'} 
                                             alt="" 
                                             className="exercice__img"  
                                             onClick={() => speak(item.value)}
                                             onError={(e) => {
                                                e.target.src = imgNotFound;
                                              }}/>}
                    <p className="exercice__sound" onClick={() => speak(item.value)}>?</p>
                </div>
                
                <form onSubmit={handleSubmit} className="exercice__form">
                    <input type="text" value={input} className="exercice__input" onChange={(evt) => setInput(evt.target.value)} autoFocus />
                </form>
                <div className="exercice__footer">
                    <ul className="progress">
                        {tabResponses.map((response, index) => (
                            <li key={index} className={`${response === null ? 'progress__part' : response === true ? 'progress__part progress__part--true' : 'progress__part progress__part--false'}`}></li>
                        ))}
                    </ul>
                    {/* <button type="submit" className="layout__valid" onClick={handleSubmit}>OK</button> */}
                </div>
            </React.Fragment>
}

export default E;
