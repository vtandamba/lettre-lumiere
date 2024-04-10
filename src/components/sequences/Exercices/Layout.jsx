import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { fetchAllExerciceForSequences, fetchAllExercisesForRevisions, fetchChoiceDetailsById, fetchOneSequence } from "../../../hooks/useDb";
import homeIcon from '../../../assets/images/layoutexercices/home.png'
import CircularProgress from '@mui/material/CircularProgress';
import imgEtape from '../../../assets/images/layoutexercices/etape.png';
import imgNotFound from '../../../assets/images/not-found-image.jpg'
import { CircleLoader } from "react-spinners";
import { Box, Button, Modal, Typography } from "@mui/material";
import SpringModal from "../../Modal";
import { useUser } from "../../../contexts/UserContext";
const Layout = (props) => {

    const {db , savingScore} = props;
    const { user } = useUser();
    const params = useParams();

    const id = params?.sequence;
    const idStage = params?.etape;
    const navigate = useNavigate();
    // const [tabExercicesBilan, setTabExercicesBilan] = useState([]); 
    const idSeq = parseInt(id, 10);
    const [exercises, setExercises] = useState([]);
    const [sequence, setSequence] = useState();
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [openModalEndseq, setOpenModalEndseq] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);
    const [shouldGoToNextExercise, setShouldGoToNextExercise] = useState(false);
    const [finalScore, setFinalScore] = useState()
    const [exercisesScore, setExercisesScore] = useState([]);




    const styleseq = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const url = 'https://mtsene.lpmiaw.univ-lr.fr/lettrelumiere/public/apip/user_progresses';

    useEffect(() => {


        const loadExercises = async () => {
            try {
                if (idSeq) {
                    const exercisesList = await fetchAllExerciceForSequences(idSeq);
                    const sortedExercises = exercisesList.sort((a, b) => a.order - b.order);
        
                    setExercises(sortedExercises);
                    setExercisesScore(new Array(sortedExercises.length).fill(null));
                    return exercisesList['hydra:member'];
        
                }
        
            } catch (error) {
                console.error("Erreur lors du chargement des exercices :", error);
            }
        };
        

        const loadExercisesBilan = async () => {
            try {
                if (idStage) {
                    const response = await fetchAllExercisesForRevisions(parseInt(idStage, 10));
                 
                    setExercises(response)
                    
                }

            } catch (error) {
                throw new Error(error)
            }
        }

        const loadSequence = async () => {
            if (idSeq) {
                const data = await fetchOneSequence(idSeq);
                setSequence(data);
            }
        }

        loadExercises();
        setExercisesScore(new Array(exercises.length).fill(0))
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
        } else if (exerciseType.startsWith("F")) {
            return "F";
        } else if (exerciseType.startsWith("G")) {
            return "G";
        } else if (exerciseType.startsWith("H")) {
            return "H";
        } else {
            return null;
        }
    };



    const fetchScore = (score) => {
        console.log('enregistrement du score');
        // Si un user existe , enregistrer les scores dans la base de donnée
        if (user) {
            const date = new Date();
            const scoreData = {
                pro_score: score,
                user: "/apip/users/" + user.id,
                createdAt: date.toISOString(),
                exercise:  "/apip/exercises/" + exercises[currentExerciseIndex]?.id
            };
     
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json',
                },
                body: JSON.stringify(scoreData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de l\'envoi du score');
                    }
                  
                })
                .catch(error => {
                    console.error('Erreur lors de l\'envoi du score :', error);
                   
                });
        } else { 

            const allScores = {
                "idSeq": idSeq,
                "tabScores": exercisesScore.map((el) => (el === 0 ? null : el))

            }

            savingScore(allScores)
        }
    }


    const onAttemptMade = () => {
     
        if (currentExerciseIndex < exercises.length - 1) {
            setShouldGoToNextExercise(true);
        }else {
            setOpenModalEndseq(true); 
        }
    };
    


    useEffect(() => {
        if (shouldGoToNextExercise && currentExerciseIndex < exercises.length - 1) {

        
            setAttemptCount(0);
            setCurrentExerciseIndex(prevIndex => prevIndex + 1);
            setShouldGoToNextExercise(false); // Réinitialisez le drapeau
    
        } 

    }, [shouldGoToNextExercise, currentExerciseIndex]);


    // Logique d'ouverture de la modale
    useEffect(() => {
        if (currentExerciseIndex === exercises.length - 1) {
            const sumScores = exercisesScore.reduce((accumulator, currentValue) => {
                if (currentValue !== null) {
                    return accumulator + currentValue;
                }
                return accumulator;
            }, 0);
            const avgScore = sumScores / exercisesScore.length;
            setFinalScore(avgScore);
        
          
        }
    }, [exercisesScore, currentExerciseIndex, exercises.length]);
    


    // Enregistrer le score dans le tableau de score de la séquence
    const recordAnswer = (percent) => {
        const updatedScores = [...exercisesScore];
        updatedScores[currentExerciseIndex] = percent;
        setExercisesScore(updatedScores);
        fetchScore(percent);
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
                        imgNotFound={imgNotFound}
                        isModalOpen={openModalEndseq} />
                </Suspense>
            );
        } else {
            console.error("Type d'exercice non pris en charge :", exercise.type);
            return null;
        }
    };

    // Fonction pour add une classe en fonction du score
    function getProgressClass(score, index) {
 
        if (index === currentExerciseIndex){
            return "progress-item--current";
        }
        if (score === null){
            return "progress-item--noscore"
        }
        else if (score >= 0 && score < 25) {
            return "progress-item--orange";
        } else if (score >= 25 && score < 50) {
            return "progress-item--rouge";
        } else if (score >= 50 && score < 75) {
            return "progress-item--jaune";
        } else if (score >= 75) {
            return "progress-item--vert";
        }

      
        return "progress-item--noscore"; // Retourne une chaîne vide par défaut si aucune condition n'est remplie
    }
    

    

    // const handleOpenModal = useCallback(() => {
     
    //     // setOpenModal(true);
       
    //   }, []);
      

    //   const handleCloseModal = () => {
    //     console.log('naviguer')
    //     navigate('/etapes')
    //   };


    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 700,
    //     bgcolor: 'background.paper',
    //     boxShadow: 24,
    //     p: 4,
    // };
  
    
  return (
    exercises && exercises.length > 0 ? (
   
      <div className="layout">
      
        <header className="header">
                <div className="header__infos">
                    <div className="header__etape">
                    <img src={imgEtape} alt="" />
                    <p>Etape {sequence.stage.id}</p>
                    </div>
                    <p className="header__sequence"> {sequence?.seq_title}</p>
                </div>
                <img src={homeIcon} alt="Home" className="header__home" onClick={ ()=>navigate(`/etapes/${id || idSeq}`)} />

                <ul className="progress-global">
                    {exercisesScore.map((score, index) => (
                    <li key={index} className={`progress-item ${getProgressClass(score, index)}`}>
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
                {openModalEndseq && (
                    <>
                        <p> <Link to={`/etapes/${id || idSeq}`}> - </Link></p>
                        <Modal
                            keepMounted
                            open={true}
                          
                            aria-labelledby="keep-mounted-modal-title"
                            aria-describedby="keep-mounted-modal-description"
                        >
                            <Box sx={{
            
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                        
                                }}>
                                <Typography 
                                    id="keep-mounted-modal-title" 
                                    variant="h3" component="h2" 
                                    textAlign="center"
                                    sx={{ 
                                        mt: 2, 
                                        fontFamily: '"General Sans", sans-serif', 
                                        fontSize: "3.2rem",
                                    }} >
                                    C'est la fin de cette séquence
                                </Typography>
                                <Typography 
                                id="keep-mounted-modal-description" 
                                sx={{ 
                                    mt: 2, 
                                    textAlign: 'center',
                                    fontFamily: '"Switzer", sans-serif', 
                                    fontSize: "2.2rem", }}
                                >
                                    {finalScore && finalScore <= 45 ? "C'est du bon boulot mais tu peux faire mieux, n'abandonnes pas" : finalScore > 45 && finalScore < 70 ? 'Bon boulot, tu as un très bon score' : 'Excellent travail, tu t\'en es très bien sorti'}
                                </Typography>
                                <Button
                                    component={Link}
                                    to={`/etapes/${id || idSeq}`}
                                    sx={{
                                    mt: 4,
                                    bgcolor: 'success.main',
                                    ':hover': {
                                        bgcolor: 'success.dark',
                                    },
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '20px',
                                    fontSize:"1.5rem"
                                    }}
                                >
                                    Continuer
                                </Button>
</Box>

                        </Modal>
                    </>
                )}
                <SpringModal isOpen={openModal}  setOpen={setOpenModal} />
            </div>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircleLoader color="#36d7b7" size={140} />
            </div>
        )
    );

        
};

export default Layout;
