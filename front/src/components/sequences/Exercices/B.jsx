import React, { useEffect, useState } from "react";
import speak from "../../../hooks/useSpeak";
import { getElementRandom } from "../../../hooks/useRandom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import checkIcon from '../../../assets/images/check.svg'

const B = (props) => {
    const { data, onAttemptMade, score , imgNotFound} = props;
    const [attemptCount, setAttemptCount] = useState(0);
    const [answer, setAnswer] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [tabItems, setTabItems] = useState(data?.choiceDetails);
    // const [score, setScore] = useState(0);
    const [tabResponses, setTabResponses] = useState(new Array(tabItems.length).fill(null));
 
    useEffect(() => {
        if (data?.choiceDetails) {
            const initialTabItems = data?.choiceDetails.map(el => ({
               
                value: el.value, 
                state: 'initial',
                isAlreadyChosen: false
            }));
    
       
            setTabItems(initialTabItems);
            selectNewAnswer(initialTabItems);  
        }
    }, [data?.choiceDetails]);

    const selectNewAnswer = (items) => {
        const availableChoices = items.filter(el => !el.isAlreadyChosen);
        if (availableChoices.length > 0) {
            const newAnswer = getElementRandom(availableChoices);
            setAnswer(newAnswer);
            console.log(newAnswer)
            speak(newAnswer.value); // Assurez-vous de parler le nouvel item ici pour l'accessibilité
        }
    };

    useEffect(() => {
        if (attemptCount > 0 && attemptCount < tabResponses.length ) {

            const timer = setTimeout(() => {
                
                selectNewAnswer(tabItems);
                resetTabItemsState(); //Réinitialise les états de tous les items
            }, 1000);

            return () => clearTimeout(timer);
        } else if (attemptCount === tabResponses.length && attemptCount !== 0) {
            onAttemptMade(); 
            const scorePercent = tabResponses.filter(el => el === true).length / tabResponses.length * 100; //Calule le score final basé sur le nombre de true
            score(scorePercent);
        }
       
    }, [attemptCount, onAttemptMade]);

    useEffect(() => {
        speak(answer.value);
        console.log('answer', tabItems)
    }, [answer]);

    const handleChoose = (index) => {

        const newTabItems = tabItems.map((item, idx) => {
          return { ...item, state: idx === index ? 'choosen' : 'initial' }; 
        });
        setTabItems(newTabItems);
        setSelectedAnswer(tabItems[index].value);
    };

    

    const handleClick = () => {
        console.log('click')
        if (!selectedAnswer || !answer) return;
        const isCorrect = selectedAnswer?.toLowerCase() === answer?.value.toLowerCase();
        setTabResponses(prev => {
            const updatedResponses = [...prev];
            updatedResponses[attemptCount] = isCorrect;
            return updatedResponses;
        });

        setTabItems(prevItems => prevItems.map(item => {
            if (item.value === answer.value) {
                return { ...item, isAlreadyChosen: true, state: isCorrect ? 'true' : 'false' };
            }
            return item;
        }));
    
        const newTabItems = tabItems.map(item => {
            if (item.value.toLowerCase() === selectedAnswer.toLowerCase()) {
                return {
                    ...item,
                    state: isCorrect ? 'true' : 'false'
                };
            }
            return item;
        });
        setTabItems(newTabItems);
    
        setTimeout(() => {
            resetTabItemsState();
        }, 1000);
    
   
        setAttemptCount(prevAttemptCount => prevAttemptCount + 1);
        // setScore(prevScore => isCorrect ? prevScore + 1 : prevScore);
    };
    

    const resetTabItemsState = () => {
        const resetItems = tabItems.map(item => ({
            ...item,
            state: 'initial'
        }));
        setTabItems(resetItems);
    };

    const handleImgError = () => {

    }

    return (
        <React.Fragment>
            <p className="exercice__consigne">{data.exo_instruction}</p>
            <div>
                {data.exo_type === 'B2' ? 
                                        <img src={'http://lettrelumiere.localhost:8000/images/choices/' + answer.file } 
                                             alt="" 
                                             className="exercice__img"  
                                             onClick={() => speak(answer.value)}
                                             onError={(e) => {
                                                e.target.src = imgNotFound;
                                              }}/>
                                        :<p className="exercice__sound" onClick={() => speak(answer.value)}>?</p>}
            </div>
           
            <ul className="list">
                {tabItems?.map((e, index) => (
                  <li key={index} className={`list__item ${e.state}`} onClick={() => handleChoose(index)}>
                    {e.value}
                  </li>
                ))}
            </ul>
            <div className="exercice__footer">
                <ul className="progress">
                    {tabResponses.map((response, index) => (
                      <li key={index} className={`progress__part ${response === true ? 'progress__part--true' : response === false ? 'progress__part--false' : ''}`}></li>
                    ))}
                </ul>
                <button className="exercice__valid" onClick={handleClick}>Ok <img src={checkIcon} alt="ok" /></button>
            </div>
        </React.Fragment>
    );
};

export default B;
