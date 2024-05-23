import React, { useEffect, useState } from "react";
import speak from "../../../hooks/useSpeak";
import { getElementRandom } from "../../../hooks/useRandom";
import ButtonValid from "../../ButtonValid";

const B = (props) => {
    const { data, onAttemptMade, score, imgNotFound } = props;
    const [attemptCount, setAttemptCount] = useState(0);
    const [answer, setAnswer] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [tabItems, setTabItems] = useState([]);
    const [tabResponses, setTabResponses] = useState([]);
    
    useEffect(() => {
        if (data?.choice) {
            const initialTabItems = data.choice.map(el => ({
                value: el.value,
                file: el.file,
                state: 'initial',
                isAlreadyChosen: false
            }));
            setTabItems(initialTabItems);
            setTabResponses(new Array(initialTabItems.length).fill(null));
            selectNewAnswer(initialTabItems);
        }
    }, [data?.choiceDetails]);

    const selectNewAnswer = (items) => {
        const availableChoices = items.filter(el => !el.isAlreadyChosen);
        if (availableChoices.length > 0) {
            const newAnswer = getElementRandom(availableChoices);
            setAnswer(newAnswer);
            speak(newAnswer.value);
        }
    };

    useEffect(() => {
        if (attemptCount > 0 && attemptCount < tabResponses.length) {
            const timer = setTimeout(() => {
                selectNewAnswer(tabItems);
                resetTabItemsState();
            }, 1000);

            return () => clearTimeout(timer);
        } else if (attemptCount === tabResponses.length && attemptCount !== 0) {
            onAttemptMade();
            const scorePercent = tabResponses.filter(el => el === true).length / tabResponses.length * 100;
            score(scorePercent);
        }
    }, [attemptCount, onAttemptMade]);

    useEffect(() => {
        if (answer?.value) {
            speak(answer.value);
        }
    }, [answer]);

    const handleChoose = (index) => {
        const newTabItems = tabItems.map((item, idx) => ({
            ...item,
            state: idx === index ? 'choosen' : item.state
        }));
        setTabItems(newTabItems);
        setSelectedAnswer(tabItems[index].value);
    };

    const handleClick = () => {
        if (!selectedAnswer || !answer) return;
        const isCorrect = selectedAnswer.toLowerCase() === answer.value.toLowerCase();
        setTabResponses(prev => {
            const updatedResponses = [...prev];
            updatedResponses[attemptCount] = isCorrect;
            return updatedResponses;
        });

        setTabItems(prevItems => prevItems.map(item => {
            if (item.value === answer.value) {
                return { ...item, isAlreadyChosen: true, state: isCorrect ? 'true' : 'false' };
            }
            if (item.value.toLowerCase() === selectedAnswer.toLowerCase()) {
                return { ...item, state: isCorrect ? 'true' : 'false' };
            }
            return item;
        }));

        setTimeout(() => {
            resetTabItemsState();
        }, 1000);

        setAttemptCount(prevAttemptCount => prevAttemptCount + 1);
    };

    const resetTabItemsState = () => {
        const resetItems = tabItems.map(item => ({
            ...item,
            state: 'initial'
        }));
        setTabItems(resetItems);
    };

    return (
        <React.Fragment>
            <div>
                {data.exo_type === 'B2' ?
                    <img src={'https://mtsene.lpmiaw.univ-lr.fr/lettrelumiere/public/images/choices/' + answer.file}
                         alt=""
                         className="exercice__img"
                         onClick={() => speak(answer.value)}
                         onError={(e) => {
                             e.target.src = imgNotFound;
                         }} />
                    : <p className="exercice__sound" onClick={() => speak(answer?.value)}>?</p>}
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
                <ButtonValid handleClick={handleClick} />
            </div>
        </React.Fragment>
    );
};

export default B;
