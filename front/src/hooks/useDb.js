
//  ici on recupere fech les données de db.sqlite qui sont dans l'api http ... 
    
const urlSequences = 'https://vtandamb.lpmiaw.univ-lr.fr/PHP/lettre_en_lumiere/back-lettre-en-lumiere/api/api.sequences.php';
const urlExercices = 'https://vtandamb.lpmiaw.univ-lr.fr/PHP/lettre_en_lumiere/back-lettre-en-lumiere/api/api.exercices.php';
const urlStages = 'https://vtandamb.lpmiaw.univ-lr.fr/PHP/lettre_en_lumiere/back-lettre-en-lumiere/api/api.stages.php';
const urlUser = 'https://vtandamb.lpmiaw.univ-lr.fr/PHP/lettre_en_lumiere/back-lettre-en-lumiere/api/api.user.php'; 
const urlExercisesRevisions = 'https://vtandamb.lpmiaw.univ-lr.fr/PHP/lettre_en_lumiere/back-lettre-en-lumiere/api/api.report.php'
export const fetchAllStages = async () => {
    try {
        const response = await fetch(urlStages);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des étapes');
        }
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchAllSequences = async() => {
    try {
        const response = await fetch(urlSequences);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des séquences');
        }
        return response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des séquences:", error);
        throw error; 
    }
}



export const fetchOneSequence = async(id) => {
    try {
        const response = await fetch(`${urlSequences}?sequence_id=${id}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de la séquence');
        }
        return response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération de la séquence:", error);
        throw error; 
    }
}
  


// les exercices 
export const fetchAllExercice = async () => {
    try {
        const response = await fetch(`${urlExercices}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des exercices');
        }
        return response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des exercices:", error);
        throw error;
    }
};
export const fetchAllExerciceForSequences = async (sequenceId) => {
    try {
        const response = await fetch(`${urlExercices}?sequence_id=${sequenceId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des exercices');
        }
        return response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des exercices:", error);
        throw error;
    }
};

export const fetchAllExercisesForRevisions = async(stageId) => {
    try {
        console.log(stageId);
        const response = await fetch(`${urlExercisesRevisions}?stage_id=${stageId}`);
        if (!response.ok) {
            
            throw new Error('Erreur lors de la récupération des exercices du bilan');
        }
        return response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des exercices du bilan:", error);
        throw error;
    }
}

// les séquences
export const fetchSeqByStageId = async (stageId) => {
    try {
        const response = await fetch(`${urlSequences}?stage_id=${stageId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de la séquence');
        }
        return response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération de la séquence:", error);
        throw error; 
    }
};


// le user
export const fecthUser = async (userId) => {

    try{
        const response = await fetch(`${urlUser}?user_id=${userId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de l\'utilisateur');
        }
        return response.json();

    } catch (error){
        console.error("Erreur lors de la récupération de  l'utilisateur", error);
        throw error; 
    }
}