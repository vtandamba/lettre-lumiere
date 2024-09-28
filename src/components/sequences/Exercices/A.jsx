import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSpeak from "../../../hooks/useSpeak";
const A = (props) => {
    const { data, onAttemptMade, score } = props;
    const [tabResponses, setTabResponses] = useState(new Array(data?.content.choices.length).fill(null));

    //every
    //some
    //map
    ///flatMap
    const speak = useSpeak()
    useEffect(() => {

        const allListened = tabResponses.every(response => response === true);

        if (allListened) {
            onAttemptMade();
            score(100);
        }
    }, [tabResponses, onAttemptMade]); // Dépendances de l'effet

    const handleChoiceClick = (index) => {
        speak(data.content.choices[index]);

        const updatedTabResponses = tabResponses.map((response, i) =>
            i === index ? true : response
        );
        setTabResponses(updatedTabResponses);
    };
    return <React.Fragment>

        <ul className="list">
            {data && data.content.choices.map((e, index) => <li
                key={index}
                className="list__item list__item--sound"
                onClick={() => handleChoiceClick(index)}>{e}</li>)}
        </ul>
        <div className="exercice__footer">
            <ul className="progress">
                {tabResponses.map((response, index) => (
                    <li key={index}

                        className={`progress__part ${response === true ? 'progress__part--true' : response === false ? 'progress__part--false' : ''}`}></li>
                ))}
            </ul>
            {/* <button className="layout__valid" onClick={handleClick}>OK</button> */}
        </div>
    </React.Fragment>
}

export default A;