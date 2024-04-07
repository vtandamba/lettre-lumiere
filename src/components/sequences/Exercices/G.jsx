import React, { useCallback, useEffect, useRef, useState } from "react";
import { LinearCountdown, getElementRandom } from "../../../hooks/useRandom";
import speak from "../../../hooks/useSpeak";
import { useNavigate } from "react-router-dom";
import checkIcon from '../../../assets/images/check.svg'

const G = (props) => {

    const times = useRef(1);

    const { data, score, onAttemptMade, isModalOpen, imgNotFound } = props;
    const [tabItems, setTabItems] = useState([]);
    const [displayItems, setDisplayItems] = useState( );
    const [item, setItem] = useState('');
    const [attemptCount, setAttemptCount] = useState(0);
    const [tabResponses, setTabResponses] = useState(new Array(4).fill(null));
    const navigate = useNavigate();
                                                        
  
    useEffect(() => {
        if (data?.choiceDetails || data?.rep_contenu) {
            const initialDisplayItems = (data.choiceDetails || data.rep_contenu).map(el => ({
                value: el.value, 
                image: el.file,
                state: 'initial'
            }));
            setDisplayItems(initialDisplayItems);
        }
    }, [data]); 
                      


    const updateTabItems = useCallback(() => {
      
        if (displayItems?.length > 0) {

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
         
        }
    }, [item]);

    
    const updateExercise = (isCorrect) => { //Sert à update le tableau des réponses et la barre de progression
        setTabResponses(prev => {
            const newResponses = [...prev];
            newResponses[attemptCount] = isCorrect;
            return newResponses;
        });

    
        setAttemptCount(attemptCount + 1);
    };

    const handleClick = (index) => {


        tabItems?.map((item) => {return {...item, state:'initial'}});

        const secondes = document.querySelector('.exercice__count');
        const response = tabItems.find((r) => r.textContent === item);

        if (times.current <= 4){
            times.current += 1; // Incrémente times
            
             //Vérifie si l'élément sélectionné est faux ou pas et met le state de la bonne réponse à juste
            const newTabItems = tabItems.map((el, idx) => {
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
                  
                    
                    onAttemptMade();
                }, 1000); 
           
            }
           console.log('tabItem', tabItems);
        }
    }

    const handleCountdownFinish = () => {
    
        if (!isModalOpen) { 
            const scorePercent = tabResponses.filter(el => el === true).length / tabResponses.length * 100;
            score(scorePercent);
          onAttemptMade();
    
        }
      };
      
    return <React.Fragment>
               <h2 className="exercice__consigne">{data?.exo_instruction}</h2>
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
            {  data.exo_type === "G2" && <img src={`https://mtsene.lpmiaw.univ-lr.fr/lettrelumiere/public/images/choices/${item.file}`} 
                                                                      alt={item.value}
                                                                      className="exercice__img"
                                                                      style={{marginBottom:'1rem'}}
                                                                      onError={(e) => {
                                                                        e.target.src = imgNotFound;
                                                                      }}/>}
                <ul className="progress">
                    {tabResponses.map(response => (
                        <li className={`${response === null ? 'progress__part' : response === true ? 'progress__part progress__part--true' : 'progress__part progress__part--false'}`}></li>
                    ))}
                </ul>
                <button className="exercice__valid" onClick={handleClick}>Ok <img src={checkIcon} alt="ok" /></button>

            </div>
    </React.Fragment>
}

export default G;