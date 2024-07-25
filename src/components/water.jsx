import React, { useEffect } from 'react';

const Water = ({ scorePercentage, sequenceId }) => {
    useEffect(() => {
        const waterElement = document.querySelector(`.water-${sequenceId}`);
        if (!waterElement) return;

        const topB = 100 + (scorePercentage * (210 - 100));
        const topA = 100 + (scorePercentage * (210 - 100));

        waterElement.style.setProperty('--before-top', `${-topB}%`);
        waterElement.style.setProperty('--after-top', `${-topA}%`);
        console.log('water before ===== ', scorePercentage);
    }, [scorePercentage, sequenceId]);

    return null;
};

export default Water;
