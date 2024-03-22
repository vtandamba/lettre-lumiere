
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




    