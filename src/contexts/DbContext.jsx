import React, { createContext, useContext, useEffect, useState } from 'react';
import db from '../Dexie'; // Assurez-vous que le chemin est correct
import { fetchAllStages, fetchAllSequences, fetchAllExercisesForSequence, fetchOneSequence } from '../hooks/useDb';

const DbContext = createContext();

export const useDbContext = () => useContext(DbContext);

export const DbProvider = ({ children }) => {
    const [stages, setStages] = useState([]);
    const [sequences, setSequences] = useState([]);
    const [oneSequence, setOneSequence] = useState(null);
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

    // Fonction pour récupérer la progression utilisateur pour une séquence
const getUserProgressForSequence = async (userId, sequenceId) => {
    try {
        // Récupérer toutes les progressions pour l'utilisateur et la séquence donnés
        const progressList = await db.userProgress
            .where({ userId, sequenceId })
            .toArray();

        // Filtrer les doublons par combinaison de userId, sequenceId et exerciseId
        const uniqueProgress = [];
        const seenExercises = new Set();
        
        progressList.forEach((progress) => {
            const uniqueKey = `${progress.userId}-${progress.sequenceId}-${progress.exerciseId}`;
            if (!seenExercises.has(uniqueKey)) {
                uniqueProgress.push(progress);
                seenExercises.add(uniqueKey);
            }
        });

        // Calculer le score total à partir des progressions uniques
        const totalScore = uniqueProgress.reduce((acc, curr) => acc + curr.score, 0);

        // Récupérer le nombre total d'exercices pour la séquence
        const numExercises = await db.exercises
            .where({ sequenceId })
            .count();

        // Calculer le score moyen
        const averageScore = numExercises ? totalScore / numExercises : 0;

        return averageScore;
    } catch (error) {
        console.error("Erreur lors de la récupération des progrès de l'utilisateur:", error);
        return 0;
    }
};

    return (
        <DbContext.Provider value={{ stages, sequences, oneSequence, exercises, isLoading, error, fetchSequenceById, getUserProgressForSequence }}>
            {children}
        </DbContext.Provider>
    );
};
