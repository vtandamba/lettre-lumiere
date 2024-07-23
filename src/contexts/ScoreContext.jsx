import React, { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export const useScoreByExo = () => useContext(ScoreContext);

export const ScoreProvider = ({ children }) => {
    const [scoreByExo, setScoreByExo] = useState({});
    const [finalScores, setFinalScores] = useState({});

    // Fonction pour mettre à jour les scores pour une séquence spécifique
    const updateScoreByExo = (sequenceId, scores) => {
        setScoreByExo(prevScores => ({
            ...prevScores,
            [sequenceId]: scores
        }));
    };

    // Fonction pour mettre à jour le score final pour une séquence spécifique
    const updateFinalScore = (sequenceId, finalScore) => {
        setFinalScores(prevFinalScores => ({
            ...prevFinalScores,
            [sequenceId]: finalScore
        }));
    };

    return (
        <ScoreContext.Provider value={{ scoreByExo, finalScores, updateScoreByExo, updateFinalScore }}>
            {children}
        </ScoreContext.Provider>
    );
};
