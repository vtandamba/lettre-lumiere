import React, { createContext, useContext, useEffect, useState } from 'react';
import db from '../Dexie';
import { fetchAllStages, fetchAllSequences, fetchAllExercisesForSequence, fetchOneSequence } from '../hooks/useDb'; // Assurez-vous d'importer correctement

const DbContext = createContext();

export const useDbContext = () => useContext(DbContext);

export const DbProvider = ({ children }) => {
    const [stages, setStages] = useState([]);
    const [sequences, setSequences] = useState([]);
    const [oneSequence, setOneSequence] = useState(null); // Modifier pour une seule séquence
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const loadedStages = await fetchAllStages();
                const loadedSequences = await fetchAllSequences();
                if (loadedSequences.length > 0) {
                    const firstSequenceExercises = await fetchAllExercisesForSequence(loadedSequences[0].sequenceId);
                    setExercises(firstSequenceExercises);
                }
                setStages(loadedStages);
                setSequences(loadedSequences);
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const fetchSequenceById = async (id) => {
        try {
            setIsLoading(true);
            const sequence = await fetchOneSequence(id);
            setOneSequence(sequence);
        } catch (error) {
            console.error("Erreur lors de la récupération de la séquence:", error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DbContext.Provider value={{ stages, sequences, oneSequence, exercises, isLoading, error, fetchSequenceById }}>
            {children}
        </DbContext.Provider>
    );
};
