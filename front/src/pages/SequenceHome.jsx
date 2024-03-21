import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchAllExerciceForSequences, fetchOneSequence } from "../hooks/useDb";
import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import Button from "../components/Button";
import videoCam from '../assets/images/camera.svg'
import imgEtape from '../assets/images/layoutexercices/etape.png';

//Import des différentes coupes
import argentMedal from '../assets/gamification/médaille=argent.png';
import bronzeMedal from '../assets/gamification/médaille=bronze.png';
import orMedal from '../assets/gamification/médaille=or.png';
import CountUp from 'react-countup';

const SequenceHome = ({ db }) => {

    const params = useParams();
    const id = params?.sequence;
    // Convertir sequenceId en entier
    const idSeq = parseInt(id, 10);

    const [sequence, setSequence] = useState();
    const [exercises, setExercises] = useState([]);
    const [tabScore, setTabScore] = useState([]);
    const [finalScore, setFinalScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const videoSrc = `/video/SEQUENCE ${encodeURIComponent(id - 1)}.mp4`;
    console.log(videoSrc)


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {

        const loadSequences = async () => {

            const loadedSequences = await fetchOneSequence(idSeq);
            setSequence(loadedSequences);
            console.log(loadedSequences[0])
        };

        const loadExercises = async () => {
            setIsLoading(true);
            setError(null);
            try {

                const exercisesList = await fetchAllExerciceForSequences(idSeq);
                const sortedExercises = exercisesList.sort((a, b) => a.order - b.order);
                console.log('liste dexos', exercisesList);
                setExercises(sortedExercises);
            } catch (error) {
                setError("Impossible de charger les exercices");
                console.error("Erreur lors du chargement des exercices :", error);
            }
            setIsLoading(false);

        };

 
        loadExercises();
        loadSequences();

    }, [idSeq]);


    useEffect(() => {

        const exercisesScore = async () => {
            try {
                const scorePromises = exercises?.map(async (exercise) => {
                    const response = await fetch(`https://vtandamb.lpmiaw.univ-lr.fr/PHP/lettre_en_lumiere/back-lettre-en-lumiere/api/api.userprogess.php?user_id=1&exercice_id=${exercise.exercice_id}`);
                    if (!response.ok) {
                      
                        return null;
                    }
                    const data = await response.json();
             
                    const score = Array.isArray(data) && data.length > 0 && data[0].pro_score !== undefined ? data[0].pro_score : null;
                    console.log(`Score pour l'exercice ${exercise.exercice_id}:`, score);
                    return score;
                });
        
                const scores = await Promise.all(scorePromises);
                setTabScore(scores);
                console.log('Tous les scores ont été récupérés:', scores);
            } catch (error) {
                console.error("Erreur lors de la récupération des scores:", error);
            }
        };
        
    
        exercisesScore();
       
       

    }, [exercises, ])



    useEffect(() => {
        setOpen(true);
        if (tabScore.length){
            const getFinalScore = tabScore?.reduce((accumulator, currentValue) => {
            
                if (currentValue === null) {
                    currentValue = 0;
                }
                return accumulator + currentValue;
            }, 0) / tabScore.length;
            setFinalScore(getFinalScore); 
            console.log('sum ======>' , getFinalScore, tabScore?.length)
        }
       
       
    }, [tabScore])



    const handleCloseModal = () => {
        setOpen(false);
    };



    // Si une erreur s'est produite lors du chargement des données
  


    return <div className="sequence">
        {/* {process.env.REACT_APP_NAME_VARIABLE} */}
        <header className="header">
            <div className="header__title">

                <div className="header__etape">
                    <img src={imgEtape} alt="" />
                    <p>Etape {sequence && sequence.map((s, index) => (
                        <span key={index}>{s.stage_id}{index < sequence.length - 1 && ', '}</span>
                    ))}</p>
                </div>
                <p className="header__sequence">{sequence?.title}</p>
            </div>

            <div className="header__percent">
                <p><CountUp end={finalScore}/> %</p>
                <img src={argentMedal} alt="medaille" />
            </div>

            <div className="header__actions">
                <img src={videoCam} alt="Video Cam" onClick={() => setOpen(true)} />
            </div>
        </header>
        <main className="exercises">
            {/* <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <video style={{ width: "40vw" }} src={videoSrc} controls autoPlay />
                    </Typography>
                </Box>
            </Modal> */}

            
            {
            exercises.length ? (
                isLoading ? (
                <div className="circular-progress">
                    <CircularProgress size={140} />
                </div>
                ) : (
                <ul className="exercises__list">
                      {exercises.map((el, index) => {
                    let progressClass = "";
                 
                    if (tabScore[index] === null) {
                        progressClass = "progress-item--no-score"; 
                    } else if (tabScore[index] <= 49) {
                        progressClass = "progress-item--orange"; // Classe pour les scores inférieurs ou égaux à 49
                    } else if (tabScore[index] >= 50) {
                        progressClass = "progress-item--vert"; // Classe pour les scores supérieurs ou égaux à 50
                    }

                        return (
                            <li className="exercises__item" key={el.exercice_id}>
                                <div className={`progress-item ${progressClass}`}></div>
                                <p className="consigne">{el.exo_consigne}</p>
                            </li>
                        );
                    })}
                 </ul>
                    )
                ) : (
                    <p className="exercises__error">Aucun exercice enregistré pour cette séquence pour le moment</p>
                )
            }

            
            <Outlet />
        </main>
        <footer>
        <Link to="exo"><div className="sequence__start">Commencer</div></Link>
        </footer>
    </div>

}

export default SequenceHome;
