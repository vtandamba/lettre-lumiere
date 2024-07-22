import React, { useEffect, useState } from "react";
import speak from "../../../hooks/useSpeak";
import ButtonValid from "../../ButtonValid";
import { getElementRandom } from "../../../hooks/useRandom";
import imgNotFound from '../../../assets/images/not-found-image.jpg';

const C = (props) => {
    const { data, onAttemptMade, score, imgNotFound } = props;

    const [syllabes, setSyllabes] = useState(data?.content.choices || []);
    const [currentSyllabeIndex, setCurrentSyllabeIndex] = useState(0);
    const [input, setInput] = useState("");
    const [showSyllabe, setShowSyllabe] = useState(true);
    const [tabResponses, setTabResponses] = useState(new Array(syllabes.length).fill(null));
    const [attemptCount, setAttemptCount] = useState(0);

    useEffect(() => {
        if (attemptCount === tabResponses.length && attemptCount !== 0) {
            onAttemptMade();
            const scorePercent = (tabResponses.filter(el => el === true).length / tabResponses.length) * 100;
            score(scorePercent);
        } else {
            if (syllabes.length > 0) {
                setShowSyllabe(true);
                const timer = setTimeout(() => {
                    if (syllabes.length > 0) {
                        setShowSyllabe(false);
                        speak(syllabes[currentSyllabeIndex]);
                    }
                }, 3000);
                return () => clearTimeout(timer);
            }
        }
    }, [attemptCount, syllabes, currentSyllabeIndex, onAttemptMade, tabResponses]);

    // Initialise l'input avec des _ pour les caractères non saisis
    useEffect(() => {
        if (syllabes.length > 0) {
            const initialInput = syllabes[currentSyllabeIndex].split('').map(() => '_').join('');
            setInput(initialInput);
        }
    }, [syllabes, currentSyllabeIndex]);

    const handleInputChange = (evt) => {
        const inputText = evt.target.value;
        const syllabe = syllabes[currentSyllabeIndex] || '';

        if (inputText.length < input.length) {
            // Retourne l'input aux underscores précédents
            setInput(input.replace(/[^_]/g, '_'));
            return;
        }

        const lastChar = inputText.slice(-1);
        const firstUnderscoreIndex = input.indexOf('_');

        if (firstUnderscoreIndex !== -1) {
            let updatedInput = input.substring(0, firstUnderscoreIndex) + lastChar +
                input.substring(firstUnderscoreIndex + 1);
            setInput(updatedInput);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
            let indexToErase = input.split('').lastIndexOf('_') - 1;
            indexToErase = indexToErase >= 0 ? indexToErase : input.length - 1;
            const newInput = input.split('').map((char, index) => {
                if (index === indexToErase) {
                    return '_';
                }
                return char;
            }).join('');
            setInput(newInput);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const syllabe = syllabes[currentSyllabeIndex] || '';
        const finalInput = input.replace(/_/g, '').toUpperCase();
        const isCorrect = finalInput === syllabe.toUpperCase();

        const newTabResponses = [...tabResponses];
        newTabResponses[currentSyllabeIndex] = isCorrect;
        setTabResponses(newTabResponses);
        setAttemptCount(prevCount => prevCount + 1);

        setInput(""); // Réinitialise l'input après avoir entré sa réponse

        if (currentSyllabeIndex + 1 < syllabes.length) {
            setCurrentSyllabeIndex(prevIndex => prevIndex + 1);
        } else {
            // Réinitialiser ou terminer l'exercice si nécessaire
        }
    };

    return (
        <React.Fragment>
            <div>
                {showSyllabe ? (
                    <p className="exercice__grapheme">{syllabes[currentSyllabeIndex]}</p>
                ) : (
                    <form onSubmit={handleSubmit} className="exercice__form">
                        <input
                            type="text"
                            value={input}
                            className="exercice__input"
                            onKeyDown={handleKeyDown}
                            onChange={handleInputChange}
                            autoFocus
                        />
                    </form>
                )}
            </div>
            <div className="exercice__footer">
                <ul className="progress">
                    {tabResponses.map((response, index) => (
                        <li
                            key={index}
                            className={`progress__part ${response === null
                                    ? ''
                                    : response === true
                                        ? 'progress__part--true'
                                        : 'progress__part--false'
                                }`}
                        ></li>
                    ))}
                </ul>
                <ButtonValid handleClick={handleSubmit} />
            </div>
        </React.Fragment>
    );
};

export default C;
