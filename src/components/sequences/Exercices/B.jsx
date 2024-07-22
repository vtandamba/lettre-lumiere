import React, { useEffect, useState } from "react";
import speak from "../../../hooks/useSpeak";
import { getElementRandom } from "../../../hooks/useRandom";

const B = (props) => {
    const { data, onAttemptMade, score } = props;
    const [attemptCount, setAttemptCount] = useState(0);
    const [answer, setAnswer] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [tabItems, setTabItems] = useState([]);
    // const [score, setScore] = useState(0);
    const [tabResponses, setTabResponses] = useState(new Array(4).fill(null));


    useEffect(() => {
        if (data?.content.choices) {
            const initialTabItems = data.content.choices.map(el => ({
                value: el,
                state: 'initial',
                isAlreadyChosen: false
            }));

            setTabItems(initialTabItems);

            const availableChoices = initialTabItems.filter(el => !el.isAlreadyChosen);
            const initialAnswer = getElementRandom(availableChoices);
            setAnswer(initialAnswer.value);

            const updatedTabItems = initialTabItems.map(item =>
                item.value === initialAnswer.value ? { ...item, isAlreadyChosen: true } : item
            );

            setTabItems(updatedTabItems);

        }
    }, [data?.content.choices]);

    useEffect(() => {
        if (attemptCount > 0 && attemptCount < tabResponses.length) {

            const timer = setTimeout(() => {
                const newAnswer = getElementRandom(tabItems.filter(el => !el.isAlreadyChosen)).value;
                setAnswer(newAnswer);
                resetTabItemsState(); //Réinitialise les états de tous les items
            }, 1000);

            return () => clearTimeout(timer);
        } else if (attemptCount === tabResponses.length && attemptCount !== 0) {
            onAttemptMade();
            const scorePercent = tabResponses.filter(el => el === true).length / tabResponses.length * 100; //Calule le score final basé sur le nombre de true
            score(scorePercent);
        }
        console.log('answer', answer)
    }, [attemptCount, onAttemptMade]);

    useEffect(() => {
        speak(answer);
    }, [answer]);

    const handleChoose = (index) => {

        const newTabItems = tabItems.map((item, idx) => {
            return { ...item, state: idx === index ? 'choosen' : 'initial' };
        });
        setTabItems(newTabItems);
        setSelectedAnswer(tabItems[index].value);
    };



    const handleClick = () => {
        if (!selectedAnswer || !answer) return;
        const isCorrect = selectedAnswer?.toLowerCase() === answer.toLowerCase();
        setTabResponses(prev => {
            const updatedResponses = [...prev];
            updatedResponses[attemptCount] = isCorrect;
            return updatedResponses;
        });

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

    return (
        <React.Fragment>
            <p className="exercice__sound" onClick={() => speak(answer)}>?</p>
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
                <button className="exercice__valid" onClick={handleClick}>OK</button>
            </div>
        </React.Fragment>
    );
};

export default B;
