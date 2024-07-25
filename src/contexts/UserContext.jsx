// UserContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { authenticateUser } from '../hooks/useAuth';
import db, { fetchUser, fetchUserProgress, updateUserScore } from '../hooks/useDb';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idUser, setIdUser] = useState(sessionStorage.getItem('user_id'));
  const [userProgress, setUserProgress] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (idUser) {
        const userInfo = await fetchUser(parseInt(idUser, 10));
        setUser(userInfo);
        const progress = await fetchUserProgress(parseInt(idUser, 10));
        setUserProgress(progress);
      }
    };
    fetchUserData();
  }, [idUser]);

  const login = async (username, password) => {
    try {
      const userInfo = await authenticateUser(username, password);
      if (userInfo) {
        sessionStorage.setItem('user_id', userInfo.userId);
        setUser(userInfo);
        const progress = await fetchUserProgress(userInfo.userId);
        setUserProgress(progress);
        return userInfo;
      } else {
        throw new Error('Erreur de connexion');
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification : ", error);
      return null;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('user_id');
    setUser(null);
    setUserProgress([]);
  };

  const checkUserStatus = async () => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      const userInfo = await fetchUser(parseInt(userId, 10));
      setUser(userInfo);
      const progress = await fetchUserProgress(parseInt(userId, 10));
      setUserProgress(progress);
    } else {
      setUser(null);
      setUserProgress([]);
    }
  };

  useEffect(() => {
    checkUserStatus();
    const handleStorageChange = (event) => {
      if (event.key === 'user_id') {
        checkUserStatus();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Fonction pour déterminer le niveau en fonction du score
  const determineLevel = (score) => {
    if (score >= 800) return 'perfect';
    if (score >= 600) return 'gold';
    if (score >= 400) return 'silver';
    if (score >= 200) return 'bronze';
    // TODO remettre le 200 pour bronze
    return 'nobe';
  };

  // Fonction pour calculer et mettre à jour le score global
  const calculateAndUpdateScore = async (sequenceProgress) => {
    if (user && sequenceProgress) {
      const totalSequences = Object.keys(sequenceProgress).length;
      const totalScore = Object.values(sequenceProgress).reduce((acc, currProgress) => {
        // Chaque séquence est notée sur 100, donc calculer le score proportionnel pour chaque séquence
        const sequenceScore = (currProgress / 100) * 100; 
        return acc + sequenceScore;
      }, 0);
      
      // Calculer le score global sur une échelle de 1000 points
      const finalScore = Math.min((totalScore / totalSequences) * 10, 1000);
      
      // Déterminer le niveau basé sur le score
      const level = determineLevel(finalScore);

      // Mise à jour du score et du niveau dans la base de données
      await updateUserScore(user.userId, finalScore, level);
      setUser((prevUser) => ({ ...prevUser, score: finalScore, level }));
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, userProgress, login, logout, calculateAndUpdateScore }}>
      {children}
    </UserContext.Provider>
  );
};
