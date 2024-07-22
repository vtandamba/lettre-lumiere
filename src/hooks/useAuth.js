// src/hooks/useAuth.js
import db from '../Dexie';

export const authenticateUser = async (username, password) => {
  try {
    const user = await db.users.get({ username, password });
    if (user) {
      return user;
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    console.error("Erreur lors de l'authentification : ", error);
    return null;
  }
};

export const addUser = async (user) => {
  return await db.users.add(user);
};

 
export const saveScore = async (userId, exerciseId, score) => {
  try {
    await db.userProgress.put({ userId, exerciseId, score });
    console.log('Score sauvegardé avec succès');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du score :', error);
  }
};

export default db;