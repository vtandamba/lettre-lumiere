import React, { createContext, useContext, useEffect, useState } from 'react';
import db from '../Dexie';
import { fetchAllStages, fetchAllSequences, fetchAllExercisesForSequence } from '../hooks/useDb';

const DbContext = createContext();

export const useDbContext = () => useContext(DbContext);

export const DbProvider = ({ children }) => {
  const [stages, setStages] = useState([]);
  const [sequences, setSequences] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <DbContext.Provider value={{ stages, sequences, exercises, isLoading }}>
      {children}
    </DbContext.Provider>
  );
};
