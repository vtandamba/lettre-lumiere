

import React, { createContext, useState, useContext, useEffect } from 'react';
import {fecthUser} from '../hooks/useDb'

const UserContext = createContext();


export const useUser = () => useContext(UserContext);


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idUser, setIdUser] = useState(sessionStorage.getItem('user_id'));

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = idUser ? await fecthUser(idUser) : null;
      setUser(userInfo);
    };
    fetchUser();
  }, [idUser]);

  const checkUserStatus = async () => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
        
        const userInfo = await fecthUser(userId);
        setUser(userInfo);
    } else {
        setUser(null); 
    }
};

  // Handle user ID change
  useEffect(() => {
    checkUserStatus(); // Vérifie l'état initial au montage du composant

    // Fonction pour gérer les changements de sessionStorage
    const handleStorageChange = (event) => {
        if (event.key === 'user_id') {
            checkUserStatus(); // Vérifie et met à jour l'état de l'utilisateur si nécessaire
        }
    };

    // Ajoute un écouteur pour l'événement storage
    window.addEventListener('storage', handleStorageChange);

    // Nettoie l'écouteur lors du démontage du composant
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
}, []);

  // Value to pass to the context
  const value = {
    user,
    setUser,
    idUser,
    setIdUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
