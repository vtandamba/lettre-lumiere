// hooks/useUserProgress.js
import { useCallback } from 'react';
import db from '../Dexie';

const determineUserLevel = (score) => {
    if (score >= 80) return 'perfect';
    if (score >= 60) return 'gold';
    if (score >= 45) return 'silver';
    if (score >= 10) return 'bronze';
    return 'nobe';
};

const useUserProgress = () => {
    const updateUserScoreAndLevel = useCallback(async (userId) => {
        try {
            const sequences = await db.sequences.toArray();
            let totalScore = 0;
            let numSequences = 0;

            for (const sequence of sequences) {
                const averageScore = await db.userProgress
                    .where({ userId, sequenceId: sequence.sequenceId })
                    .toArray()
                    .then(progress => {
                        const total = progress.reduce((acc, curr) => acc + curr.score, 0);
                        return progress.length ? total / progress.length : 0;
                    });

                totalScore += averageScore;
                numSequences++;
            }

            const finalScore = numSequences ? totalScore / numSequences : 0;

            await db.users.update(userId, { score: 10, level: determineUserLevel(finalScore) });
       console.log('user updated')
        } catch (error) {
            console.error("Erreur lors de la mise à jour du score et du niveau de l'utilisateur:", error);
        }
    }, []);

    return { updateUserScoreAndLevel };
};

export default useUserProgress;
