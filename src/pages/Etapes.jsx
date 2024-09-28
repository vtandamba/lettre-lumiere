import React, { useState, useEffect } from "react";
import { useDbContext } from "../contexts/DbContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { CircleLoader } from 'react-spinners';
import MainHeader from '../components/MainHeader';
import { IoMdArrowDropright } from "react-icons/io";
import EtapeContent from "../components/EtapeContent";
import { useUser } from "../contexts/UserContext";
import { AiOutlineReload } from 'react-icons/ai';

const Etapes = () => {
  const { stages, sequences, isLoading, getUserProgressForSequence } = useDbContext();
  const { user, calculateAndUpdateScore } = useUser();
  const [sequenceProgress, setSequenceProgress] = useState({});

  const theme = createTheme({
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            backgroundColor: "transparent",
            border: 'none',
            '&:before': {
              display: 'none',
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        const progressData = {};
        for (const sequence of sequences) {
          const averageScore = await getUserProgressForSequence(user.userId, sequence.sequenceId);
          progressData[sequence.sequenceId] = averageScore;
        }
        setSequenceProgress(progressData);

        // Recalculer et mettre à jour le score global après avoir chargé les progrès
        await calculateAndUpdateScore(progressData);
      }
    };

    loadProgress();
  }, [user, sequences, getUserProgressForSequence, calculateAndUpdateScore]);

  return (
    <>
      {isLoading ? (
        <CircleLoader color="#36d7b7" size={150} cssOverride={{ margin: '20% auto 0 auto' }} />
      ) : (
        <>
          <MainHeader role="user" link="/home" />
          {stages.length ? (
            stages.map((stage) => (
              <ThemeProvider theme={theme} key={stage.stageId}>
                <Accordion style={{ border: 'none', backgroundColor: "transparent" }}>
                  <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                    <Typography className="Etape">
                      <button className="Etape__accordion"></button>
                      <div className="Etape__Title">
                        <h2>{stage.name}</h2>
                        <Link to={`/etape/${stage.stageId}`}>
                          <IoMdArrowDropright size={55} color="#FFF" />
                        </Link>
                      </div>
                      <div className="Etape__container"></div>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="Etape__container">
                      {sequences.filter(sequence => sequence.stageId === stage.stageId)
                        .map((s) => (
                          <div key={s.sequenceId}>
                            <Link to={`${s.sequenceId}`}>
                              <EtapeContent
                                content={s.title.toUpperCase()}
                                progress={sequenceProgress[s.sequenceId]}
                                sequenceId={s.sequenceId}
                              />
                            </Link>
                            {sequenceProgress[s.sequenceId] !== undefined && (
                              <div>
                                <h3>Progression: {sequenceProgress[s.sequenceId].toFixed(2)}%</h3>
                              </div>
                            )}
                          </div>
                        ))}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </ThemeProvider>
            ))
          ) : (
            <div className="flex items-center justify-center border-solid border-2 border-cyan-600 h-24">
              <p className=" text-4xl">Aucune étape enregistrée pour le moment</p>
              <AiOutlineReload 
              className="animate-bounce "
                size={24}
                onClick={() => window.location.reload()} // Rafraîchir la page
                style={{ cursor: 'pointer', marginLeft: '10px', color: '#f18910' }} // Ajoutez du style selon vos préférences
                title="Rafraîchir pour afficher les données"
              />
              <p className=" text-4xl">    </p>

            </div>
          )}
        </>
      )}
    </>
  );
};

export default Etapes;
