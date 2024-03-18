export const fetchAllStages = async (db) => {
    try {
      const allStages = await db?.stages.toArray();
    //   console.log('etapes', allStages); 
      return allStages; 
    } catch (error) {
      console.error("Erreur lors de la récupération des étapes:", error);
      throw error; 
    }
  }

  fetchAllStages().then(allStages => {
    
  }).catch(error => {
    throw new Error(error)
  });


export const fetchAllSequences = async(db) => {
    try{
        const allSequences = await db?.sequences.toArray();
        // console.log('sequences', allSequences);
        return allSequences;
    }catch(error) {
        console.error("Erreur lors de la récupération des étapes:", error);
        throw error; 
    }
}

export const fetchOneSequence = async(db, id) => {
  try{
    console.log(id)
       const sequence =  await db?.sequences.get(parseInt(id, 10));
      console.log(sequence)
      return sequence
  }catch(error) {
    console.error("Erreur lors de la récupération des étapes:", error);
    throw error; 
    }
}

export const fetchAllExerciceForSequences = async (db, id) => {
  try {
    const exercices = await db?.exercises.where({ sequenceId: Number(id) }).toArray();
    console.log(exercices);
    return exercices;
  } catch (error) {
    console.error("Erreur lors de la récupération des exercices :", error);
    throw error;
  }
};
