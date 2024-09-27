import React, { useCallback, useEffect, useRef, useState } from "react";
import { getElementRandom, LinearCountdown } from "../../hooks/useRandom";
import { useNavigate } from "react-router";
import useSpeak from "../../hooks/useSpeak";

const G = () => {
    const speak = useSpeak();
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
        }
    }, [displayGraphemes]);

    useEffect(() => {
        updateGraphemes();
    }, [updateGraphemes]);

    useEffect(() => {
        if (grapheme) {
            speak(grapheme);
        }
    }, [grapheme, speak]);

    const handleClick = (evt) => {
        const items = document.querySelectorAll('.list__item');
        const itemsArray = Array.from(items);
        itemsArray.forEach(item => item.classList.remove('false', 'true'));

        const secondes = document.querySelector('.exercice__count');
        const response = itemsArray.find((r) => r.textContent === grapheme);

        if (times.current < 5) {
            times.current += 1;

            if (evt.target.textContent === grapheme) {
                evt.target.classList.add('true');
                evt.target.classList.remove('false');
            } else {
                evt.target.classList.add('false');
                evt.target.classList.remove('true');
                response.classList.add('true');
            }

            if (times.current < 5 || secondes.textContent === false) {
                // Ajouter un délai de 3 secondes avant de passer au prochain élément
                setTimeout(() => {
                    evt.target.classList.remove('true', 'false');
                    itemsArray.forEach(item => item.classList.remove('false', 'true'));
                    updateGraphemes();
                }, 3000);  // Pause de 3 secondes
            } else {
                setTimeout(() => {
                    evt.target.classList.remove('true', 'false');
                    navigate("/graphemes");
                }, 1000);  // 1 seconde avant de quitter
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
            <h2 className="exercice__consigne" onClick={(evt) => speak(evt.target.textContent)}>Trouve le bon graphème le plus vite possible</h2>
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
