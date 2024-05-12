import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import speak from "../../hooks/useSpeak";
import checkIcon from '../../assets/images/check.svg'
import hautParleur from '../../assets/images/haut-parleur.svg';

//Import des sons des graphèmes
import sound1 from '../../assets/sons/graphemes/in.mp3';
import sound2 from '../../assets/sons/graphemes/an.mp3';
import sound3 from '../../assets/sons/graphemes/au.mp3';
import sound4 from '../../assets/sons/graphemes/eu.mp3';
import sound5 from '../../assets/sons/graphemes/on.mp3';
import sound6 from '../../assets/sons/graphemes/ou.mp3';
import sound7 from '../../assets/sons/graphemes/oi.mp3';
import sound8 from '../../assets/sons/graphemes/é.mp3';
import sound9 from '../../assets/sons/graphemes/è.mp3';
import sound10 from '../../assets/sons/graphemes/ien.mp3';


const A = () => {
    const params = useParams();

    const [open, setOpen] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65));
    const colors = ['#3CA83D', '#F26A1B', '#F2E52E', '#7BA1CE', '#B05C0E', '#F20002', '#000000', '#B9829E', '#7B0D80', '#EEEEEE'];

    const sounds = [sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9, sound10];

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

    // const handleOpenModal = (lettre, index) => {

    //     setOpen(true);
    // };

    // const handleCloseModal = () => {
    //     setOpen(false);
    // };

    // Fonction pour déterminer si une couleur est sombre ou claire
    const isDarkColor = (color) => {
        // Convertir la couleur en RVB
        const rgb = parseInt(color.substring(1), 16);
        // Calculer la luminosité (luma)
        const luma = 0.2126 * ((rgb >> 16) / 255) + 0.7152 * (((rgb >> 8) & 0xff) / 255) + 0.0722 * ((rgb & 0xff) / 255);
        // Si la luminosité est inférieure à 0.5, la couleur est sombre
        return luma < 0.5;
    };


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleClick = (index) => {

        if (index >= 0 && index < sounds.length) {
            let audio = new Audio(sounds[index]);
            audio.play();
        } else {
            console.log('Index hors de portée');
        }
    };

    return (<React.Fragment>
        <div onClick={(evt) => speak("Ecoute et répète")} >
            <h2 className="exercice__consigne ligne" onClick={(evt) => speak(evt.target.textContent)}>
                <span>
                    <img src={hautParleur} alt="haut parleur" />
                </span>
                écoute et répète
            </h2>
        </div>







        {(params.categorie === "graphemes") ?
            <ul >
                {Object.keys(graphemes).map((key, index) => {
                    // Déterminer si la couleur de fond est sombre ou claire
                    const textColor = isDarkColor(colors[index]) ? '#FFFFFF' : '#000000';
                    return (

                        <div key={key} className="grapheme" >
                            <img className="exercice__iconHp"
                                src={hautParleur}
                                alt={`${graphemes[key]} `}
                                onClick={() => handleClick(index)} />
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
                <h2 className="rubrique"> <span className="rubrique__titre">Alphabet </span>  <span > les minuscules </span></h2>
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
                    <h2 className="rubrique"> <span className="rubrique__titre">Alphabet </span>  <span > LES MAJUSCULES </span></h2>
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
        <p className="exercice__validate">
            <Link to={`/${params?.categorie}/exercices/b1`}>
                OK 
            </Link>
            <img src={checkIcon} alt="ok" />
        </p>



    </React.Fragment>)

}

export default A;