import React, { useState, useEffect } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { IoArrowForwardSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import speak from "../../hooks/useSpeak";
import hautParleur from '../../assets/images/haut-parleur.svg';

const H = () => {
    const lettres = ['A', 'B', 'C'];


    // État pour gérer les lettres disponibles
    const [letters, setLetters] = useState(lettres);
    // État pour gérer les lettres déposées
    const [droppedLetters, setDroppedLetters] = useState([]);
    // État pour stocker si l'ordre des lettres est correct ou non
    const [correctOrder, setCorrectOrder] = useState(false);

    // Gestionnaire d'événement pour le dépôt des lettres
    const handleDrop = (event) => {
        // Identifiant de la lettre déposée
        const letterId = event.active.id;
        // Filtrer la lettre déposée de la liste des lettres disponibles
        const updatedLetters = letters.filter(letter => letter !== letterId);
        // Mettre à jour la liste des lettres disponibles
        setLetters(updatedLetters);
        // Ajouter la lettre déposée à la liste des lettres déposées
        setDroppedLetters([...droppedLetters, letterId]);
    };

    // Gestionnaire d'événement pour le clic sur une lettre dans la zone finale
    const handleLetterClick = (letter) => {
        // Filtrer la lettre cliquée de la liste des lettres déposées
        const updatedDroppedLetters = droppedLetters.filter(item => item !== letter);
        // Mettre à jour la liste des lettres déposées
        setDroppedLetters(updatedDroppedLetters);
        // Ajouter la lettre cliquée à la liste des lettres disponibles
        setLetters([...letters, letter]);
    };
    // Effet pour vérifier si l'ordre des lettres est correct une fois que toutes les lettres ont été déposées

    console.log('letters: ', letters);
    console.log('droppedLetters: ', droppedLetters);
    console.log('correctOrder: ', correctOrder);

    useEffect(() => {
        if (droppedLetters.length === lettres.length) {
            const isIdentical = droppedLetters.toString() === lettres.toString();
            setCorrectOrder(isIdentical);
            console.log('correctOrder:', isIdentical);
        }
    }, [droppedLetters, letters]);



    return (<>

        <div onClick={(evt) => speak(" Mets les lettres dans l’ordre.")} >
            <h2 className="exercice__consigne ligne" onClick={(evt) => speak(evt.target.textContent)}>
                <span>
                    <img src={hautParleur} />
                </span>
                Mets les lettres dans l’ordre.
            </h2>
        </div>
        <DndContext onDragEnd={handleDrop}>
            <div style={{ border: '1px solid black', padding: '10px', margin: '10vw' }}>
                {/* Affichage des lettres déposées avec la gestion du clic */}
                {droppedLetters.map((letter, index) => (
                    <div key={letter} style={{ display: 'inline-block', border: '1px solid black', padding: '10px', margin: '10px' }} onClick={() => handleLetterClick(letter)}>
                        {letter}
                    </div>
                ))}
            </div>
            <div>
                {/* Affichage des lettres disponibles avec la gestion du glisser-déposer */}
                {letters.map((letter, index) => (
                    <Letter key={letter} id={letter}>
                        {letter}
                    </Letter>
                ))}
            </div>


            {droppedLetters.length === lettres.length
                && <p>{droppedLetters.length === lettres.length && correctOrder ?
                    'Message correct' : droppedLetters.length === lettres.length && !correctOrder ?
                        "Message incorrect" : ""}</p>}




        </DndContext>
        <div className="exercice">
            <button className={`exercice__validate`} >
                <Link to="/alphabet">
                    Suivant
                </Link>
                <IoArrowForwardSharp />
            </button>
        </div>
    </>);

}

// Composant pour rendre une lettre draggable
const Letter = ({ id, children }) => {
    // Utilisation de useDraggable pour rendre l'élément draggable
    const { attributes, listeners, setNodeRef } = useDraggable({
        id
    });

    return (
        // Span qui représente une lettre et qui est rendu draggable
        <span ref={setNodeRef} {...attributes} {...listeners} style={{ border: '1px solid black', padding: '10px', margin: '1vw 3vw' }}>
            {children}
        </span>
    );
}

export default H;
