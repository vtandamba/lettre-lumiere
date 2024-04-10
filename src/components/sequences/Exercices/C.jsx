import React, { useEffect, useState } from "react";
import speak from "../../../hooks/useSpeak";
import checkIcon from '../../../assets/images/check.svg'
import speaker from '../../../assets/images/haut-parleur.svg'


const C = (props) => {
    const { data, onAttemptMade, score, imgNotFound} = props;
    const [syllabes, setSyllabes] = useState( data?.choice);
    const [currentSyllabeIndex, setCurrentSyllabeIndex] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [showSyllabe, setShowSyllabe] = useState(true);
    const [tabResponses, setTabResponses] = useState(new Array(syllabes.length).fill(null));
    const [attemptCount, setAttemptCount] = useState(0);
    // const [answerAlreadyTaken, setAnswerAlreadyTaken] = useState([]);
    

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

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isCorrect = userInput.trim().toLowerCase() === syllabes[currentSyllabeIndex]?.value.toLowerCase();
        const newTabResponses = tabResponses.map((res, index) => 
            index === attemptCount ? isCorrect : res
        );

        setTabResponses(newTabResponses);
        setAttemptCount(prevAttemptCount => prevAttemptCount + 1);


        setUserInput("");
        if (currentSyllabeIndex + 1 < syllabes.length) {
            setCurrentSyllabeIndex(prevIndex => prevIndex + 1);
        } else {
           
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
                                    <input type="text" value={userInput} onChange={handleInputChange} autoFocus className="exercice__input"/>
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
