import React, { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { fetchAllExerciceForSequences, fetchAllExercisesForRevisions, fetchOneSequence } from "../../../hooks/useDb";
import homeIcon from '../../../assets/images/layoutexercices/home.png'
import CircularProgress from '@mui/material/CircularProgress';
import imgEtape from '../../../assets/images/layoutexercices/etape.png';
import imgNotFound from '../../../assets/images/not-found-image.jpg'
import { CircleLoader } from "react-spinners";
const Layout = (props) => {

    const {db , user, savingScore} = props;
    const params = useParams();
    const id = params?.sequence;
    const idStage = params?.etape;
    const navigate = useNavigate();
    // const [tabExercicesBilan, setTabExercicesBilan] = useState([]); 
    const idSeq = parseInt(id, 10);
    const [exercises, setExercises] = useState([]);
    const [sequence, setSequence] = useState();
    const [sequences, setSequences] = useState();
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

    const [attemptCount, setAttemptCount] = useState(0);
    const [shouldGoToNextExercise, setShouldGoToNextExercise] = useState(false);

    const [exercisesScore, setExercisesScore] = useState([]);

    const url = 'https://vtandamb.lpmiaw.univ-lr.fr/PHP/lettre_en_lumiere/back-lettre-en-lumiere/api/api.userprogess.php';
    
    useEffect(() => {


        const loadExercises = async () => {
            try {
                if (idSeq){
                    const exercisesList = await fetchAllExerciceForSequences(idSeq);
                    const sortedExercises = exercisesList.sort((a, b) => a.order - b.order);
                    console.log(exercisesList)
                    setExercises(sortedExercises);
                    setExercisesScore(new Array(exercisesList.length).fill(0)) // Initialiser le tableau de score avec 0
                }
               
            } catch (error) {
                console.error("Erreur lors du chargement des exercices :", error);
            }
        };

        const loadExercisesBilan = async () => {
            try{      
                if (idStage){
                   const response = await fetchAllExercisesForRevisions(parseInt(idStage, 10));
                   console.log('exos du bilan',response);
                   setExercises(response)
                }
               
            }catch(error){
                throw new Error(error)
            }
        }

        const loadSequence = async () => {
            if (idSeq){
                const data = await fetchOneSequence(idSeq);
                setSequences(data)
                setSequence(data.seq_title);
    
                // console.log('idsequence ==== >', idSeq)
                // console.log('les sequences ==== >', data)
            }
     
        }

        loadExercises();

        loadSequence();
        loadExercisesBilan()
    }, [db, id]);

    const goToNextExercise = () => {
        setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
    };


    const getExerciseComponentName = (exerciseType) => {
        if (exerciseType.startsWith("A")) {
            return "A";
        } else if (exerciseType.startsWith("B")) {
            return "B";
        } else if (exerciseType.startsWith("C")) {
            return "C";
        } else if (exerciseType.startsWith("D")) {
            return "D";
        } else if (exerciseType.startsWith("E")) {
            return "E";
        }else if (exerciseType.startsWith("F")) {
            return "F"; 
        }else if (exerciseType.startsWith("G")) {
            return "G";
        } else if (exerciseType.startsWith("H")) {
            return "H";
        }else {
            return null;
        }
    };



    // useEffect(() => {

    //     if (attemptCount + 1 === 4) {

    //         setAttemptCount(0);
    //         setCurrentExerciseIndex(prevIndex => prevIndex + 1);

    //     }

    // }, [attemptCount]);

    const fetchScore = () => {

        // Si un user existe , enregistrer les scores dans la base de donnée
        if (user){

            const scoreData = {
                pro_score: exercisesScore[currentExerciseIndex],
                user_id:user.user_id,
                exercice_id:exercises[currentExerciseIndex].exercice_id
            };

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scoreData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de l\'envoi du score');
                    }
                    console.log('=================');
                    // Effectuez les actions supplémentaires ici si nécessaire
                })
                .catch(error => {
                    console.error('Erreur lors de l\'envoi du score :', error);
                    // Gérez l'erreur ici si nécessaire
                });
        }else { //Sinon envoyer les score au composant App
            
                const allScores = {
                    "idSeq" : idSeq,
                    "tabScores": exercisesScore.map((el) => (el === 0 ? null : el))

                }

                savingScore(allScores)
        }
    }


    const onAttemptMade = () => {
        // console.log('onAttemptMade');
        // console.log('shouldgo', shouldGoToNextExercise);
    
        // Vérifiez si c'est le dernier exercice
        if (currentExerciseIndex === exercises.length - 1) {
            
             // Fetch le score avant de rediriger
            fetchScore(); // Envoyer le score à la base de donnée
            navigate(`/etapes/${id || idSeq}`);
        } else {
            // Si ce n'est pas le dernier exercice, définir shouldGoToNextExercise sur vrai
            setShouldGoToNextExercise(true);
        }
    };
    
    

    useEffect(() => {
        console.log('shouldgo',shouldGoToNextExercise)
        if (shouldGoToNextExercise && currentExerciseIndex < exercises.length - 1) {
            
            console.log('enregistrement du score')
            // Envoyer la requête POST à l'API
            fetchScore();
            // fin faire le post

            setAttemptCount(0);
            setCurrentExerciseIndex(prevIndex => prevIndex + 1);
            setShouldGoToNextExercise(false); // Réinitialisez le drapeau
        }else if (shouldGoToNextExercise && currentExerciseIndex === exercises.length - 1) {
            navigate(`/etapes/${id || idSeq}`);
            console.log('Dernier exercice atteint, mais le score ne sera pas enregistré');
           
        }

    }, [shouldGoToNextExercise]);


    // Enregistrer le score dans le tableau de score de la séquence
    const recordAnswer = (percent) => {
        const updatedScores = [...exercisesScore];
        updatedScores[currentExerciseIndex] = percent;
        console.log(percent, '% de score')
        setExercisesScore(updatedScores);
    };

    // Render exercice par exercice
    const renderExerciseComponent = (exercise) => {
        const type = exercise.exo_type || exercise.rep_type;
        const componentName = getExerciseComponentName(type);
        if (componentName) {
            const ExerciseComponent = React.lazy(() => import(`./${componentName}.jsx`));

            return (
                <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><CircularProgress size={80} /></div>}>
                    <ExerciseComponent key={exercise.exerciseId} 
                                       data={exercise} onAttemptMade={onAttemptMade} 
                                       score={recordAnswer} 
                                       imgNotFound = {imgNotFound}/>
                </Suspense>
            );
        } else {
            console.error("Type d'exercice non pris en charge :", exercise.type);
            return null;
        }
    };



    
  return (
    exercises && exercises.length > 0 ? (
      <div className="layout">

        <header className="header">
          <div className="header__infos">
            <div className="header__etape">
              <img src={imgEtape} alt="" />
              <p>Etape {sequences && sequences.map((s, index) => (
                <span key={index}>{s.stage_id}{index < sequences.length - 1 ? ', ' : ''}</span>
              ))}</p>
            </div>
            <p className="header__sequence"> {sequence}</p>
          </div>
          <Link to={`/etapes/${id}`}><img src={homeIcon} alt="" className="header__home" /></Link>
          <ul className="progress-global">
            {exercisesScore.map((score, index) => (
              <li key={index} className={`progress-item ${score > 50 ? 'progress-item--vert' : score === 0 ? '' : 'progress-item--orange'}`}>
              </li>
            ))}
          </ul>
        </header>

        <main className="exercice">
          {renderExerciseComponent(exercises[currentExerciseIndex])}
          <button onClick={goToNextExercise} 
                  disabled={currentExerciseIndex === exercises.length - 1} 
                  className="exercice__validate"
          >
            Suivant

          </button>
        </main>
      </div>
    ) : (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircleLoader color="#36d7b7" size={140} />
      </div>
    )
  );
    
    
};

export default Layout;
