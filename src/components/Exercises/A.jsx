import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSpeak from "../../hooks/useSpeak"; // Utiliser le hook personnalisé
import hautParleur from '../../assets/images/haut-parleur.svg';
import { IoArrowForwardSharp } from "react-icons/io5";


const A = () => {

    const speak = useSpeak(); // Utiliser le hook personnalisé
    const params = useParams();

    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65));
    const colors = ['#3CA83D', '#F26A1B', '#F2E52E', '#7BA1CE', '#B05C0E', '#F20002', '#000000', '#B9829E', '#7B0D80', '#EEEEEE'];

    const graphemes = {
        1: ['in', 'un'],
        2: ['an', 'en'],
        3: ['au', 'eau'],
        4: ['eu', 'œu'],
        5: ['on'],
        6: ['ou'],
        7: ['oi'],
        8: ['ai', 'ei', 'est', 'et'],
        9: ['_er', '_ez', '_es', '_ed'],
        10: ['ien']
    };

    const handleSpeakerClick = (lettre) => {
        speak(lettre);
    };

    // Fonction pour déterminer si une couleur est sombre ou claire
    const isDarkColor = (color) => {
        // Convertir la couleur en RVB
        const rgb = parseInt(color.substring(1), 16);
        // Calculer la luminosité (luma)
        const luma = 0.2126 * ((rgb >> 16) / 255) + 0.7152 * (((rgb >> 8) & 0xff) / 255) + 0.0722 * ((rgb & 0xff) / 255);
        // Si la luminosité est inférieure à 0.5, la couleur est sombre
        return luma < 0.5;
    };

    return (
        <React.Fragment>
            <div onClick={(evt) => speak("Ecoute et répète")}>
                <h2 className="exercice__consigne ligne" onClick={(evt) => speak(evt.target.textContent)}>
                    <span>
                        <img src={hautParleur} alt="haut parleur" />
                    </span>
                    écoute et répète
                </h2>
            </div>

            {params.categorie === "graphemes" ?
                <ul>
                    {Object.keys(graphemes).map((key, index) => {
                        // Déterminer si la couleur de fond est sombre ou claire
                        const textColor = isDarkColor(colors[index]) ? '#FFFFFF' : '#000000';
                        return (
                            <div key={key} className="grapheme">
                                <img className="exercice__iconHp"
                                    src={hautParleur}
                                    alt={`${graphemes[key]} `}
                                    onClick={() => speak(graphemes[key][0])} />
                                <li className="exerciceA__liste">
                                    <div className="exercice__letter exercice__letter--verdana exercice__group"
                                        style={{ backgroundColor: colors[index], color: textColor }}>
                                        {graphemes[key].map((element, index) => (
                                            <p key={index}>{element}</p>
                                        ))}
                                    </div>
                                    <div className="exercice__letter exercice__letter--belleAllure exercice__group" style={{ backgroundColor: colors[index], color: textColor }}>
                                        {graphemes[key].map((element, index) => (
                                            <p key={index}>{element}</p>
                                        ))}
                                    </div>
                                </li>
                            </div>
                        );
                    })}
                </ul>
                :
                <React.Fragment>
                    <h2 className="rubrique"> <span className="rubrique__titre">Alphabet </span>  <span> les minuscules </span></h2>
                    <div>
                        <ul className="exerciceA">
                            {alphabet.map((lettre, index) => (
                                <li className="exerciceA__liste" key={index}>
                                    <img className="exerciceA__iconHp"
                                        src={hautParleur}
                                        alt={`${lettre}`}
                                        id="haut-parleur"
                                        onClick={() => handleSpeakerClick(lettre)} />
                                    <span className="exerciceA__lettre exerciceA__lettre--verdana ">{lettre.toLowerCase()}</span>
                                    <span className="exerciceA__lettre exerciceA__lettre--belleAllure"> {lettre.toLowerCase()} </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="rubrique"> <span className="rubrique__titre">Alphabet </span>  <span> LES MAJUSCULES </span></h2>
                        <ul className="exerciceA">
                            {alphabet.map((lettre, index) => (
                                <li className="exerciceA__liste" key={index}>
                                    <img className="exerciceA__iconHp"
                                        src={hautParleur}
                                        alt={`${lettre} `}
                                        id="haut-parleur"
                                        onClick={() => handleSpeakerClick(lettre)} />
                                    <span className="exerciceA__lettre exerciceA__lettre--verdana">{lettre}</span>
                                    <span className="exerciceA__lettre exerciceA__lettre--belleAllure"> {lettre} </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </React.Fragment>
            }
            <Link className="exercice__validate" to={`/${params?.categorie}/exercices/b1`}>
                <p>OK</p>
                <IoArrowForwardSharp />
            </Link>
        </React.Fragment>
    );
};

export default A;
