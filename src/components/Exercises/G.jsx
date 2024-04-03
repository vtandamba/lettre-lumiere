import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CountUp from 'react-countup';
import speak from "../../hooks/useSpeak";
import { getElementRandom, LinearCountdown } from "../../hooks/useRandom";
import { useNavigate } from "react-router";

const G = () => {

    const [displayGraphemes, setDisplayGraphemes] = useState([]);
    const [tabGraphemes, setTabGraphemes] = useState([]);
    const [grapheme, setGrapheme] = useState('');
    const navigate = useNavigate();
    const times = useRef(1);


    const graphemesGroups = [
        ['in', 'un'],
        ['an', 'en'],
        ['on'],
        ['au', 'eau'],
        ['ou'],
        ['eu', 'œu'],
        ['ei', 'et', 'er'],
        ['est', 'ai', 'es'],
        ['ien'],
        ['ed']
      ];

      useEffect(() => {
        const selectedGraphemes = graphemesGroups.map(group => getElementRandom(group));
        setDisplayGraphemes(selectedGraphemes);
        console.log(displayGraphemes)
      
    }, []);

      const updateGraphemes = useCallback(() => {
     
        if (displayGraphemes.length > 0) {
          const newTabGraphemes = []; 
          for (let i = 0; i < 3; i++) {
            let candidateGrapheme = getElementRandom(displayGraphemes);
            if (!newTabGraphemes.includes(candidateGrapheme)) {
              newTabGraphemes.push(candidateGrapheme);
            }
          }
          setTabGraphemes(newTabGraphemes);
          setGrapheme(getElementRandom(newTabGraphemes)); 
           console.log();
        }
      }, [displayGraphemes]);


    useEffect(() => {

       updateGraphemes();
      
    }, [updateGraphemes]);

    useEffect(() => {
        if (grapheme) {
            speak(grapheme);
            console.log(grapheme);
        }
    }, [grapheme]);

    const handleClick = (evt) => {

        const items = document.querySelectorAll('.list__item');
        const itemsArray = Array.from(items);
        itemsArray?.map((item) => item.classList.remove('false', 'true'));

        const secondes = document.querySelector('.exercice__count');
        const response = itemsArray.find((r) => r.textContent === grapheme);

        if (times.current < 5){
            times.current += 1; // Incrémente times
      
            if (evt.target.textContent === grapheme) {
                evt.target.classList.add('true');
                evt.target.classList.remove('false'); 
            } else {
                evt.target.classList.add('false'); 
                evt.target.classList.remove('true'); 
                response.classList.add('true');

            }

            if (times.current < 5 || secondes.textContent === false) {
                setTimeout(() => {
                    evt.target.classList.remove('true', 'false');
                    itemsArray?.map((item) => item.classList.remove('false', 'true'));
                    updateGraphemes(); 

                }, 1000); 
             
            } else {
                setTimeout(() => {
                    evt.target.classList.remove('true', 'false')
                    navigate("/graphemes"); 
                }, 1000); 
           
            }
        }
    }

    const handleCountdownFinish = () => {
      
        
            setTimeout(() => {

                navigate("/graphemes"); 
            }, 2000); 
        
    };

    return (
        <React.Fragment>
            <h2 className="exercice__consigne" onClick={(evt)=> speak(evt.target.textContent)}>Trouve le bon graphème le plus vite possible</h2>
            <p className="exercice__count">
                <LinearCountdown onCountdownFinish={handleCountdownFinish} />
            </p>
            <p className="exercice__sound" onClick={() => speak(grapheme)}>?</p>
            <ul className="list">
                {tabGraphemes.map((grapheme, index) => {
                    return <li className="list__item" key={index} onClick={handleClick}>{grapheme}</li>;
                })}
            </ul>
        </React.Fragment>
    );
}

export default G;
