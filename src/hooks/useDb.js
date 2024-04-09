
//  ici on recupere fech les données de db.sqlite qui sont dans l'api http ... 
const baseUrl = 'http://lettrelumiere.localhost:8000/apip/'
    
const urlSequences = baseUrl + 'sequences';
const urlExercices = baseUrl +'exercises';
const urlStages = baseUrl +'stages';
const urlUser = baseUrl +'users'; 
const urlExercisesRevisions = baseUrl + 'reports'


export const fetchAllStages = async () => {
    try {
        const response = await fetch(urlStages);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des étapes');
        }
        const data = await response.json();
       
        return data['hydra:member'];
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
        const data = await response.json();
        console.log('liste des séquences', data['hydra:member'][2])
        return data['hydra:member'];
    } catch (error) {
        console.error("Erreur lors de la récupération des séquences:", error);
        throw error; 
    }
}



export const fetchOneSequence = async(id) => {
    try {
   
        const response = await fetch(`${urlSequences}/${id}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de la séquence');
        }
        const data = await response.json();

        return data;
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
        const data = await response.json();
       
        return data['hydra:member'];
    } catch (error) {
        console.error("Erreur lors de la récupération des exercices:", error);
        throw error;
    }
};
export const fetchAllExerciceForSequences = async (sequenceId) => {
    try {
        const response = await fetch(`${urlExercices}?sequence=${sequenceId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des exercices');
        }
        const data = await response.json();
       
        return data['hydra:member'];
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
        const response = await fetch(`${urlSequences}?stage=${stageId}`);
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
        const response = await fetch(`${urlUser}/${userId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de l\'utilisateur');
        }
        return response.json();

    } catch (error){
        console.error("Erreur lors de la récupération de  l'utilisateur", error);
        throw error; 
    }
}


// Fetch le contenu d'exercices
export const fetchChoiceDetailsById = async (choiceId) => {
    const response = await fetch(`http://lettrelumiere.localhost:8000/apip/choices/${choiceId}`);
    if (!response.ok) {
        throw new Error('Problème lors de la récupération des détails du choix');
    }
    return response.json();
};
