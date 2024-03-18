import Dexie from 'dexie';

const db = new Dexie('MyDatabase');

db.version(1).stores({
    users: "++userId, username, password, level, score",
    sequences: '++sequenceId, title, stageId, description, content, medal',
    stages: '++stageId, name, description',
    exercises: '++exerciseId, sequenceId, type, consigne, complete,content, image, etiquette, order',
    userProgress: '++progressId, userId, sequenceId, exerciseId, status, score',
    test: '++testId, userId, sequenceId, score'
});

db.transaction('rw', 'users', 'stages', 'sequences', 'exercises', 'userProgress', 'test', async () => {
    // Vérifier si la table des étapes (stages) est vide
    const count = await db.stages.count();
    console.log('count', count)
    if (count === 0) {
        // La table est vide, ajouter des données initiales
        await db.users.bulkAdd([
            {username: "Marilyne", password: "marilyne", level: "bronze", score: 0},
            {username: "Victoria", password: "victoria", level: "bronze", score: 0},
            {username: "Loane", password: "loane", level: "bronze", score: 0},
        ]);

        await db.stages.bulkAdd([
                                { name: "Etape 1", description: "Etape 1" },
                                { name: "Etape 2", description: "Etape 2" },
                                { name: "Etape 3", description: "Etape 3" },
                                { name: "Etape 4", description: "Etape 4" },
                                { name: "Etape 5", description: "Etape 5" }
                                ]
                            );
//Medal = medaille
        await db.sequences.bulkAdd([
            { title: 'a-e-i', stageId: 1, description: 'Les voyelles', content: ['a', 'e', 'i'], medal: null },
            { title: 'o-u-é', stageId: 1, description: 'Les voyelles', content: ['o, u, é'], medal: null },
            { title: 'l', stageId: 1, description: 'La lettre L', content : ['l'], medal: null },
            { title: 'r', stageId: 1, description: 'La lettre R', content: ['r'], medal: null },
            { title: 'lettre muette', stageId: 1, description: 'Lettre Muette', content: ['lettre muette'], medal: null },
            { title: 'f', stageId: 2, description: 'La lettre F', content:['f'], medal: null },
            { title: 'j', stageId: 2, description: 'La lettre J', content: ['j'], medal: null },
            { title: 'v', stageId: 3, description: 'La lettre V', content: ['v'], medal: null },
            { title: 'b', stageId: 3, description: 'La lettre B', content: ['b'], medal: null },
            { title: 'CH', stageId: 4, description: 'CH', content: ['ch'], medal: null },
            { title: 'P', stageId: 4, description: 'La lettre P', content: ['p'], medal: null },
            
        ]);

        await db.exercises.bulkAdd([    //Létat c'est pour si l'exercice est fait ou pas.
            {sequenceId: 1, type:"A1", consigne:"Ecoute et répète", complete:false, content: {
                                                                                                                choices: ["la", "le", "li", "ma", "mi", "pe"],
                                                                                                                answer: null,
                                                                                                            }, image: null, etiquette: null, order:1
            },
             {sequenceId: 1, type:"B1", consigne:"Trouve la bonne syllabe", complete:false, content: {
                                                                                                            choices: ["la", "le", "li", "ma", "mi", "pe"],
                                                                                                            answer: null,
                                                                                                        }, image: null, etiquette: null, order: 2
             },
             {sequenceId: 1, type:"C1", consigne:"Écris la syllabe (avec modèle)", complete:false, content: {
                                                                                                                        choices: ["la", "le", "li", "ma", "mi", "pe"],
                                                                                                                        answer: null,
                                                                                                                    }, image: null, etiquette: "la", order: 3
            },
            {sequenceId: 1, type:"D1", consigne:"Trouve les 3 écritures de la même syllabe", complete:false, content: {
                choices: ["la", "le", "li", "ma", "mi", "pe"],
                answer: null,
                }, image: null, etiquette: "la", order: 4
            },
            {sequenceId: 1, type:"E1", consigne:"Écris la syllabe (sans modèle)", complete:false, content: {
                choices: ["la", "le", "li", "ma", "mi", "pe"],
                answer: null,
                }, image: null, etiquette: "la", order: 5
            },
            {sequenceId: 1, type:"G1", consigne:"Trouve la bonne syllabe le plus vite possible.", complete:false, content: {
                choices: ["la", "le", "li", "ma", "mi", "pe"],
                answer: null,
                }, image: null, etiquette: "la", order: 6
            },
        










            {sequenceId: 2, type:"A1", consigne:"Ecoute et répète", complete:false, content: {
                choices: ["lo", "lu", "lé", "mo", "mu", "pé"],
                answer: null,
            }, image: null, etiquette: null, order:1
            },
            {sequenceId: 2, type:"B1", consigne:"Trouve la bonne syllabe", complete:false, content: {
                        choices: ["lo", "lu", "lé", "mo", "mu", "pé"],
                        answer: null,
                    }, image: null, etiquette: null, order: 2
            },
            {sequenceId: 2, type:"C1", consigne:"Écris la syllabe (avec modèle)", complete:false, content: {
                                    choices: ["lo", "lu", "lé", "mo", "mu", "pé"],
                                    answer: null,
                                }, image: null, etiquette: "la", order: 3
            },
            {sequenceId: 2, type:"D1", consigne:"Trouve les 3 écritures de la même syllabe", complete:false, content: {
            choices: ["lo", "lu", "lé", "mo", "mu", "pé"],
            answer: null,
            }, image: null, etiquette: "la", order: 4
            },
            {sequenceId: 2, type:"E1", consigne:"Écris la syllabe (sans modèle)", complete:false, content: {
            choices: ["lo", "lu", "lé", "mo", "mu", "pé"],
            answer: null,
            }, image: null, etiquette: "la", order: 5
            },
            {sequenceId: 2, type:"G1", consigne:"Trouve la bonne syllabe le plus vite possible.", complete:false, content: {
            choices: ["lo", "lu", "lé", "mo", "mu", "pé"],
            answer: null,
            }, image: null, etiquette: "la", order: 6
            },

            
        ]);
    }
}).catch((e) => {
    console.error("Erreur lors de l'initialisation de la base de données:", e);
});

export default db;
