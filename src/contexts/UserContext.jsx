// src/contexts/UserContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { authenticateUser } from '../hooks/useAuth';
import db, { fetchUser, fetchUserProgress } from '../hooks/useDb';

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

  return (
    <UserContext.Provider value={{ user, setUser, userProgress, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
