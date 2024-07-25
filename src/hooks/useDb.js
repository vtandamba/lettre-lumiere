// useDb.js
import db from '../Dexie.js';

export const fetchAllStages = async () => {
  try {
    const allStages = await db.stages.toArray();
    return allStages;
  } catch (error) {
    console.error("Erreur lors de la récupération des étapes:", error);
    throw error;
  }
}

export const fetchUser = async (id) => {
  try {
    const user = await db.users.get(id);
    return user;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    throw error;
  }
}

export const fetchAllSequences = async () => {
  try {
    const allSequences = await db.sequences.toArray();
    return allSequences;
  } catch (error) {
    console.error("Erreur lors de la récupération des séquences:", error);
    throw error;
  }
}

export const fetchOneSequence = async (id) => {
  try {
    const sequence = await db.sequences.get(id);
    return sequence;
  } catch (error) {
    console.error("Erreur lors de la récupération de la séquence:", error);
    throw error;
  }
}


// todo 
export const authenticateUser = async (username, password) => {
  return await db.users.get({ username, password });
};

export const addUser = async (user) => {
  return await db.users.add(user);
};
// fin dtodo
// export const fetchAllExerciseForSequences = async (id) => {
//   try {
//     const exercises = await db.exercises.where({ sequenceId: Number(id) }).toArray();
//     return exercises;
//   } catch (error) {
//     console.error("Erreur lors de la récupération des exercices :", error);
//     throw error;
//   }
// }
export const fetchAllExerciseForSequences = async (seqId) => {
  try {
      // Vérifiez que seqId est un nombre valide
      if (isNaN(seqId)) {
          throw new Error("seqId n'est pas un nombre valide");
      }

      // Utilisez equals pour récupérer les exercices pour une séquence donnée
      const exercises = await db.exercises
          .where('sequenceId')
          .equals(seqId)
          .toArray();
      return exercises;
  } catch (error) {
      console.error("Erreur lors de la récupération des exercices :", error);
      throw error;
  }
};

export const fetchAllExercisesForSequence = async (sequenceId) => {
  try {
    return await db.exercises.where({ sequenceId }).toArray();
  } catch (error) {
    console.error("Erreur lors de la récupération des exercices pour la séquence:", error);
    return [];
  }
};
export const fetchAllExercisesForRevisions = async (id) => {
  try {
    const exercises = await db.exercises.where({ sequenceId: Number(id) }).toArray();
    return exercises;
  } catch (error) {
    console.error("Erreur lors de la récupération des exercices :", error);
    throw error;
  }
}

export const fetchUserProgress = async (userId) => {
  return db.userProgress.where({ userId }).toArray();
};

// Exemple de fonction pour sauvegarder le score de progression de l'utilisateur
export const saveUserProgress = async (progress) => {
  // Ajoute la date actuelle
  progress.date = new Date().toISOString();
  
  // Vérifie si une progression existe déjà pour les mêmes identifiants
  const existingProgress = await db.userProgress
      .where({ userId: progress.userId, sequenceId: progress.sequenceId, exerciseId: progress.exerciseId })
      .first();

  if (existingProgress) {
      // Met à jour la progression existante
      console.log('update')

      return db.userProgress.update(existingProgress.progressId, progress);
  } else {
      // Insère une nouvelle progression
      console.log('new')
      return db.userProgress.add(progress);
  }
};

// src/hooks/useDb.js

// Fonction pour mettre à jour le score utilisateur
export const updateUserScore = async (userId, score) => {
  try {
    await db.users.update(userId, { score });
    console.log('user score à jour de ',score)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du score utilisateur:', error);
  }
};

export default db;