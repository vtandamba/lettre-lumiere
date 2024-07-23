import React, { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export const useScoreByExo = () => useContext(ScoreContext);

export const ScoreProvider = ({ children }) => {
    const [scoreByExo, setScoreByExo] = useState({});

    // Fonction pour mettre à jour les scores pour une séquence spécifique
    const updateScoreByExo = (sequenceId, scores) => {
        setScoreByExo(prevScores => ({
            ...prevScores,
            [sequenceId]: scores
        }));
    };

    return (
        <ScoreContext.Provider value={{ scoreByExo, updateScoreByExo }}>
            {children}
        </ScoreContext.Provider>
    );
};
