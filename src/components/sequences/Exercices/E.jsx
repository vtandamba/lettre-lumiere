import React, { useEffect, useRef, useState } from "react";
import { getElementRandom } from "../../../hooks/useRandom";
import useSpeak from "../../../hooks/useSpeak";
import ButtonValid from "../../ButtonValid";

const E = (props) => {
    const { data, onAttemptMade, score } = props;
    const [item, setItem] = useState(getElementRandom(data?.content.choices));
    const [input, setInput] = useState("");
    const [attemptCount, setAttemptCount] = useState(0);
    const [tabResponses, setTabResponses] = useState([null, null, null, null]);
    const speak = useSpeak();
    const inputRef = useRef(null); // Référence pour l'input

    useEffect(() => {
        speak(item);
    }, [item, speak]);

    useEffect(() => {
        if (attemptCount === tabResponses.length) {
            const scorePercent = (tabResponses.filter(el => el === true).length / tabResponses.length) * 100;
            score(scorePercent);
            onAttemptMade();
        }
    }, [attemptCount, onAttemptMade, tabResponses, score]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const isCorrect = input.trim().toUpperCase() === item.toUpperCase();

        const newTabResponses = [...tabResponses];
        newTabResponses[attemptCount] = isCorrect;
        setTabResponses(newTabResponses);
        setAttemptCount(attemptCount + 1);

        setInput(""); // Réinitialise l'input après avoir entré la réponse

        if (attemptCount + 1 < tabResponses.length) {
            setItem(getElementRandom(data?.content.choices));
        }

        inputRef.current.focus(); // Garde le focus sur l'input après la soumission
    }

    return (
        <React.Fragment>
            <p className="exercice__sound" onClick={() => speak(item)}>?</p>
            <form onSubmit={handleSubmit} className="exercice__form">
                <input
                    ref={inputRef} // Référence à l'input
                    type="text"
                    value={input}
                    className="exercice__input"
                    onChange={(evt) => setInput(evt.target.value)}
                    autoFocus
                />

            </form>
            <div className="exercice__footer">
                <ul className="progress">
                    {tabResponses.map((response, index) => (
                        <li key={index} className={`${response === null ? 'progress__part' : response === true ? 'progress__part progress__part--true' : 'progress__part progress__part--false'}`}></li>
                    ))}
                </ul>
                <ButtonValid handleClick={handleSubmit} />
            </div>
        </React.Fragment>
    );
}

export default E;
