
import React, { useState, useEffect } from 'react';

export function getElementRandom(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
    }


export const LinearCountdown = ({ onCountdownFinish }) => {
    const [count, setCount] = useState(30);
    
    useEffect(() => {
        if(count === 0) {
            onCountdownFinish();
            return;
        }
    
        const interval = setInterval(() => {
            setCount((currentCount) => currentCount - 1);
        }, 1000); 
    
        return () => clearInterval(interval); 
    }, [count, onCountdownFinish]);
    
    return <React.Fragment>{count}</React.Fragment>;
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Échange
  }
  return array;
};
  

export function diviserEnSyllabes(mot) {
    const regExpSyllabes = /[aeiouy]+[^aeiouy\s]*/gi;
    return mot.match(regExpSyllabes) || [];
  }


  export function extraireSyllabes(mot) {
    // Supprimer les caractères spéciaux et les espaces
    const motNettoye = mot.toLowerCase().replace(/[^a-z]/g, '');
  
    // Tableau des voyelles accentuées
    const voyellesAccentuees = ['a', 'à', 'â', 'e', 'é', 'è', 'ê', 'ë', 'i', 'î', 'ï', 'o', 'ô', 'ö', 'u', 'ù', 'û', 'ü', 'y', 'ŷ', 'ÿ'];
  
    // Tableau des groupes de consonnes
    const groupesConsonnes = ['bl', 'br', 'ch', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'sc', 'sk', 'sl', 'sm', 'sn', 'sp', 'st', 'str', 'sw', 'tr'];
  
    // Tableau pour stocker les syllabes
    const syllabes = [];
  
    // Fonction pour vérifier si une lettre est une voyelle
    function estVoyelle(lettre) {
        return voyellesAccentuees.includes(lettre);
    }
  
    // Diviser le mot en syllabes
    let syllabeCourante = '';
    for (let i = 0; i < motNettoye.length; i++) {
        const lettreCourante = motNettoye[i];
  
        // Ajouter la première lettre à la syllabe courante
        if (syllabeCourante === '') {
            syllabeCourante += lettreCourante;
            continue;
        }
  
        const lettrePrecedente = motNettoye[i - 1];
  
        // Traiter les groupes de consonnes
        const groupeConsonnes = lettrePrecedente + lettreCourante;
        if (groupesConsonnes.includes(groupeConsonnes)) {
            syllabeCourante += lettreCourante;
            continue;
        }
  
        // Vérifier si la lettre courante est une voyelle
        if (estVoyelle(lettreCourante)) {
            // Si la dernière syllabe est différente de la courante, l'ajouter
            if (syllabes.length === 0 || syllabes[syllabes.length - 1] !== syllabeCourante) {
                syllabes.push(syllabeCourante);
            }
  
            // Commencer une nouvelle syllabe
            syllabeCourante = lettreCourante;
        } else {
            // Ajouter la lettre courante à la syllabe courante
            syllabeCourante += lettreCourante;
        }
    }
  
    // Ajouter la dernière syllabe si elle n'est pas répétée
    if (syllabes.length === 0 || syllabes[syllabes.length - 1] !== syllabeCourante) {
        syllabes.push(syllabeCourante);
    }
  
    return syllabes;
}




    