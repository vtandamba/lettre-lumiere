import React, { useEffect, useState } from "react";
import { getElementRandom } from "../../../hooks/useRandom";
import useSpeak from "../../../hooks/useSpeak";

const E = (props) => {
    const { data, onAttemptMade, score } = props;
    const [item, setItem] = useState(getElementRandom(data?.content.choices));
    const [input, setInput] = useState("");
    const [attemptCount, setAttemptCount] = useState(0);
    const [tabResponses, setTabResponses] = useState([null, null, null, null]);
    const speak = useSpeak();

    useEffect(() => {
        speak(item);
    }, [item])

    useEffect(() => {

        if (attemptCount === tabResponses.length) {
            const scorePercent = tabResponses.filter(el => el === true).length / tabResponses.length * 100; //Calule le score final basé sur le nombre de true
            score(scorePercent);
            onAttemptMade();
        }
    }, [attemptCount, onAttemptMade, tabResponses.length]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(input);
        const isCorrect = input.trim().toUpperCase() === item.toUpperCase();

        const newTabResponses = [...tabResponses];
        newTabResponses[attemptCount] = isCorrect;
        setTabResponses(newTabResponses);
        setAttemptCount(attemptCount + 1);

        setInput(""); //Réinitialise l'input après avoir entré sa réponse

        if (attemptCount + 1 < tabResponses.length) {
            setItem(getElementRandom(data?.content.choices));
        }
    }

    return <React.Fragment>
        <p className="exercice__sound" onClick={() => speak(item)}>?</p>
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
