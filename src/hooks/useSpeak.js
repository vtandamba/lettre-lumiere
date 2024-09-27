import { useCallback } from 'react';
import sound1 from '../assets/sons/graphemes/in.mp3';
import sound2 from '../assets/sons/graphemes/an.mp3';
import sound3 from '../assets/sons/graphemes/au.mp3';
import sound4 from '../assets/sons/graphemes/eu.mp3';
import sound5 from '../assets/sons/graphemes/on.mp3';
import sound6 from '../assets/sons/graphemes/ou.mp3';
import sound7 from '../assets/sons/graphemes/oi.mp3';
import sound8 from '../assets/sons/graphemes/é.mp3';
import sound9 from '../assets/sons/graphemes/è.mp3';
import sound10 from '../assets/sons/graphemes/ien.mp3';

const graphemeToSoundMap = {
    'in': sound1,
    'an': sound2,
    'au': sound3,
    'eu': sound4,
    'on': sound5,
    'ou': sound6,
    'oi': sound7,
    'é': sound8,
    'è': sound9,
    'ien': sound10,
    '_ed': sound9,
    '_er': sound9
};

const isGrapheme = (text) => {
    return graphemeToSoundMap[text] || null;
};

// Correction: Renommer la fonction pour qu'elle commence par 'use'
const useSpeak = () => {
    // Utilisation correcte de useCallback dans un hook personnalisé
    const speak = useCallback((text) => {
        window.speechSynthesis.cancel();

        const sound = isGrapheme(text);
        if (sound) {
            const audio = new Audio(sound);
            audio.play();
        } else {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'fr-FR';
            window.speechSynthesis.speak(utterance);
        }
    }, []);

    return speak;
};

export default useSpeak;
