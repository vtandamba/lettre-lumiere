import React from "react";
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

const Etapes = () => {
  const { stages, sequences, exercises, isLoading } = useDbContext();

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

  return (
    <>
      {isLoading ? (
        <CircleLoader color="#36d7b7" size={150} cssOverride={{ margin: '20% auto 0 auto' }} />
      ) : (
        <>
          <MainHeader role="user" link="/home" />
          {stages.length ? (
            stages.map((stage) => (
              <ThemeProvider theme={theme} key={stage.id}>
                <Accordion style={{ border: 'none', backgroundColor: "transparent" }}>
                  <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                    <Typography className="Etape">
                      <button className="Etape__accordion"></button>
                      <div className="Etape__Title">
                        <h2>{stage.name}</h2>
                        <Link to={`/etape/${stage.id}`}>
                          <IoMdArrowDropright size={55} color="#FFF" />
                        </Link>
                      </div>
                      <div className="Etape__container"></div>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="Etape__container">
                      {sequences.filter(sequence => sequence.stageId === stage.stageId)
                        .map((s, index) => (
                          <Link to={`${s.stageId}`} key={index}>
                            <EtapeContent content={s.title.toUpperCase()} />
                          </Link>
                        ))}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </ThemeProvider>
            ))
          ) : (
            <p>Aucune étape enregistrée pour le moment</p>
          )}
        </>
      )}
    </>
  );
};

export default Etapes;
