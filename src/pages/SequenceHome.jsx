import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchAllExerciseForSequences, fetchOneSequence } from "../hooks/useDb";
import DOMPurify from 'dompurify';
import videoCam from '../assets/images/camera.svg';
import imgEtape from '../assets/images/layoutexercices/etape.png';
import { BounceLoader } from 'react-spinners';
import nextIcon from '../assets/images/next.svg';
import CountUp from 'react-countup';
import MainHeader from "../components/MainHeader";
import SpringModal from "../components/ModalMedia";
import closeIcon from '../assets/images/closeIconBlack.svg';
import silverMedal from '../assets/gamification/silverMedal.png';
import goldMedal from '../assets/gamification/goldenMedal.png';
import bronzeMedal from '../assets/gamification/bronzeMedal.png';
import { useUser } from "../contexts/UserContext";
import video1 from '../assets/video/r.mp4';
import video2 from '../assets/video/r.mp4';

const SequenceHome = () => {
    const { user } = useUser();
    const params = useParams();
    const id = params?.sequence;
    const idSeq = parseInt(id, 10);

    const [sequence, setSequence] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [tabScore, setTabScore] = useState([]);
    const [finalScore, setFinalScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
      const loadData = async () => {
          setIsLoading(true);
          try {
              const exercisesList = await fetchAllExerciseForSequences(idSeq);
              const sortedExercises = exercisesList.sort((a, b) => a.order - b.order);
              setExercises(sortedExercises);
          } catch (error) {
              setError("Impossible de charger les données");
              console.error("Erreur lors du chargement des données :", error);
          }
          setIsLoading(false);
      };

      loadData();
  }, [idSeq]);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;


    useEffect(() => {
        const fetchScores = async () => {
            if (user) {
                try {
                    const scorePromises = exercises.map(async (exercise) => {
                        const response = await fetch(`https://mtsene.lpmiaw.univ-lr.fr/lettrelumiere/public/apip/user_progresses?user=${sessionStorage.getItem('user_id')}&exercise=${exercise.id}`);
                        if (!response.ok) {
                            return null;
                        }
                        const data = await response.json();
                        const scores = data['hydra:member'];
                        const highestScore = scores.reduce((maxScore, current) => {
                            if (current.pro_score === null || current.pro_score === undefined) {
                                return maxScore;
                            }
                            return maxScore === null ? current.pro_score : Math.max(maxScore, current.pro_score);
                        }, null);
                        return highestScore;
                    });

                    const scores = await Promise.all(scorePromises);
                    setTabScore(scores.filter(score => score !== null));
                } catch (error) {
                    console.error("Erreur lors de la récupération des scores :", error);
                }
            }
        };

        fetchScores();
    }, [user, exercises]);

    useEffect(() => {
        if (tabScore.length > 0) {
            const averageScore = tabScore.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / tabScore.length;
            setFinalScore(averageScore);
        }
    }, [tabScore]);

    const cleanInstruction = (instruction) => DOMPurify.sanitize(instruction);

    return (
        <React.Fragment>
            <MainHeader role="user" link="/etapes" />
            <div className="sequence">
                <div className="header">
                    <div className="header__title">
                        <div className="header__etape">
                            <img src={imgEtape} alt="Icone Etape" />
                            {/* {console.log('les sequences', sequence)}
                             {console.log('les etapes', sequence)} */}
                            <p>Etape {sequence?.stage.stageId}</p>
                        </div>
                        <p className="header__sequence">{sequence?.seq_title}</p>
                    </div>
                    <div className="header__percent">
                        <p><CountUp end={finalScore} /> %</p>
                        {finalScore !== 0 && <img src={(finalScore < 30) ? bronzeMedal : (finalScore < 60) ? silverMedal : goldMedal} alt="Médaille" />}
                    </div>
                    <div className="header__actions">
                        <img src={videoCam} alt="Caméra" onClick={() => setOpenModal(true)} className="sequence__video" />
                    </div>
                </div>
                <main className="exercises">
                    {isLoading ? (
                        <BounceLoader color="#36d7b7" size={110} className="loader" cssOverride={{ marginLeft: '50%' }} />
                    ) : exercises.length ? (
                        <ul className="exercises__list">
                            {exercises.map((exercise, index) => {
                                let progressClass = "progress-item--no-score";
                                if (user && tabScore.length > 0 && tabScore[index] !== null) {
                                    if (tabScore[index] >= 0 && tabScore[index] < 25) {
                                        progressClass = "progress-item--orange";
                                    } else if (tabScore[index] >= 25 && tabScore[index] < 50) {
                                        progressClass = "progress-item--rouge";
                                    } else if (tabScore[index] >= 50 && tabScore[index] < 75) {
                                        progressClass = "progress-item--jaune";
                                    } else if (tabScore[index] >= 75) {
                                        progressClass = "progress-item--vert";
                                    }
                                }
                                return (
                                    <li className="exercises__item" key={exercise.exercice_id}>
                                        <div className={`progress-item ${progressClass}`}></div>
                                        <p className="consigne">{cleanInstruction(exercise.exo_instruction)}</p>
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
                    {(exercises && exercises.length === 0) || (
                        <Link to="exo">
                            <div className="sequence__start">
                                Commencer
                                <img src={nextIcon} alt="Suivant" />
                            </div>
                        </Link>
                    )}
                </footer>
                <SpringModal isOpen={openModal} setOpen={setOpenModal}>
                    <img src={closeIcon} alt="Fermer" className="close" onClick={() => setOpenModal(false)} />
                    <video controls className="sequence__video" onError={(e) => e.target.innerHTML = "La vidéo n'est pas disponible pour le moment. Veuillez réessayer plus tard."}>
                        <source src={video1} type="video/mp4" />
                        <p>
                            Votre navigateur ne prend pas en charge les vidéos HTML5. Voici <a href={video1}>un lien pour télécharger la vidéo</a>.
                        </p>
                    </video>
                </SpringModal>
            </div>
        </React.Fragment>
    );
};

export default SequenceHome;
