import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchAllExerciseForSequences, fetchOneSequence } from "../hooks/useDb";
import DOMPurify from 'dompurify';
import videoCam from '../assets/images/camera.svg'
import imgEtape from '../assets/images/layoutexercices/etape.png';
import { BounceLoader } from 'react-spinners'
import nextIcon from '../assets/images/next.svg'
import CountUp from 'react-countup';
import MainHeader from "../components/MainHeader";
import SpringModal from "../components/ModalMedia";
import closeIcon from '../assets/images/closeIconBlack.svg'
import video from '../assets/video/r.mp4'


//Import des différentes coupes
import silverMedal from '../assets/gamification/silverMedal.png';
import goldMedal from '../assets/gamification/goldenMedal.png';
import bronzeMedal from '../assets/gamification/bronzeMedal.png';
import { useUser } from "../contexts/UserContext";


const SequenceHome = (props) => {

    const { allScoreByExercises } = props;
    const { user } = useUser();
    const [videoSrc, setVideoSrc] = useState('');

    const params = useParams();
    const id = params?.sequence;
    // Convertir sequenceId en entier
    const idSeq = parseInt(id, 10);

    const [sequence, setSequence] = useState();
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tabScore, setTabScore] = useState([]);
    const [finalScore, setFinalScore] = useState(0);
    const [openModal, setOpenModal] = useState(true);


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
            console.log(loadedSequences, 'sequence');
            setSequence(loadedSequences);

        };

        const loadExercises = async () => {
            setIsLoading(true);
            setError(null);
            try {

                const exercisesList = await fetchAllExerciseForSequences(idSeq);
                const sortedExercises = exercisesList.sort((a, b) => a.order - b.order);

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
            // Si il y a un utilisateur connecté
            if (user) {


                // try {
                //     const scorePromises = exercises?.map(async (exercise) => {

                //         const response = await fetch(`https://mtsene.lpmiaw.univ-lr.fr/lettrelumiere/public/apip/user_progresses?user=${sessionStorage.getItem('user_id')}&exercise=${exercise.id}`);

                //         if (!response.ok) {

                //             return null;
                //         }
                //         const data = await response.json();

                //         // Chercher le plus grand score pour un même exercice
                //         const scores = data['hydra:member'];
                //         const highestScore = scores.reduce((maxScore, current) => {
                //             if (current.pro_score === null || current.pro_score === undefined) {
                //                 return maxScore;
                //             }
                //             return maxScore === null ? current.pro_score : Math.max(maxScore, current.pro_score);
                //         }, null); 

                //         return highestScore;
                //     });

                //     const scores = await Promise.all(scorePromises);

                //     setTabScore(scores);

                // } catch (error) {
                //     console.error("Erreur lors de la récupération des scores:", error);
                // }
            } else if (!user && allScoreByExercises && allScoreByExercises.length > 0) {
                // Si l'utilisateur n'est pas connecté et que des scores sont disponibles dans allScoreByExercises4

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


                }
            }
        };

 // todo faire les exo de tyoe D
        exercisesScore();
    }, [exercises, user, idSeq])
// dynamiser l'affichage des video
    useEffect(() => {
        if (sequence?.title) {
            import(`../assets/video/${sequence?.title}.mp4`)
                .then((module) => {
                    setVideoSrc(module.default);
                })
                .catch((err) => {
                    console.error("Erreur lors du chargement de la vidéo:", err);
                });
        }
    }, [sequence?.title]);


    useEffect(() => {

        if (tabScore.length) {
            const getFinalScore = tabScore?.reduce((accumulator, currentValue) => {

                if (currentValue === null) {

                    currentValue = 0;
                }
                return accumulator + currentValue;
            }, 0) / tabScore.length;
            setFinalScore(getFinalScore);

        }


    }, [tabScore])


    return <React.Fragment>
        <MainHeader role="user" link="/etapes" />
        <div className="sequence">

            <div className="header">
                <div className="header__title">

                    <div className="header__etape">
                        <img src={imgEtape} alt="" />
                        <p>Etape {sequence?.stageId}</p>
                        {console.log(sequence?.title)}
                    </div>
                    <p className="header__sequence">{sequence?.title}</p>
                </div>

                <div className="header__percent">

                    <p><CountUp end={finalScore} /> %</p>
                    {finalScore !== 0 && <img src={(finalScore < 30) ? bronzeMedal : (finalScore > 30 && finalScore < 60) ? silverMedal : goldMedal} alt="médaille" />}
                </div>

                <div className="header__actions">
                    <img src={videoCam} alt="Video Cam" onClick={() => setOpenModal(true)} className="sequence__video" />
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
                                    if (tabScore[index] >= 0 && tabScore[index] < 25) {
                                        progressClass = "progress-item--orange";
                                    } else if (tabScore[index] >= 25 && tabScore[index] < 50) {
                                        progressClass = "progress-item--rouge"
                                    } else if (tabScore[index] >= 50 && tabScore[index] < 75) {
                                        progressClass = "progress-item--jaune"
                                    } else if (tabScore[index] >= 75) {
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
                                            } else if (tabScores[index] >= 25 && tabScores[index] < 50) {
                                                progressClass = "progress-item--rouge"
                                            } else if (tabScores[index] >= 50 && tabScores[index] < 75) {
                                                progressClass = "progress-item--jaune"
                                            } else if (tabScores[index] >= 75) {
                                                progressClass = "progress-item--vert";
                                            }
                                        } else {
                                            progressClass = "progress-item-no-score"
                                        }
                                    }
                                }
                            }
                            const cleanInstruction = DOMPurify.sanitize(el.consigne);
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
                {(exercises && exercises.length === 0) || <Link to="exo"><div className="sequence__start">
                    Commencer
                    <img src={nextIcon} alt="next" />
                </div>
                </Link>}

            </footer>

            <SpringModal isOpen={openModal} setOpen={setOpenModal} >

                <img src={closeIcon} alt="Fermer la vidéo" className="close" onClick={() => setOpenModal(false)} />
                <video controls autoPlay className="sequence__video" onError={(e) => e.target.innerHTML = "La vidéo n'est pas disponible pour le moment. Veuillez réessayer plus tard."}>
                    {videoSrc ? (
                        <source src={videoSrc} type="video/mp4"   />
                    ) : (
                        "Chargement de la vidéo..."
                    )}
                    <p>
                        Votre navigateur ne prend pas en charge les vidéos HTML5. Voici
                        {/* <a href={video(sequence?.fileName)}>un lien pour télécharger la vidéo</a>. */}
                    </p>
                </video>

            </SpringModal>
        </div>
    </React.Fragment>

}

export default SequenceHome;
