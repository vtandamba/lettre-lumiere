import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchAllExerciceForSequences, fetchOneSequence } from "../hooks/useDb";
import DOMPurify from 'dompurify';
import videoCam from '../assets/images/camera.svg'
import imgEtape from '../assets/images/layoutexercices/etape.png';
import {BounceLoader} from 'react-spinners'
import nextIcon from '../assets/images/next.svg'
import CountUp from 'react-countup';
import MainHeader from "../components/MainHeader";
//Import des différentes coupes

import silverMedal from '../assets/gamification/silverMedal.png';
import goldMedal from '../assets/gamification/goldenMedal.png';
import bronzeMedal from '../assets/gamification/bronzeMedal.png';
import { useUser } from "../contexts/UserContext";


const SequenceHome = (props) => {

    const {db, allScoreByExercises} = props;
    const { user } = useUser();
    
    console.log('je suis le user avec l\'identifiant', user)
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
            console.log(loadedSequences);
            setSequence(loadedSequences);
      
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
        console.log('sequence',sequence);
        const exercisesScore = async () => {
            // Si il y a un utilisateur connecté
            if (user){
                console.log('id du gars connecté hors du',user.user_id);
                const id = user.user_id
                console.log('salut je suis connéctée');
                try {
                    const scorePromises = exercises?.map(async (exercise) => {
                        console.log('dans le try')
                        console.log('id du gars connecté',id);
                        const response = await fetch(`https://vtandamb.lpmiaw.univ-lr.fr/PHP/lettre_en_lumiere/back-lettre-en-lumiere/api/api.userprogess.php?user_id=${sessionStorage.getItem('user_id')}&exercice_id=${exercise.exercice_id}`);
                        console.log('apres le fetch')
                        if (!response.ok) {
                            console.log('response is not okay')
                            return null;
                        }
                        const data = await response.json();
                        console.log('ma progression', data)
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
            }else if (!user && allScoreByExercises && allScoreByExercises.length > 0) {
                // Si l'utilisateur n'est pas connecté et que des scores sont disponibles dans allScoreByExercises4
                console.log('salut tu n\'es pas connecté');
                const filteredScores = allScoreByExercises.filter(el => el.idSeq === idSeq);
                if (filteredScores.length > 0) {
                    const tabScores = filteredScores[0].tabScores;
                    const sumScores = tabScores.reduce((accumulator, currentValue) => {
                        if (currentValue !== null) {
                            return accumulator + currentValue;
                        }
                        return accumulator;
                    }, 0);
                    const avgScore = sumScores / tabScores.length;
                    setFinalScore(avgScore);
                    console.log('sum ======>', avgScore, tabScores.length);
                }
            }
        };
        
        
        exercisesScore();
    }, [exercises, user, idSeq])



    useEffect(() => {
        setOpen(true);
        console.log(tabScore);
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


    return <React.Fragment>
                <MainHeader role="user" link="/etapes"/>
                <div className="sequence">
                    {/* {process.env.REACT_APP_NAME_VARIABLE} */}
                
                    <div className="header">
                        <div className="header__title">

                            <div className="header__etape">
                                <img src={imgEtape} alt="" />
                                <p>Etape {sequence?.stage.id}</p>
                            </div>
                            <p className="header__sequence">{sequence?.seq_title}</p>
                        </div>

                        <div className="header__percent">
                            {/* <img src={argentMedal} alt="medaille" /> */}
                            <p><CountUp end={finalScore}/> %</p>
                            {finalScore !== 0 && <img src={(finalScore < 30) ? bronzeMedal : (finalScore > 30 && finalScore <60) ? silverMedal : goldMedal} alt="médaille" />}
                        </div>

                        <div className="header__actions">
                            <img src={videoCam} alt="Video Cam" onClick={() => setOpen(true)} />
                        </div>
                    </div>
                    <main className="exercises">
                            {isLoading ? (
                                <BounceLoader color="#36d7b7" size={110} className="loader" cssOverride={{ marginLeft: '50%' }} />
                            ) : exercises.length ? (
                                <ul className="exercises__list">
                                    {exercises.map((el, index) => {
                                        let progressClass = "progress-item--no-score";
                                        if (user && tabScore.length > 0) {
                                            if (tabScore[index] !== null) {
                                                if (tabScore[index] <= 49) {
                                                    progressClass = "progress-item--orange";
                                                } else if (tabScore[index] >= 50) {
                                                    progressClass = "progress-item--vert";
                                                }
                                            }

                                        } else {
                                            // Si les scores sont disponibles dans allScoreByExercises
                                            if (allScoreByExercises && allScoreByExercises.length > 0) {
                                                const filteredScores = allScoreByExercises.filter(el => el.idSeq === idSeq);
                                                if (filteredScores.length > 0) {
                                                    const tabScores = filteredScores[0].tabScores;
                                                    if (tabScores[index] !== null) {
                                                        if (tabScores[index] >= 0 && tabScores[index] < 25) {
                                                            progressClass = "progress-item--orange";
                                                        } else if (tabScores[index] >= 25 && tabScores[index] < 50){
                                                            progressClass="progress-item--rouge"
                                                        } else if (tabScores[index] >=50 && tabScores[index]< 75){
                                                            progressClass="progress-item--jaune"
                                                        }else if (tabScores[index] >= 75) {
                                                            progressClass = "progress-item--vert";
                                                        }
                                                    } else {
                                                        progressClass = "progress-item-no-score"
                                                    }
                                                }
                                            }
                                        }
                                        const cleanInstruction = DOMPurify.sanitize(el.exo_instruction);
                                        return (
                                            <li className="exercises__item" key={el.exercice_id}>
                                                <div className={`progress-item ${progressClass}`}></div>
                                                <p className="consigne">{cleanInstruction}</p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="exercises__error">Aucun exercice enregistré dans cette séquence pour le moment</p>
                            )}
                            <Outlet />
                    </main>
                    <footer>
                    { (exercises && exercises.length === 0) ||  <Link to="exo"><div className="sequence__start">
                        START
                        <img src={nextIcon} alt="next" />
                        </div>
                        </Link>}

                    </footer>
                </div>
    </React.Fragment>

}

export default SequenceHome;
