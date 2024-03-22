import React, { useCallback, useEffect, useRef, useState } from "react";
import { LinearCountdown, getElementRandom } from "../../../hooks/useRandom";
import speak from "../../../hooks/useSpeak";
import { useNavigate } from "react-router-dom";

const G = (props) => {

    const times = useRef(1);

    const { data, score } = props;
    const [tabItems, setTabItems] = useState([]);
    const [displayItems, setDisplayItems] = useState(JSON.parse(data?.exo_choices).map(el => {
                                                                                return {
                                                                                    value: el.value, 
                                                                                    state: 'initial'
                                                                                };
                                                                            }));
    const [item, setItem] = useState('');
    const [attemptCount, setAttemptCount] = useState(0);
    const [tabResponses, setTabResponses] = useState(new Array(4).fill(null));
    const navigate = useNavigate();

   

    const updateTabItems = useCallback(() => {
    
        if (displayItems.length > 0) {

            let newTabGraphemes = []; 
            for (let i = 0; i < 3; i++) {
              let candidateItems = getElementRandom(displayItems);
              if (!newTabGraphemes.includes(candidateItems)) {
                newTabGraphemes.push(candidateItems);
              }
            
            setTabItems(newTabGraphemes);
            setItem(getElementRandom(newTabGraphemes)); 
           }
        }
         
      }, [displayItems]);// Ajouter data?.content.choices comme dépendance
    

      useEffect(() => {
        updateTabItems();
     }, [updateTabItems]);


     useEffect(() => {
        if (item) {
            speak(item.value);
            console.log(item);
        }
    }, [item]);

    
    const updateExercise = (isCorrect) => { //Sert à update le tableau des réponses et la barre de progression
        setTabResponses(prev => {
            const newResponses = [...prev];
            newResponses[attemptCount] = isCorrect;
            return newResponses;
        });

        if (attemptCount === 6) {
            setTimeout(() => navigate("/"), 1000);
        } 

        setAttemptCount(attemptCount + 1);
    };

    const handleClick = (index) => {


        tabItems?.map((item) => {return {...item, state:'initial'}});

        const secondes = document.querySelector('.exercice__count');
        const response = tabItems.find((r) => r.textContent === item);

        if (times.current <= 7){
            times.current += 1; // Incrémente times
            
            const newTabItems = tabItems.map((el, idx) => { //Vérifie si l'élément sélectionné est faux ou pas et met le state de la bonne réponse à juste
                if (idx === index) {
                    const isCorrect = el.value === item.value;
                    updateExercise(isCorrect);
                    return { ...el, state: isCorrect ? 'true' : 'false' };
                }
                if (el.value === item){
                    return {...el, state:'true'}
                }
                return el; 
            });
            
            setTabItems(newTabItems);


            if (times.current <= 4 || secondes.textContent === false) {
                setTimeout(() => {
                    // evt.target.classList.remove('true', 'false');
                    tabItems?.forEach((item) => {return{...item, state: 'initial'}});
                    updateTabItems(); 
                    
                }, 1000); 
             
            } else {
                const scorePercent = tabResponses.filter(el => el === true).length / tabResponses.length * 100; //Calule le score final basé sur le nombre de true
                score(scorePercent);
                setTimeout(() => {
                    tabItems?.forEach((item) => {return{...item, state: 'initial'}});
                    navigate("/etapes"); 
                }, 1000); 
           
            }
           console.log('tabItem', tabItems);
        }
    }

    const handleCountdownFinish = () => { // Comportement à adopter à la fin du compte à rebours
      
        setTimeout(() => {
            const scorePercent = tabResponses.filter(el => el === true).length / tabResponses.length * 100; //Calule le score final basé sur le nombre de true
            score(scorePercent);
          
        }, 2000); 
    
    };

    return <React.Fragment>
               <h2 className="exercice__consigne">{data.consigne}</h2>
               <p className="exercice__count">
                <LinearCountdown onCountdownFinish={handleCountdownFinish} />
            </p>
            <p className="exercice__sound" onClick={() => speak(item.value)}>?</p>
            <ul className="list">
                {tabItems?.map((item, index) => {
                    return <li className={`list__item ${item.state}`}
                               key={index} 
                               onClick={()=>handleClick(index)}>{item.value}</li>;
                })}
            </ul>

            <div className="exercice__footer">
                <ul className="progress">
                    {tabResponses.map(response => (
                        <li className={`${response === null ? 'progress__part' : response === true ? 'progress__part progress__part--true' : 'progress__part progress__part--false'}`}></li>
                    ))}
                </ul>
                <button className="exercice__valid" onClick={handleClick}>OK</button>
            </div>
    </React.Fragment>
}

export default G;