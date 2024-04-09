import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import speak from "../../../hooks/useSpeak"
import { diviserEnSyllabes } from "../../../hooks/useRandom";


const A = (props) => {
    const {data, onAttemptMade, score, imgNotFound} = props;
    const [tabResponses, setTabResponses] = useState(new Array(6).fill(null));

    
    useEffect(() => {
        
        const allListened = tabResponses.every(response => response === true);

        if (allListened) {
            onAttemptMade();
            score(100);
        }
    }, [tabResponses]); // Dépendances de l'effet

    const handleChoiceClick = (index) => {
        speak(data.choice[index].value);
        const updatedTabResponses = tabResponses.map((response, i) => 
            i === index ? true : response
        );
        setTabResponses(updatedTabResponses);
       
    };
    return <React.Fragment>
                <h1 className="exercice__consigne">{data?.exo_instruction}</h1>
                <ul className="list">
                    {data && data.choice.map((e, index) => <div key={index} className={`${data.exo_type==="A2" && 'group'}`}>
                                                                             {data.exo_type==="A2"  && <img src={`https://mtsene.lpmiaw.univ-lr.fr/lettrelumiere/public/images/choices/${e.file}`} 
                                                                                                                      alt={e.value} 
                                                                                                                      className="group__img"
                                                                                                                      onError={(e) => {
                                                                                                                        e.target.src = imgNotFound;
                                                                                                                      }}/>}
                                                                              <p
                                                                                      className="list__item list__item--sound" 
                                                                                      onClick={()=>handleChoiceClick(index)}>
                                                                                    {e.value}
                                                                                </p>
                                                                            </div>
                                                                        )}
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