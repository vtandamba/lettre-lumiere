import React, { useEffect, useState } from "react";
import { getElementRandom } from "../../../hooks/useRandom";
import speak from "../../../hooks/useSpeak";
import ButtonValid from "../../ButtonValid";

const E = (props) => {
    const { data, onAttemptMade, score, imgNotFound } = props;
    const [item, setItem] = useState(null); // Valeur de l'item courant
    const [input, setInput] = useState(""); // Valeur de l'input
    const [tabItems, setTabItems] = useState();
    const [attemptCount, setAttemptCount] = useState(0); // Nombre de tentatives
    const [tabResponses, setTabResponses] = useState(new Array(data?.choice.length).fill(null));

    // Initialisation des choix avec `isAlreadyChosen` à false
    useEffect(() => {
        if (data?.choice) {
            const initialChoices = data.choice.map(el => ({
                ...el,
                isAlreadyChosen: false
            }));
            setTabItems(initialChoices);
            selectNewAnswer(initialChoices);
        }
    }, [data]);

    // Sélectionner une nouvelle réponse
    const selectNewAnswer = (choices) => {
        const availableChoices = choices.filter(choice => !choice.isAlreadyChosen);
        if (availableChoices.length > 0) {
            const newItem = getElementRandom(availableChoices);
            setItem(newItem);
        }
    };

    // Jouer le son de l'item sélectionné
    useEffect(() => {
        if (item) {
            speak(item.value);
        }
    }, [item]);

    // Gérer la fin des tentatives et le score
    useEffect(() => {
        if (attemptCount === tabResponses.length) {
            const scorePercent = tabResponses.filter(el => el === true).length / tabResponses.length * 100; // Calculer le score final basé sur le nombre de true
            score(scorePercent);
            onAttemptMade(); // Passer à l'exercice suivant
        } else if (attemptCount < tabResponses.length) {
            selectNewAnswer(data.choice);
        }
    }, [attemptCount, tabResponses.length]);

    // Initialiser l'input avec des _
    useEffect(() => {
        if (item) {
            const initialInput = item.chosenSyllable
                ? item.value.split('').map(char => (item.chosenSyllable.includes(char) ? '_' : char)).join('')
                : item.value.replace(/./g, '_');
            setInput(initialInput);
            speak(item.value);
        }
    }, [item]);

    // Gérer les changements dans l'input
    const handleChange = (evt) => {
        const inputText = evt.target.value;
        if (inputText.length < input.length) {
            setInput(input.replace(/[^_]/g, '_'));
            return;
        }

        const lastChar = inputText.slice(-1);
        const firstUnderscoreIndex = input.indexOf('_');

        if (firstUnderscoreIndex !== -1) {
            let updatedInput = input.substring(0, firstUnderscoreIndex) + lastChar + input.substring(firstUnderscoreIndex + 1);
            setInput(updatedInput);
        }
    };

    // Gérer la soumission du formulaire
    const handleSubmit = (event) => {
        event.preventDefault();

        const finalInput = input.endsWith('_') ? input.slice(0, -1) : input;
        const isCorrect = finalInput.trim().toUpperCase() === item?.value.toUpperCase();

        const newTabResponses = [...tabResponses];
        newTabResponses[attemptCount] = isCorrect;
        setTabResponses(newTabResponses);
        setAttemptCount(attemptCount + 1);

        setInput(""); // Réinitialiser l'input après avoir entré sa réponse

        // Marquer l'item comme choisi
        const updatedChoices = data.choice.map(choice =>
            choice.value === item.value ? { ...choice, isAlreadyChosen: true } : choice
        );
        setTabItems(updatedChoices);
    };

    // Gérer la touche Backspace
    const handleKeyDown = (event) => {
        if (event.key === 'Backspace') {
            event.preventDefault();

            // Trouver l'index à partir duquel commencer à effacer (le dernier caractère non '_' ou le début)
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

    return (
        <React.Fragment>
            <div className="group">
                {data.exo_type !== "E1" &&
                    <img src={'https://mtsene.lpmiaw.univ-lr.fr/lettrelumiere/public/images/choices/' + item?.file}
                        alt=""
                        className="exercice__img"
                        onClick={() => speak(item?.value)}
                        onError={(e) => {
                            e.target.src = imgNotFound;
                        }} />}
                <p className="exercice__sound"
                    onClick={() => speak(item.value)}>
                    ?
                </p>
            </div>

            <form onSubmit={handleSubmit} className="exercice__form">
                <input type="text"
                    value={input}
                    className="exercice__input"
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    autoFocus />
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
