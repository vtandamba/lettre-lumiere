import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { fetchAllExerciseForSequences, fetchOneSequence } from '../hooks/useDb';
import DOMPurify from 'dompurify';
import videoCam from '../assets/images/camera.svg';
import imgEtape from '../assets/images/layoutexercices/etape.png';
import { BounceLoader } from 'react-spinners';
import nextIcon from '../assets/images/next.svg';
import CountUp from 'react-countup';
import MainHeader from '../components/MainHeader';
import SpringModal from '../components/ModalMedia';
import closeIcon from '../assets/images/closeIconBlack.svg';
import { useUser } from '../contexts/UserContext';
import { saveScore } from '../hooks/useAuth';
import perfectMedal from '../assets/gamification/Level=6.svg';
import silverMedal from '../assets/gamification/Level=4.svg';
import goldMedal from '../assets/gamification/Level=5.svg';
import bronzeMedal from '../assets/gamification/Level=3.svg';
import noMedal from '../assets/gamification/Level=0.svg';
import db from '../Dexie'; // Importer la base de données
import ModalPdf from '../components/ModalPdf';
import { useScoreByExo } from '../contexts/ScoreContext';

const SequenceHome = (props) => {
  const { allScoreByExercises } = props;
  const { user } = useUser();
  const { scoreByExo, finalScores, updateScoreByExo, updateFinalScore } = useScoreByExo();
  const [videoSrc, setVideoSrc] = useState('');
  const params = useParams();
  const id = params?.sequence;
  const idSeq = parseInt(id, 10);
  const [sequence, setSequence] = useState();
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabScore, setTabScore] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openPdfModal, setOpenPdfModal] = useState(false);

  useEffect(() => {
    if (user) {
      updateScoreByExo(idSeq, tabScore);
    } else if (allScoreByExercises && allScoreByExercises.length > 0) {
      const filteredScores = allScoreByExercises.find(el => el.idSeq === idSeq)?.tabScores;
      updateScoreByExo(idSeq, filteredScores || []);
    }
  }, [user, tabScore, allScoreByExercises, idSeq, updateScoreByExo]);

  useEffect(() => {
    if (finalScore) {
      updateFinalScore(idSeq, finalScore);
    }
  }, [finalScore, idSeq, updateFinalScore]);

  useEffect(() => {
    const loadSequences = async () => {
      const loadedSequences = await fetchOneSequence(idSeq);
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
        setError('Impossible de charger les exercices');
        console.error('Erreur lors du chargement des exercices :', error);
      }
      setIsLoading(false);
    };

    loadExercises();
    loadSequences();
  }, [idSeq]);

  useEffect(() => {
    const exercisesScore = async () => {
      if (user) {
        try {
          const scorePromises = exercises?.map(async (exercise) => {
            const scores = await db.userProgress
              .where({ userId: user.userId, exerciseId: exercise.exerciseId })
              .toArray();

            if (scores.length === 0) {
              return null;
            }

            const highestScore = scores.reduce((maxScore, current) => {
              return (current.score === null || current.score === undefined) ? maxScore : Math.max(maxScore, current.score);
            }, null);

            return highestScore;
          });

          const scores = await Promise.all(scorePromises);
          setTabScore(scores);
        } catch (error) {
          console.error('Erreur lors de la récupération des scores:', error);
        }
      } else if (!user && allScoreByExercises && allScoreByExercises.length > 0) {
        const filteredScores = allScoreByExercises.find(el => el.idSeq === idSeq)?.tabScores;
        if (filteredScores) {
          const sumScores = filteredScores.reduce((accumulator, currentValue) => accumulator + (currentValue !== null ? currentValue : 0), 0);
          const avgScore = sumScores / filteredScores.length;
          setFinalScore(avgScore);
        }
      }
    };

    exercisesScore();
  }, [exercises, user, idSeq, allScoreByExercises]);

  useEffect(() => {
    if (sequence?.title) {
      import(`../assets/video/${sequence?.title}.mp4`)
        .then((module) => {
          setVideoSrc(module.default);
        })
        .catch((err) => {
          console.error('Erreur lors du chargement de la vidéo:', err);
        });
    }
  }, [sequence?.title]);

  useEffect(() => {
    if (tabScore.length) {
      const getFinalScore = tabScore.reduce((accumulator, currentValue) => accumulator + (currentValue !== null ? currentValue : 0), 0) / tabScore.length;
      setFinalScore(getFinalScore);
    }
  }, [tabScore]);

  const handleSaveScore = async (exerciseId, score) => {
    if (user) {
      await saveScore(user.userId, exerciseId, score);
    }
  };

  return (
    <React.Fragment>
      <MainHeader role="user" link="/etapes" />
      <div className="sequence">
        <div className="header">
          <div className="header__title">
            <div className="header__etape">
              <img src={imgEtape} alt="" />
              <p>Etape {sequence?.stageId}</p>
            </div>
            <p className="header__sequence">{sequence?.title}</p>
          </div>
          <div className="header__percent">
            <p><CountUp end={finalScores[idSeq] || finalScore} /> %</p>
            {finalScores[idSeq] === 0 && <img src={noMedal} alt="médaille" />}
            {finalScores[idSeq] === 100 && <img src={perfectMedal} alt="médaille" />}
            {finalScores[idSeq] > 0 && finalScores[idSeq] < 100 && (
              <img src={
                finalScores[idSeq] < 30 ? bronzeMedal :
                  finalScores[idSeq] >= 30 && finalScores[idSeq] < 60 ? silverMedal :
                    goldMedal
              } alt="médaille" />
            )}
          </div>
          <div className="header__actions">
            <img src={videoCam} alt="Video Cam" onClick={() => setOpenModal(true)} className="sequence__video" />
            <button onClick={() => setOpenPdfModal(true)}>Voir PDF</button>
          </div>
        </div>
        <main className="exercises">
          {isLoading ? (
            <BounceLoader color="#36d7b7" size={110} className="loader" cssOverride={{ marginLeft: '50%' }} />
          ) : exercises.length ? (
            <ul className="exercises__list">
              {exercises.map((el, index) => {
                let progressClass = 'progress-item--no-score';
                if (user && tabScore.length > 0) {
                  if (tabScore[index] !== null) {
                    if (tabScore[index] >= 0 && tabScore[index] < 25) {
                      progressClass = 'progress-item--orange';
                    } else if (tabScore[index] >= 25 && tabScore[index] < 50) {
                      progressClass = 'progress-item--rouge';
                    } else if (tabScore[index] >= 50 && tabScore[index] < 75) {
                      progressClass = 'progress-item--jaune';
                    } else if (tabScore[index] >= 75) {
                      progressClass = 'progress-item--vert';
                    }
                  }
                } else {
                  if (allScoreByExercises && allScoreByExercises.length > 0) {
                    const filteredScores = allScoreByExercises.find(el => el.idSeq === idSeq)?.tabScores;
                    if (filteredScores) {
                      if (filteredScores[index] !== null) {
                        if (filteredScores[index] >= 0 && filteredScores[index] < 25) {
                          progressClass = 'progress-item--orange';
                        } else if (filteredScores[index] >= 25 && filteredScores[index] < 50) {
                          progressClass = 'progress-item--rouge';
                        } else if (filteredScores[index] >= 50 && filteredScores[index] < 75) {
                          progressClass = 'progress-item--jaune';
                        } else if (filteredScores[index] >= 75) {
                          progressClass = 'progress-item--vert';
                        }
                      } else {
                        progressClass = 'progress-item-no-score';
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
          {(exercises && exercises.length === 0) || <Link to="exo">
            <div className="sequence__start">
              Commencer
              <img src={nextIcon} alt="next" />
            </div>
          </Link>}
        </footer>
        <SpringModal isOpen={openModal} setOpen={setOpenModal}>
          <img src={closeIcon} alt="Fermer la vidéo" className="close" onClick={() => setOpenModal(false)} />
          <video controls autoPlay className="sequence__video" onError={(e) => e.target.innerHTML = "La vidéo n'est pas disponible pour le moment. Veuillez réessayer plus tard."}>
            {videoSrc ? (
              <source src={videoSrc} type="video/mp4" />
            ) : (
              "Chargement de la vidéo..."
            )}
            <p>
              Votre navigateur ne prend pas en charge les vidéos HTML5.
            </p>
          </video>
        </SpringModal>
        <ModalPdf
          isOpen={openPdfModal}
          onRequestClose={() => setOpenPdfModal(false)}
          user={user}
          exercises={exercises}
          scorebyExo={scoreByExo[idSeq]}
        />
        {console.log('allScoreByExercises', allScoreByExercises)}
        {console.log('test', scoreByExo)}
      </div>
    </React.Fragment>
  );
};

export default SequenceHome;
