// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchUser } from '../hooks/useDb'; // Assure-toi que fetchUser est importé correctement
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idUser, setIdUser] = useState(sessionStorage.getItem('user_id'));

  useEffect(() => {
    const fetchUserData = async () => {
      const userInfo = idUser ? await fetchUser(parseInt(idUser, 10)) : null;
      setUser(userInfo);
    };
    fetchUserData();
  }, [idUser]);

  const checkUserStatus = async () => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      const userInfo = await fetchUser(parseInt(userId, 10));
      setUser(userInfo);
    } else {
      setUser(null); 
    }
  };

  useEffect(() => {
    checkUserStatus(); // Vérifie l'état initial au montage du composant

    const handleStorageChange = (event) => {
      if (event.key === 'user_id') {
        checkUserStatus(); // Vérifie et met à jour l'état de l'utilisateur si nécessaire
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const value = {
    user,
    setUser,
    idUser,
    setIdUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
